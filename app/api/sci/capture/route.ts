import { validateCapture } from "../../../../lib/sci-validation";
import { persistCapture } from "../../../../lib/sci-persistence";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
 if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ok:false},{status:403});
 if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ok:false},{status:415});
 let data: Record<string,unknown>;
 try { const raw=await request.text(); if(raw.length>8192) return NextResponse.json({ok:false},{status:413}); data=JSON.parse(raw); if(!data || typeof data!=="object" || Array.isArray(data)) throw new Error(); } catch {return NextResponse.json({ok:false},{status:400});}
 const payload=validateCapture(data); if(!payload) return NextResponse.json({ok:false},{status:400});
 try {
  const receipt=await persistCapture({...payload,eventId:payload.eventId,source:"direccion-ejecutiva",mode:process.env.SCI_MODE==="real"?"real":"test",consent:"yes",consentVersion:"1.0",receivedAt:new Date().toISOString()});
  if(!receipt.persisted || receipt.eventId!==payload.eventId) throw new Error("Unverified receipt");
  return NextResponse.json({ok:true});
 } catch {return NextResponse.json({ok:false},{status:503});}
}
