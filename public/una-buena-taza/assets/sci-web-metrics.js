/* SCI | Analítica propia: eventos agregables y anónimos; no cookies ni datos personales. */
(()=>{"use strict";
 const product="una-buena-taza",basePath="/una-buena-taza/";
 const safe=s=>String(s||"").replace(/[^a-zA-Z0-9 _.\-]/g,"").slice(0,80);
 const qa=new URLSearchParams(location.search).get("sci_qa")==="1";
 function track(event){
  try{
   let a={};try{a=JSON.parse(sessionStorage.getItem("sci-attribution-v1")||"{}")||{}}catch{}
   const payload={eventId:crypto.randomUUID(),event,path:location.pathname,channel:safe(a.attributionSource)||"directo",campaign:safe(a.attributionCampaign),qa};
   fetch("/api/sci/metric",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),keepalive:true,credentials:"same-origin"}).catch(()=>{});
  }catch{}
 }
 window.sciTrack=track;
 if(location.pathname!==basePath&&location.pathname!=="/una-buena-taza")return;
 const ready=()=>{
  if(document.visibilityState==="visible")track("page_view");
  document.addEventListener("click",e=>{
   const a=e.target&&e.target.closest?e.target.closest("a[href]"):null;
   if(a&&(/cal\.com|wa\.me/.test(a.href)))track("cta_click");
  },{passive:true});
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready,{once:true});else ready();
})();
