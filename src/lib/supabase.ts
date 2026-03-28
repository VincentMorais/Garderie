import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
SQL À EXÉCUTER DANS SUPABASE > SQL Editor
──────────────────────────────────────────────────────────────

CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  dog_count INTEGER NOT NULL DEFAULT 1,
  dog_name TEXT NOT NULL,
  dog_breed TEXT,
  dog_age TEXT,
  message TEXT,
  special_needs TEXT,
  status TEXT DEFAULT 'pending'
);

-- Activer Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire (pour vérifier les dispos)
CREATE POLICY "Public read" ON reservations
  FOR SELECT USING (true);

-- Tout le monde peut créer une réservation
CREATE POLICY "Public insert" ON reservations
  FOR INSERT WITH CHECK (true);

-- Les utilisateurs connectés (admin) peuvent modifier le statut
CREATE POLICY "Admin update" ON reservations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Les utilisateurs connectés (admin) peuvent tout lire (y compris données sensibles)
CREATE POLICY "Admin full read" ON reservations
  FOR SELECT USING (auth.role() = 'authenticated');

──────────────────────────────────────────────────────────────
CRÉER LE COMPTE ADMIN DANS SUPABASE :
→ Supabase Dashboard > Authentication > Users > Add user
→ Renseigne l'email et le mot de passe d'Émilie
──────────────────────────────────────────────────────────────
*/
