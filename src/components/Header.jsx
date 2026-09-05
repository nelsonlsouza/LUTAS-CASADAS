import { Bell } from 'lucide-react';
const titles={dashboard:['Dashboard','Visão geral do seu evento'],athletes:['Atletas','Cadastre e gerencie os competidores'],create:['Criar luta','Encontre o confronto ideal'],fights:['Lutas','Gerencie o card do evento']};
export default function Header({page}){const [title,sub]=titles[page];return <header><div><h1>{title}</h1><p>{sub}</p></div><div className="admin"><button className="icon-btn"><Bell size={19}/></button><span className="avatar">AD</span><div><strong>Administrador</strong><small>Organizador</small></div></div></header>}
