import { X } from 'lucide-react';
export default function Modal({title,children,onClose,wide=false}){return <div className="modal-backdrop" onMouseDown={onClose}><section className={`modal ${wide?'wide':''}`} onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={onClose}><X/></button></div>{children}</section></div>}
