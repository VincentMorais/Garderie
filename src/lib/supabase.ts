import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GALLERY_BUCKET = 'gallery';

export type GalleryCategory = 'chiens' | 'chats' | 'nac';

export interface GalleryImage {
  id?: string;
  created_at?: string;
  name: string;
  category: GalleryCategory;
  path: string; // chemin du fichier dans le bucket Storage
  url: string;  // URL publique de l'image
}

export interface Reservation {
  id?: string;
  created_at?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_type: string;
  start_date: string;
  end_date: string;
  dog_count: number;
  dog_name: string;
  dog_breed?: string | null;
  dog_age?: string | null;
  message?: string | null;
  special_needs?: string | null;
  status?: string;
}

/*
──────────────────────────────────────────────────────────────
CONFIGURATION DE LA BASE
──────────────────────────────────────────────────────────────

Le schéma (tables, RLS, bucket Storage) vit dans « supabase/setup.sql »,
à exécuter dans Supabase → SQL Editor.

Ce SQL était auparavant recopié ici en commentaire et n'avait jamais été
appliqué : la table gallery_images et le bucket gallery n'existaient pas,
ce qui faisait échouer tout ajout de photo depuis l'admin.

Compte admin : Supabase Dashboard > Authentication > Users > Add user.
──────────────────────────────────────────────────────────────
*/
