import { createSign } from "node:crypto";

const sheetId = "1Mzc0Yo4sgggLab8yNKJ37xHpmTe0S31EGZPcDO1nYCs";
const tabId = 1755352509;
const base = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetId;
const b64 = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
type Capture = { eventId:string; source:string; mode:string; consent:string; consentVersion:string; receivedAt:string; [key:string]:string };
async function accessToken() {
 const email=process.env.SCI_GOOGLE_CLIENT_EMAIL, key=process.env.SCI_GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n");
 if(!email||!key) throw new Error("Google credentials unavailable");
 const now=Math.floor(Date.now()/1000);
 const unsigned=b64({alg:"RS256",typ:"JWT"})+"."+b64({iss:email,scope:"https://www.googleapis.com/auth/spreadsheets",aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+300});
 const assertion=unsigned+"."+createSign("RSA-SHA256").update(unsigned).sign(key).toString("base64url");
 const response=await fetch("https://oauth2.googleapis.com/token",{method:"POST",body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok) throw new Error("Google authentication failed");
 const data=await response.json(); if(typeof data.access_token!=="string") throw new Error("No token");
 return data.access_token as string;
}
export async function persistCapture(event:Capture) {
 if(!/^[0-9a-f-]{36}$/i.test(event.eventId)) throw new Error("Invalid ID");
 const id="SCI_"+event.eventId.replace(/-/g,"_").toLowerCase();
 const marker="MVP_EVENT_"+id;
 const token=await accessToken();
 const headers={Authorization:"Bearer "+token,"Content-Type":"application/json"};
 const get=async()=>{const r=await fetch(base+"?fields=namedRanges(name)",{headers,cache:"no-store",signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error("Cannot verify event");return (await r.json()).namedRanges?.some((v:{name:string})=>v.name===marker)===true;};
 if(await get()) return {persisted:true,eventId:event.eventId,duplicate:true};
 const date=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Caracas",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(event.receivedAt));
 const row=[id,date,event.source,event.company||"Interesado","Captación SCI "+event.mode,"SCI consent "+event.consentVersion+" / "+event.receivedAt,"",JSON.stringify(event),"SCI 1.0",event.mode==="test"?"TEST":"Pendiente de calificación"];
 const requests=[{addNamedRange:{namedRange:{name:marker,range:{sheetId:tabId,startRowIndex:11,endRowIndex:12,startColumnIndex:0,endColumnIndex:1}}}},{appendCells:{sheetId:tabId,rows:[{values:row.map(value=>({userEnteredValue:{stringValue:value}}))}],fields:"userEnteredValue"}}];
 const response=await fetch(base+":batchUpdate",{method:"POST",headers,body:JSON.stringify({requests}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok){if(await get())return {persisted:true,eventId:event.eventId,duplicate:true};throw new Error("Persistence failed");}
 if(!await get()) throw new Error("Receipt unverified");
 return {persisted:true,eventId:event.eventId,duplicate:false};
}
