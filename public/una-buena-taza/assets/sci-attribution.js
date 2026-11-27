/* Captura de origen para el formulario SCI del mismo dominio; sin cookies ni PII. */
(()=>{"use strict";try{
const key="sci-attribution-v1",p=new URLSearchParams(location.search);
const existing=JSON.parse(sessionStorage.getItem(key)||"{}");
if(existing&&typeof existing.landingPath==="string"&&existing.landingPath)return;
const clean=(v,n=120)=>String(v||"").trim().slice(0,n);
let host="";try{if(document.referrer)host=new URL(document.referrer).hostname}catch{}
sessionStorage.setItem(key,JSON.stringify({product:"una-buena-taza",attributionSource:clean(p.get("utm_source")||host||"directo"),attributionMedium:clean(p.get("utm_medium")||"web"),attributionCampaign:clean(p.get("utm_campaign")),attributionContent:clean(p.get("utm_content")),landingPath:clean(location.pathname,200),referrerHost:clean(host)}));
}catch{} })();
