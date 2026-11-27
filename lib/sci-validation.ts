export const priorities = ["Rentabilidad y costes","Producción y productividad","Operaciones multisede","Equipos y estándares","Expansión y nuevos negocios","Identidad y experiencia"];
const attributionFields:Record<string,number>={product:48,attributionSource:120,attributionMedium:120,attributionCampaign:120,attributionContent:120,landingPath:200,referrerHost:120,followupOptin:3};
export function validateCapture(data:Record<string,unknown>,source:"direccion-ejecutiva"|"viaja"="direccion-ejecutiva"){
 const fields:Record<string,number>=source==="viaja"?{name:120,email:254,market:120,experience:120,duration:80,companions:80,context:1000}:{name:120,company:160,email:254,market:120,role:120,sector:120,priority:120,context:1000};
 const required=source==="viaja"?new Set(["email","experience"]):new Set(["name","company","email","priority"]);
 const payload:Record<string,string>={};
 for(const [key,max] of Object.entries({...fields,...attributionFields})){
  const value=data[key];
  if(value===undefined||value===null||value===""){if(required.has(key))return null;payload[key]="";continue;}
  if(typeof value!=="string"||value.length>max||/[\u0000-\u001f]/.test(value))return null;
  payload[key]=value.trim();
  if(required.has(key)&&!payload[key])return null;
 }
 if(data.website||data.consent!=="yes"||(source==="direccion-ejecutiva"&&!priorities.includes(payload.priority)))return null;
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)||typeof data.eventId!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.eventId))return null;
 if(payload.followupOptin!==""&&payload.followupOptin!=="yes")return null;
 if(!["","una-buena-taza","venezuela-en-una-taza","viaja"].includes(payload.product))return null;
 if(payload.landingPath&&(!payload.landingPath.startsWith("/")||payload.landingPath.startsWith("//")))return null;
 if(payload.referrerHost&&(/[/\s@]/.test(payload.referrerHost)))return null;
 return {...payload,eventId:data.eventId};
}
