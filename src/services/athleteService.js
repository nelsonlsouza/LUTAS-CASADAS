import { supabase } from '../lib/supabase';

const fromRow = (row) => ({ id:row.id,nome:row.name,idade:row.age,peso:Number(row.weight),faixa:row.belt,categoria:row.category,sexo:row.gender,academia:row.academy||'',gi:row.gi,nogi:row.nogi,modalidade:row.gi&&row.nogi?'Ambos':row.gi?'Gi':'No-Gi',observacoes:row.notes||'',createdAt:row.created_at });
const toRow = (a) => ({ name:a.nome,age:Number(a.idade),weight:Number(a.peso),belt:a.faixa,category:a.categoria,gender:a.sexo,academy:a.academia||null,gi:Boolean(a.gi),nogi:Boolean(a.nogi),notes:a.observacoes||null,updated_at:new Date().toISOString() });
const fail = (error, message) => { if (error) throw new Error(message); };

export async function getAthletes(){const {data,error}=await supabase.from('athletes').select('*').order('name');fail(error,'Não foi possível carregar os atletas.');return data.map(fromRow)}
export async function getAthleteById(id){const {data,error}=await supabase.from('athletes').select('*').eq('id',id).single();fail(error,'Não foi possível carregar o atleta.');return fromRow(data)}
export async function createAthlete(athlete){const {data,error}=await supabase.from('athletes').insert(toRow(athlete)).select().single();fail(error,'Não foi possível cadastrar o atleta.');return fromRow(data)}
export async function updateAthlete(athlete){const {data,error}=await supabase.from('athletes').update(toRow(athlete)).eq('id',athlete.id).select().single();fail(error,'Não foi possível atualizar o atleta.');return fromRow(data)}
export async function deleteAthlete(id){const {error}=await supabase.from('athletes').delete().eq('id',id);fail(error,'Não foi possível excluir o atleta. Existem lutas relacionadas?')}
