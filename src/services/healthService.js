import { isSupabaseConfigured, supabase } from '../lib/supabase';
export async function checkSupabaseConnection(){if(!isSupabaseConfigured)return {ok:false,message:'não configurado'};const {error}=await supabase.from('athletes').select('id').limit(1);return error?{ok:false,message:'erro de conexão'}:{ok:true,message:'conectado'}}
