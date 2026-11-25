export const priorities = ["Rentabilidad y costes","Producción y productividad","Operaciones multisede","Equipos y estándares","Expansión y nuevos negocios","Identidad y experiencia"];
export function validateCapture(data:Record<string,unknown>,source:"direccion-ejecutiva"|"viaja"="direccion-ejecutiva"){
 const fields:Record<string,number>=source==="viaja"?{name:120,email:254,market:120,experience:120,duration:80,companions:80,context:1000}:{name:120,company:160,email:254,market:120,role:120,sector:120,priority:120,context:1000};
 const payload:Record<string,string>={};
 for(const [key,max] of Object.entries(fields)){
  const value=data[key]; if(typeof value!=="string" || value.length>max || (key!=="context"&&!value.trim())) return null;
  payload[key]=value.trim();
 }
 if(data.website || data.consent!=="yes" || (source==="direccion-ejecutiva"&&!priorities.includes(payload.priority)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || typeof data.eventId!=="string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.eventId)) return null;

 return {...payload,eventId:data.eventId};
}
