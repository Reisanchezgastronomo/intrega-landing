import { persistCapture } from "../../../../lib/sci-persistence";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
const priorities = ["Rentabilidad y costes","Producción y productividad","Operaciones multisede","Equipos y estándares","Expansión y nuevos negocios","Identidad y experiencia"];
export async function POST(request: Request) {
 if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ok:false},{status:403});
 if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ok:false},{status:415});
 let data: Record<string,unknown>;
 try { const raw=await request.text(); if(raw.length>8192) return NextResponse.json({ok:false},{status:413}); data=JSON.parse(raw); if(!data || typeof data!=="object" || Array.isArray(data)) throw new Error(); } catch {return NextResponse.json({ok:false},{status:400});}
 const fields:Record<string,number>={name:120,company:160,email:254,market:120,role:120,sector:120,priority:120,context:1000};
 const payload:Record<string,string>={};
 for(const [key,max] of Object.entries(fields)){
  const value=data[key]; if(typeof value!=="string" || value.length>max || (key!=="context"&&!value.trim())) return NextResponse.json({ok:false},{status:400});
  payload[key]=value.trim();
 }
 if(data.website || data.consent!=="yes" || !priorities.includes(payload.priority) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || typeof data.eventId!=="string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.eventId)) return NextResponse.json({ok:false},{status:400});
 try {
  const receipt=await persistCapture({...payload,eventId:data.eventId,source:"direccion-ejecutiva",mode:process.env.SCI_MODE==="real"?"real":"test",consent:"yes",consentVersion:"1.0",receivedAt:new Date().toISOString()});
  if(!receipt.persisted || receipt.eventId!==data.eventId) throw new Error("Unverified receipt");
  return NextResponse.json({ok:true});
 } catch {return NextResponse.json({ok:false},{status:503});}
}
