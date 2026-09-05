import { useMemo,useState } from 'react';
import { AlertTriangle,ArrowRight,CheckCircle2 } from 'lucide-react';
import { getSuggestions,getWarnings } from '../utils/matchmaking';

export default function CreateFight({athletes,fights,prefill,onCreate}){
  const[a1Id,setA1]=useState(prefill||'');const[a2Id,setA2]=useState('');const[mode,setMode]=useState('Gi');const[style,setStyle]=useState('Pontuação');const[custom,setCustom]=useState('');const[obs,setObs]=useState('');
  const a1=athletes.find(a=>a.id===a1Id);const a2=athletes.find(a=>a.id===a2Id);
  const suggestions=useMemo(()=>a1?getSuggestions(a1,athletes,mode):[],[a1,athletes,mode]);
  const warnings=a1&&a2?getWarnings(a1,a2,mode):[];
  const fightCounts=useMemo(()=>{const counts=new Map();for(const fight of fights){counts.set(fight.atleta1Id,(counts.get(fight.atleta1Id)||0)+1);counts.set(fight.atleta2Id,(counts.get(fight.atleta2Id)||0)+1)}return counts},[fights]);
  function submit(e){e.preventDefault();if(!a1||!a2)return;onCreate({atleta1Id:a1.id,atleta2Id:a2.id,modalidade:mode,estilo:style==='Outro'?custom:style,observacoes:obs,status:'Agendada',resultado:null},warnings)}
  return <form className="create-layout" onSubmit={submit}>
    <section className="panel setup"><span className="step">1</span><div><span className="eyebrow">PRIMEIRO COMPETIDOR</span><h2>Selecione o atleta</h2></div>
      <label>Atleta 1<select required value={a1Id} onChange={e=>{setA1(e.target.value);setA2('')}}><option value="">Escolha um atleta</option>{athletes.map(a=><option value={a.id} key={a.id}>{a.nome} — {a.peso} kg / {a.faixa}</option>)}</select></label>
      {a1?<div className="selected-athlete"><span className="initials">{a1.nome[0]}</span><div><strong>{a1.nome}</strong><small>{a1.idade} anos • {a1.peso} kg • {a1.faixa} • {a1.modalidade}</small></div><CheckCircle2/></div>:null}
      <div className="divider"/><span className="step">2</span><div><span className="eyebrow">CONFIGURAÇÃO</span><h2>Detalhes da luta</h2></div>
      <div className="mode-picker"><button type="button" className={mode==='Gi'?'active':''} onClick={()=>setMode('Gi')}><b>GI</b><small>Com kimono</small></button><button type="button" className={mode==='No-Gi'?'active':''} onClick={()=>setMode('No-Gi')}><b>NO-GI</b><small>Sem kimono</small></button></div>
      <label>Estilo<select value={style} onChange={e=>setStyle(e.target.value)}>{['Pontuação','Submission Only','Super Fight','Regras do evento','Outro'].map(v=><option key={v}>{v}</option>)}</select></label>
      {style==='Outro'?<label>Nome do formato<input required value={custom} onChange={e=>setCustom(e.target.value)}/></label>:null}
      <label>Observações<textarea value={obs} onChange={e=>setObs(e.target.value)} placeholder="Opcional"/></label>
    </section>
    <section className="panel suggestions-panel"><span className="eyebrow">MATCHMAKING</span><h2>Sugestões de adversários</h2><p>Qualquer atleta pode participar de várias lutas. A pontuação apenas ordena as sugestões.</p>
      {!a1?<div className="empty large">Selecione o primeiro atleta para ver sugestões.</div>:suggestions.map(({atleta,pontos,diferencaPeso,diferencaIdade,nivel})=>{const count=fightCounts.get(atleta.id)||0;return <button type="button" key={atleta.id} className={`suggestion ${a2Id===atleta.id?'selected':''} ${count?'has-fights':''}`} onClick={()=>setA2(atleta.id)}><span className="initials small">{atleta.nome[0]}</span><div><span className="suggestion-name"><strong>{atleta.nome}</strong>{count?<i className="fight-count-badge">Já tem {count} {count===1?'luta':'lutas'}</i>:null}</span><small>{atleta.idade} anos • {atleta.peso} kg • {atleta.faixa} • {atleta.categoria}</small><small>{atleta.academia||'Sem academia'} • Δ {diferencaPeso.toFixed(1)} kg • Δ {diferencaIdade} anos</small></div><span className={`score ${nivel.toLowerCase()}`}><b>{pontos}%</b><small>{nivel}</small></span></button>})}
      {warnings.length>0?<div className="warning"><AlertTriangle/><div><b>Diferenças informativas</b>{warnings.map(w=><small key={w}>{w}</small>)}</div></div>:null}
      <button disabled={!a2} className="btn primary full">Criar luta <ArrowRight/></button><small className="disclaimer">Não há limite de lutas por atleta. A decisão final é do organizador.</small>
    </section>
  </form>
}
