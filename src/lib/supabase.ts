import { createClient } from "@supabase/supabase-js";

// Pegamos as chaves das variáveis de ambiente
// Se não existirem (ainda não configurado na máquina local), colocamos placeholders para o app não quebrar.
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = rawUrl && rawUrl.length > 5 ? rawUrl : "https://placeholder-project.supabase.co";
const supabaseAnonKey = rawKey && rawKey.length > 5 ? rawKey : "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
