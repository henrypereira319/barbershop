import { createClient } from "@supabase/supabase-js";

// Pegamos as chaves das variáveis de ambiente
// Se não existirem (ainda não configurado na máquina local), colocamos placeholders para o app não quebrar.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
