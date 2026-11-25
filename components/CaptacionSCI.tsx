"use client";
import { useRef, useState, type FormEvent } from "react";

export default function CaptacionSCI() {
 const eventId = useRef("");
 const previous = useRef("");
 const busy = useRef(false);
 const [status,setStatus] = useState<"idle"|"pending"|"ok"|"error">("idle");
 async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form=e.currentTarget;
  if(busy.current) return;
  const data=Object.fromEntries(new FormData(form));
  const fingerprint=JSON.stringify(data);
  if (!eventId.current || previous.current!==fingerprint) eventId.current=crypto.randomUUID();
  previous.current=fingerprint;busy.current=true;
  setStatus("pending");
  try {
   const response=await fetch("/api/sci/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,eventId:eventId.current,source:"direccion-ejecutiva"})});
   if(!response.ok) throw new Error("capture");
   setStatus("ok");form.reset();eventId.current="";
  } catch {setStatus("error");} finally {busy.current=false;}
 }
 const input="mt-2 w-full rounded-lg border border-white/25 bg-[#0b1115] p-3 text-white";
 return <section className="mt-10 rounded-2xl border border-white/20 bg-[#142025] p-7 sm:p-9">
 <h2 className="text-2xl font-semibold">Cuéntanos tu prioridad empresarial</h2>
 <p className="mt-3 text-sm text-[#b7c4bd]">Utilizaremos tus datos para valorar el encaje ejecutivo y responder a tu solicitud.</p>
 <form onSubmit={submit} className="mt-6 grid gap-4">
 <label>Nombre<input name="name" required maxLength={120} autoComplete="name" className={input}/></label>
 <label>Empresa<input name="company" required maxLength={160} autoComplete="organization" className={input}/></label>
 <label>Correo electrónico<input name="email" type="email" required maxLength={254} autoComplete="email" className={input}/></label>
 <label>Ciudad / país<input name="market" required maxLength={120} className={input}/></label>
 <label>Responsabilidad<input name="role" required maxLength={120} className={input}/></label>
 <label>Sector<input name="sector" required maxLength={120} className={input}/></label>
 <label>Prioridad operativa<select name="priority" required className={input}><option value="">Seleccionar</option>{["Rentabilidad y costes","Producción y productividad","Operaciones multisede","Equipos y estándares","Expansión y nuevos negocios","Identidad y experiencia"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label>Contexto adicional (opcional)<textarea name="context" maxLength={1000} className={input}/></label>
 <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="flex gap-3 text-sm"><input type="checkbox" name="consent" required value="yes"/>Autorizo el tratamiento de estos datos para responder a mi solicitud de conversación ejecutiva. No implica suscripción a comunicaciones comerciales.</label>
 <button type="submit" disabled={status==="pending"} className="rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017] disabled:opacity-50">{status==="pending"?"Registrando…":"Enviar solicitud"}</button>
 <p role="status">{status==="ok"?"Solicitud registrada. Puedes reservar una conversación en nuestra agenda.":status==="error"?"No se ha confirmado el registro. Puedes reintentar o utilizar los canales de contacto existentes.":""}</p>
 </form></section>;
}
