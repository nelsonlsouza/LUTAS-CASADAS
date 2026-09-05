import { useState } from 'react';
import { ArrowRight,Eye,EyeOff,LockKeyhole,User } from 'lucide-react';

export default function Login({onLogin,configurationPending}){
  const[form,setForm]=useState({email:'',password:''});const[error,setError]=useState('');const[loading,setLoading]=useState(false);const[showPassword,setShowPassword]=useState(false);
  async function submit(event){event.preventDefault();setError('');setLoading(true);try{await onLogin(form.email,form.password)}catch(err){setError(err.message)}finally{setLoading(false)}}
  return <main className="login-screen">
    <section className="login-layout">
      <aside className="login-context">
        <div className="login-brand-simple"><img src="/tatame-norte-mark.svg" alt="" width="48" height="48"/><div><strong>Tatame <em>Norte</em></strong><span>Gestão que conecta o jiu-jitsu</span></div></div>
        <div className="login-context-copy"><span className="login-overline">LUTAS CASADAS</span><h1>Organize o card.<br/>Conduza o evento.</h1><p>Gerencie atletas, confrontos e resultados em um único painel.</p></div>
        <div className="login-event-status"><span/><div><strong>Organiza. Conecta. Evolui.</strong><small>Manaus · Amazonas</small></div></div>
      </aside>
      <div className="login-access">
        <form className="login-form" onSubmit={submit}>
          <header className="login-heading"><span>Acesso administrativo</span><h2>Entrar</h2><p>Informe suas credenciais para acessar o painel.</p></header>
          <label htmlFor="login-email">Email</label><div className="login-field"><User size={18}/><input id="login-email" required type="email" autoComplete="email" value={form.email} onChange={event=>setForm({...form,email:event.target.value})} placeholder="nome@exemplo.com" autoFocus/></div>
          <label htmlFor="login-password">Senha</label><div className="login-field"><LockKeyhole size={18}/><input id="login-password" required type={showPassword?'text':'password'} autoComplete="current-password" value={form.password} onChange={event=>setForm({...form,password:event.target.value})} placeholder="Sua senha"/><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?'Ocultar senha':'Mostrar senha'}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
          {configurationPending?<div className="login-message error">Configuração do Supabase pendente.</div>:null}{error?<div className="login-message error" role="alert">{error}</div>:null}
          <button disabled={loading||configurationPending} className="login-action"><span>{loading?'Entrando...':'Entrar'}</span><ArrowRight size={19}/></button>
          <p className="login-security">Acesso exclusivo do organizador</p>
        </form>
        <footer className="login-footer"><img src="/tatame-norte-mark.svg" alt="" width="20" height="20"/><p><strong>Tatame Norte</strong><span>Gestão de eventos de jiu-jitsu</span></p><small>© {new Date().getFullYear()}</small></footer>
      </div>
    </section>
  </main>;
}
