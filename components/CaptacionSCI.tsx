"use client";
import { useRef, useState, type FormEvent } from "react";
import { captureAttribution, sciEvent } from "../lib/sci-attribution";
const input="mt-2 w-full rounded-lg border border-white/25 bg-[#0b1115] p-3 text-white";
export default function CaptacionSCI() {
 const eventId=useRef("");
 const previous=useRef("");
 const busy=useRef(false);
 const [status,setStatus]=useState<"idle"|"pending"|"ok"|"error"|"limited">("idle");
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  const form=e.currentTarget;
  if(busy.current)return;
  const data=Object.fromEntries(new FormData(form));
  const attribution=captureAttribution("una-buena-taza");
  const fingerprint=JSON.stringify({...data,...attribution});
  if(!eventId.current||previous.current!==fingerprint)eventId.current=crypto.randomUUID();
  previous.current=fingerprint;busy.current=true;setStatus("pending");
  try{
   const response=await fetch("/api/sci/capture",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,...attribution,eventId:eventId.current,source:"direccion-ejecutiva",followupOptin:data.followupOptin==="yes"?"yes":""})});
   if(response.status===429){setStatus("limited");return;}
   if(!response.ok)throw new Error("capture");
   sciEvent("generate_lead","una-buena-taza");
   setStatus("ok");
   try{sessionStorage.setItem("sci-una-buena-taza-v1",JSON.stringify({name:String(data.name||""),company:String(data.company||""),sector:String(data.sector||""),priority:String(data.priority||""),at:Date.now()}));}catch{}
   form.reset();eventId.current="";
   window.location.assign("/una-buena-taza/");
  }catch{setStatus("error");}finally{busy.current=false;}
 }
 return <section className="mt-10 rounded-2xl border border-white/20 bg-[#142025] p-7 sm:p-9">
  <h2 className="text-2xl font-semibold">Cuéntanos tu prioridad empresarial</h2>
  <p className="mt-3 text-sm text-[#b7c4bd]">Al completar el formulario recibirás inmediatamente y sin coste «Una buena taza»: un cuaderno interactivo con simulador económico y ficha PDF. La participación no requiere una suscripción comercial.</p>
  <form onSubmit={submit} className="mt-6 grid gap-4">
   <label>Nombre<input name="name" required maxLength={120} autoComplete="name" className={input}/></label>
   <label>Empresa<input name="company" required maxLength={160} autoComplete="organization" className={input}/></label>
   <label>Correo electrónico<input name="email" type="email" required maxLength={254} autoComplete="email" className={input}/></label>
   <label>Prioridad empresarial<select name="priority" required className={input}><option value="">Seleccionar prioridad</option>{["Rentabilidad y costes","Producción y productividad","Operaciones multisede","Equipos y estándares","Expansión y nuevos negocios","Identidad y experiencia"].map(x=><option key={x}>{x}</option>)}</select></label>
   <details className="rounded-xl border border-white/15 p-4"><summary className="cursor-pointer text-sm text-[#bdd1c1]">Añadir contexto de tu empresa (opcional)</summary><div className="mt-4 grid gap-3">
     <label>Ciudad / país<input name="market" maxLength={120} autoComplete="address-level2" className={input}/></label>
     <label>Tu responsabilidad<input name="role" maxLength={120} className={input}/></label>
     <label>Sector<input name="sector" maxLength={120} className={input}/></label>
     <label>Qué te interesa mejorar<textarea name="context" maxLength={1000} className={input}/></label>
    </div></details>
   <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <label className="flex gap-3 text-sm"><input type="checkbox" name="consent" required value="yes"/>Autorizo el tratamiento de mis datos para entregarme el cuaderno y responder a esta solicitud.</label>
   <label className="flex gap-3 text-sm text-[#b7c4bd]"><input type="checkbox" name="emailCopyOptin" value="yes"/>Enviarme también una copia del recurso por correo (opcional; no es una suscripción).</label>
   <label className="flex gap-3 text-sm text-[#b7c4bd]"><input type="checkbox" name="followupOptin" value="yes"/>Quiero recibir comunicaciones comerciales pertinentes más adelante. Es opcional y puedo retirarlo.</label>
   <details className="text-sm text-[#d5e0d8]"><summary className="cursor-pointer font-medium">Privacidad y tratamiento de datos</summary><p className="mt-2">Responsable: Rei Sánchez — Dirección Ejecutiva · Transformación · Autonomía. Los datos se utilizan para entregar el recurso, valorar el encaje ejecutivo y responder a tu solicitud. Se conservan en Google Sheets con acceso restringido y se revisan tras doce meses sin interacción significativa. Solo enviaremos comunicaciones de seguimiento comercial cuando hayas optado expresamente por recibirlas. Puedes solicitar acceso, rectificación o supresión en <a className="underline" href="mailto:reisanchezgastronomo@gmail.com">reisanchezgastronomo@gmail.com</a>. Evita aportar información sensible o confidencial.</p></details>
   <button type="submit" disabled={status==="pending"} className="rounded-full bg-[#bdd1c1] px-6 py-3 font-semibold text-[#102017] disabled:opacity-50">{status==="pending"?"Registrando…":"Enviar y recibir mi cuaderno"}</button>
   <p role="status">{status==="ok"?"Registro confirmado; abriendo tu cuaderno…":status==="limited"?"Demasiadas solicitudes. Inténtalo de nuevo más adelante; los datos permanecen en el formulario.":status==="error"?"No hemos podido confirmar el registro. Conservamos tus datos en pantalla para que puedas reintentar.":""}</p>
  {status==="error"?<a className="inline-flex rounded-full border border-[#bdd1c1]/60 px-5 py-3 text-sm font-semibold text-[#bdd1c1]" href="/una-buena-taza/">Explorar el cuaderno sin registro confirmado</a>:null}
  </form>
 </section>;
}
