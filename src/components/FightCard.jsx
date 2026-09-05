import { useState } from 'react';
import { ChevronDown,Pencil,Trash2,Trophy } from 'lucide-react';

export default function FightCard({fight,a1,a2,onResult,onEdit,onDelete}){
  const[expanded,setExpanded]=useState(false);if(!a1||!a2)return null;const done=fight.status==='Finalizada';
  const toggle=()=>setExpanded(value=>!value);const handleKeyDown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}};const action=callback=>e=>{e.stopPropagation();callback()};
  return <article className={`fight-card expandable ${expanded?'expanded':''}`} onClick={toggle} onKeyDown={handleKeyDown} tabIndex="0" role="button" aria-expanded={expanded}>
    <div className="fight-head"><span>LUTA #{String(fight.numero).padStart(2,'0')}</span><div className="fight-head-status"><i className={done?'done':''}>{fight.status}</i><ChevronDown className="expand-chevron" size={18}/></div></div>
    <div className="matchup"><div className={fight.resultado?.vencedorId===a1.id?'winner':''}><span className="fighter-avatar">{a1.nome[0]}</span><h3>{a1.nome}</h3><p>{a1.peso} kg • {a1.faixa}</p></div><b className="versus">VS</b><div className={fight.resultado?.vencedorId===a2.id?'winner':''}><span className="fighter-avatar">{a2.nome[0]}</span><h3>{a2.nome}</h3><p>{a2.peso} kg • {a2.faixa}</p></div></div>
    <div className="fight-meta"><b>{fight.modalidade}</b><span>{fight.estilo}</span></div>{done?<p className="result-line"><Trophy size={16}/> {fight.resultado?.texto}</p>:null}
    <div className="fight-expand-content" aria-hidden={!expanded}><div className="fight-details"><div><b>{a1.nome}</b><span>{a1.idade} anos • {a1.categoria}</span><span>{a1.academia||'Academia não informada'}</span></div><div><b>{a2.nome}</b><span>{a2.idade} anos • {a2.categoria}</span><span>{a2.academia||'Academia não informada'}</span></div></div>{fight.observacoes?<div className="fight-notes"><b>Observações</b><span>{fight.observacoes}</span></div>:null}<div className="fight-actions">{!done?<button className="btn primary small" onClick={action(onResult)}><Trophy size={16}/> Informar resultado</button>:null}<button className="btn ghost small" onClick={action(onEdit)}><Pencil size={16}/> Editar</button><button className="icon-btn danger" onClick={action(onDelete)} aria-label="Excluir luta"><Trash2 size={17}/></button></div></div>
    <small className="expand-hint">{expanded?'Clique para recolher':'Clique para ver detalhes'}</small>
  </article>;
}
