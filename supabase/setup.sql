-- ═══════════════════════════════════════════════════════════════════
-- À exécuter dans Supabase → SQL Editor, puis « Run ».
--
-- AUCUNE DONNÉE N'EST SUPPRIMÉE.
-- Le script ne contient ni DELETE, ni DROP TABLE, ni TRUNCATE, ni
-- suppression de colonne. Les réservations existantes sont conservées
-- telles quelles : on ne modifie que des PERMISSIONS (qui a le droit de
-- lire quoi) et on CRÉE la table et le bucket manquants de la galerie.
--
-- Les « DROP POLICY » ne suppriment que des règles d'accès, jamais des
-- lignes, et chacune est recréée juste en dessous.
-- Les « FOR DELETE » définissent un droit, ils n'effacent rien.
--
-- Tout est dans une transaction : à la moindre erreur, l'intégralité est
-- annulée et la base reste exactement dans son état actuel.
-- Le script est idempotent : on peut le relancer sans risque.
-- ═══════════════════════════════════════════════════════════════════

BEGIN;


-- ───────────────────────────────────────────────────────────────────
-- 1) QUI EST ADMINISTRATEUR
--
-- Les policies existantes autorisent « auth.role() = 'authenticated' »,
-- c'est-à-dire N'IMPORTE QUEL compte connecté — et l'inscription est
-- ouverte sur le projet. Un inconnu peut donc créer un compte et lire
-- ou modifier toutes les réservations.
--
-- On remplace ce critère par une liste explicite de comptes admin.
-- ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table jamais exposée via l'API : seul le SQL Editor la manipule.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_users FROM anon, authenticated;

-- Amorçage : les comptes qui existent AUJOURD'HUI sont ceux d'Émilie.
-- Toute inscription ultérieure n'aura aucun droit tant qu'elle n'est pas
-- ajoutée ici manuellement.
-- ⚠️ Vérifier le contenu de la table dans le résultat en fin de script :
--    s'il y figure une adresse inconnue, c'est qu'un tiers s'est déjà
--    inscrit — la supprimer avec :
--    DELETE FROM public.admin_users WHERE email = 'adresse@inconnue';
INSERT INTO public.admin_users (user_id, email)
SELECT id, email FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- ───────────────────────────────────────────────────────────────────
-- 2) GALERIE — table manquante
--
-- Sans cette table, l'ajout de photos depuis l'admin échoue toujours,
-- quel que soit le format de l'image (PostgREST répond 404
-- « Could not find the table 'public.gallery_images' »).
-- ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.gallery_images (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name       TEXT NOT NULL,
  category   TEXT NOT NULL CHECK (category IN ('chiens', 'chats', 'nac')),
  path       TEXT NOT NULL,
  url        TEXT NOT NULL
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Les photos de la galerie sont publiques : tout le monde peut les lire.
DROP POLICY IF EXISTS "Public read gallery" ON public.gallery_images;
CREATE POLICY "Public read gallery" ON public.gallery_images
  FOR SELECT TO anon, authenticated USING (true);

-- Seuls les comptes admin peuvent ajouter ou supprimer.
DROP POLICY IF EXISTS "Admin insert gallery" ON public.gallery_images;
CREATE POLICY "Admin insert gallery" ON public.gallery_images
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin delete gallery" ON public.gallery_images;
CREATE POLICY "Admin delete gallery" ON public.gallery_images
  FOR DELETE TO authenticated USING (public.is_admin());


-- ───────────────────────────────────────────────────────────────────
-- 3) GALERIE — bucket de stockage manquant
-- ───────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read gallery files" ON storage.objects;
CREATE POLICY "Public read gallery files" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admin upload gallery files" ON storage.objects;
CREATE POLICY "Admin upload gallery files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.is_admin());

DROP POLICY IF EXISTS "Admin delete gallery files" ON storage.objects;
CREATE POLICY "Admin delete gallery files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND public.is_admin());


-- ───────────────────────────────────────────────────────────────────
-- 4) RÉSERVATIONS — fermer la lecture publique des données clients
--
-- La policy « Public read ... USING (true) » rend TOUTES les colonnes
-- lisibles par n'importe qui : la clé anon est publiée dans le
-- JavaScript du site, donc nom, email, téléphone et message de chaque
-- client sont récupérables par un tiers.
--
-- Le calendrier public n'a besoin que des dates et du nombre de chiens.
-- On restreint donc les colonnes accessibles au rôle anonyme, sans rien
-- changer côté application.
-- ───────────────────────────────────────────────────────────────────

REVOKE SELECT ON public.reservations FROM anon;

GRANT SELECT (start_date, end_date, dog_count, status)
  ON public.reservations TO anon;

GRANT SELECT ON public.reservations TO authenticated;

-- La prise de réservation depuis le site reste ouverte (l'insertion
-- n'utilise pas de RETURNING, elle ne requiert donc pas SELECT).
GRANT INSERT ON public.reservations TO anon;

-- Lecture et modification complètes réservées aux comptes admin,
-- et non plus à tout compte connecté.
DROP POLICY IF EXISTS "Admin full read" ON public.reservations;
CREATE POLICY "Admin full read" ON public.reservations
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update" ON public.reservations;
CREATE POLICY "Admin update" ON public.reservations
  FOR UPDATE TO authenticated USING (public.is_admin());

COMMIT;


-- ───────────────────────────────────────────────────────────────────
-- 5) VÉRIFICATION
--
-- Résultat attendu :
--   reservations_conservees        → 72 (le nombre d'avant, inchangé)
--   photos_galerie                 → 0  (table neuve)
--   colonnes_lisibles_publiquement → dog_count, end_date, start_date, status
--   comptes_administrateurs        → uniquement la ou les adresses d'Émilie
--
-- Si « colonnes_lisibles_publiquement » contient encore email, phone,
-- first_name ou last_name, la restriction n'a pas pris.
-- Si « comptes_administrateurs » contient une adresse inconnue, un tiers
-- s'est inscrit : la retirer de public.admin_users.
-- ───────────────────────────────────────────────────────────────────

SELECT
  (SELECT count(*) FROM public.reservations)   AS reservations_conservees,
  (SELECT count(*) FROM public.gallery_images) AS photos_galerie,
  (SELECT string_agg(column_name, ', ' ORDER BY column_name)
     FROM information_schema.column_privileges
    WHERE grantee = 'anon'
      AND table_name = 'reservations'
      AND privilege_type = 'SELECT')           AS colonnes_lisibles_publiquement,
  (SELECT string_agg(coalesce(email, user_id::text), ', ')
     FROM public.admin_users)                  AS comptes_administrateurs;
