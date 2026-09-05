import { useState } from 'react';
import { ArrowRight,Eye,EyeOff,LockKeyhole,ShieldCheck,User } from 'lucide-react';

export default function Login({onLogin,configurationPending}){
  const[form,setForm]=useState({email:'',password:''});const[error,setError]=useState('');const[loading,setLoading]=useState(false);const[showPassword,setShowPassword]=useState(false);
  async function submit(event){event.preventDefault();setError('');setLoading(true);try{await onLogin(form.email,form.password)}catch(err){setError(err.message)}finally{setLoading(false)}}
  return <main className="auth-page">
    <div className="auth-noise" aria-hidden="true"/><div className="auth-glow auth-glow-left" aria-hidden="true"/><div className="auth-glow auth-glow-right" aria-hidden="true"/>
    <section className="auth-shell">
      <aside className="auth-intro">
        <div className="auth-logo"><span className="brand-mark big">T</span><div><strong>TATAME</strong><small>Fight Manager</small></div></div>
        <div className="auth-copy"><span className="auth-kicker"><i/> GESTÃO DE EVENTOS</span><h1>O controle do<br/>seu evento começa <em>aqui.</em></h1><p>Atletas, confrontos e resultados organizados com rapidez para você focar no que acontece no tatame.</p></div>
        <div className="auth-trust"><ShieldCheck size={17}/><span><b>Acesso administrativo</b><small>Sessão protegida pelo Supabase</small></span></div>
      </aside>
      <div className="auth-form-panel">
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-form-heading"><span className="eyebrow">ÁREA RESTRITA</span><h2>Bem-vindo de volta</h2><p>Use as credenciais do administrador para continuar.</p></div>
          <label>Email<div className="auth-input"><User size={18}/><input required type="email" autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="seu@email.com" autoFocus/></div></label>
          <label>Senha<div className="auth-input"><LockKeyhole size={18}/><input required type={showPassword?'text':'password'} autoComplete="current-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Digite sua senha"/><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?'Ocultar senha':'Mostrar senha'}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
          {configurationPending?<div className="auth-error">Configuração do Supabase pendente. Crie o arquivo .env.</div>:null}{error?<div className="auth-error" role="alert">{error}</div>:null}
          <button disabled={loading||configurationPending} className="auth-submit"><span>{loading?'Entrando...':'Entrar no sistema'}</span><ArrowRight size={20}/></button>
          <div className="auth-secure"><span/><small>CONEXÃO SEGURA E PRIVADA</small><span/></div>
        </form>
      </div>
    </section>
    <footer className="auth-footer">TATAME FIGHT MANAGER <span>•</span> GESTÃO INTELIGENTE, DECISÃO DO ORGANIZADOR</footer>
  </main>;
}
