/* SCI MVP 1.0 — atribución de primer contacto, sin datos personales y sin cookies. */
export type SciAttribution = {
  product: string;
  attributionSource: string;
  attributionMedium: string;
  attributionCampaign: string;
  attributionContent: string;
  landingPath: string;
  referrerHost: string;
};
const KEY="sci-attribution-v1";
const cut=(v:unknown,max=120)=>typeof v==="string"?v.trim().slice(0,max):"";
export function captureAttribution(product:string):SciAttribution {
  const fallback:SciAttribution={product,attributionSource:"directo",attributionMedium:"web",attributionCampaign:"",attributionContent:"",landingPath:"",referrerHost:""};
  if(typeof window==="undefined")return fallback;
  let saved:Partial<SciAttribution>={};
  try{saved=JSON.parse(sessionStorage.getItem(KEY)||"{}")||{}}catch{}
  const params=new URLSearchParams(window.location.search);
  const hasUtm=["utm_source","utm_medium","utm_campaign","utm_content"].some(k=>params.has(k));
  const first=typeof saved.landingPath==="string" && saved.landingPath.length>0;
  let host="";
  try{if(document.referrer)host=new URL(document.referrer).hostname}catch{}
  const next:SciAttribution={
    product,
    attributionSource:cut(first?saved.attributionSource:(params.get("utm_source")||host||"directo")),
    attributionMedium:cut(first?saved.attributionMedium:(params.get("utm_medium")|| (hasUtm?"campaña":"web"))),
    attributionCampaign:cut(first?saved.attributionCampaign:params.get("utm_campaign")),
    attributionContent:cut(first?saved.attributionContent:params.get("utm_content")),
    landingPath:cut(first?saved.landingPath:window.location.pathname,200),
    referrerHost:cut(first?saved.referrerHost:host)
  };
  try{sessionStorage.setItem(KEY,JSON.stringify(next))}catch{}
  return next;
}
export function sciEvent(name:string,product:string) {
  if(typeof window==="undefined")return;
  const w=window as typeof window & {dataLayer?:Array<Record<string,string>>;gtag?:(...args:unknown[])=>void};
  const payload={event:name,product};
  if(!w.dataLayer)w.dataLayer=[];
  w.dataLayer.push(payload);
  if(typeof w.gtag==="function")w.gtag("event",name,{product});
}
