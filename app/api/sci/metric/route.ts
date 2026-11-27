import { NextResponse } from "next/server";
import { saveWebMetric, type WebMetric } from "../../../../lib/sci-web-metrics";
export const runtime="nodejs";
const allowed=new Set(["page_view","pdf_click","quiz_complete","cta_click"]);
// Best-effort per-instance throttle; Netlify native edge rate limit provides the primary barrier.
const throttle=new Map<string,{ts:number,n:number}>();
export async function POST(request:Request) {
 const origin=new URL(request.url).origin;
 if(request.headers.get("origin")!==origin)return NextResponse.json({ok:false},{status:403});
 if(!request.headers.get("content-type")?.startsWith("application/json"))return NextResponse.json({ok:false},{status:415});
 if(Number(request.headers.get("content-length")||0)>1200)return NextResponse.json({ok:false},{status:413});
 const ua=request.headers.get("user-agent")||"";
 if(/bot|spider|crawler|preview|facebookexternalhit|slackbot|whatsapp/i.test(ua))return new Response(null,{status:204});
 let value:Record<string,unknown>;
 try{const raw=await request.text();if(raw.length>1200)throw Error();value=JSON.parse(raw);if(!value||typeof value!=="object"||Array.isArray(value))throw Error();}catch{return NextResponse.json({ok:false},{status:400});}
 if(typeof value.eventId!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.eventId))return NextResponse.json({ok:false},{status:400});
 if(typeof value.event!=="string"||!allowed.has(value.event))return NextResponse.json({ok:false},{status:400});
 if(value.path!=="/una-buena-taza/"&&value.path!=="/una-buena-taza")return NextResponse.json({ok:false},{status:400});
 const clean=(input:unknown)=>typeof input==="string"&&input.length<=80&&/^[a-zA-Z0-9 _.\-]*$/.test(input)?input:"";
 if(value.channel!==undefined&&typeof value.channel!=="string")return NextResponse.json({ok:false},{status:400});
 if(value.campaign!==undefined&&typeof value.campaign!=="string")return NextResponse.json({ok:false},{status:400});
 const ip=(request.headers.get("x-forwarded-for")||"no-ip").split(",")[0].trim().slice(0,80);
 const tick=Date.now(),previous=throttle.get(ip);
 const next=previous&&tick-previous.ts<180000?{ts:previous.ts,n:previous.n+1}:{ts:tick,n:1};
 if(throttle.size>500)throttle.clear();
 throttle.set(ip,next);if(next.n>20)return NextResponse.json({ok:false},{status:429});
 const metric:WebMetric={eventId:value.eventId,product:"una-buena-taza",event:value.event as WebMetric["event"],channel:clean(value.channel)||"directo",campaign:clean(value.campaign),path:String(value.path),qa:value.qa===true};
 try{const ok=await saveWebMetric(metric);return NextResponse.json({ok},{status:ok?200:503});}catch(e){console.error("[SCI METRICS] write unavailable");return NextResponse.json({ok:false},{status:503});}
}
