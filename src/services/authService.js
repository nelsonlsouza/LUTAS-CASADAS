import { isSupabaseConfigured, supabase } from '../lib/supabase';

function requireClient() {
  if (!isSupabaseConfigured) throw new Error('Configuração do Supabase pendente.');
  return supabase;
}

export async function login(email, password) {
  const { data, error } = await requireClient().auth.signInWithPassword({ email, password });
  if (error) throw new Error('Email ou senha inválidos.');
  return data.session;
}

export async function logout() {
  const { error } = await requireClient().auth.signOut();
  if (error) throw new Error('Não foi possível encerrar a sessão.');
}

export async function getSession() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error('Não foi possível recuperar a sessão.');
  return data.session;
}

export function onAuthStateChange(callback) {
  if (!isSupabaseConfigured) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}
