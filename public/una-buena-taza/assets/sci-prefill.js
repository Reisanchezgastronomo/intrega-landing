/* SCI -> Una buena taza: solo sesión local; no transmitir identidad en la URL. */
(() => {
 "use strict";
 const KEY="sci-una-buena-taza-v1";
 const execute=()=>{
   let obj;
   try {
     const raw=sessionStorage.getItem(KEY);
     if(!raw) return;
     sessionStorage.removeItem(KEY);
     obj=JSON.parse(raw);
   }catch{return;}
   if(!obj||typeof obj!=="object"||!Number.isFinite(obj.at)||Math.abs(Date.now()-obj.at)>30*60*1000)return;
   const clean=v=>typeof v==="string"?v.trim().slice(0,90):"";
   const name=document.getElementById("contact-name"),company=document.getElementById("company");
   if(name)name.value=clean(obj.name).slice(0,70);
   if(company)company.value=clean(obj.company);
   const sector=clean(obj.sector).toLowerCase();
   const business=[[/multi|cadena|grupo|sede/,"Grupo multisede"],[/hotel|alojamiento/,"Hotel"],[/restaurante/,"Restaurante"],[/catering|cocina central|instituciona|foodservice/,"Catering o cocina central"],[/panader|cafeter|pasteler/,"Panadería o cafetería"]].find(([re])=>re.test(sector))?.[1];
   if(business){const el=[...document.querySelectorAll('input[name="business"]')].find(x=>x.value===business);if(el)el.checked=true;}
   const priority={"Rentabilidad y costes":"Rendimiento","Producción y productividad":"Consistencia","Operaciones multisede":"Autonomía","Equipos y estándares":"Consistencia","Expansión y nuevos negocios":"Autonomía","Identidad y experiencia":"Recompra"}[clean(obj.priority)];
   if(priority){const el=[...document.querySelectorAll('input[name="priority"]')].find(x=>x.value===priority);if(el)el.checked=true;}
   const banner=document.getElementById("sci-welcome");
   if(banner){const label=document.getElementById("sci-welcome-label");if(label)label.textContent=name?.value?'Tu cuaderno está listo, '+name.value.split(/\s+/)[0]+'.':'Tu cuaderno está listo.';banner.hidden=false;}
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",execute,{once:true});else execute();
})();