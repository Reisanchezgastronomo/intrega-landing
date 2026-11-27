import { accessToken } from "./sci-persistence";

// Anonymous, low-volume MVP events; no emails, IPs, cookies, or identifiers of people.
const METRICS_TAB_ID = 1977100201; // Existing private Base Maestra tab: SCI · Eventos web
export type WebMetric = {
 eventId: string;
 product: "una-buena-taza" | "venezuela-en-una-taza";
 event: "page_view" | "pdf_click" | "quiz_complete" | "cta_click";
 channel: string;
 campaign: string;
 path: string;
 qa: boolean;
};
export async function saveWebMetric(m: WebMetric): Promise<boolean> {
 const spreadsheetId=process.env.SCI_SHEET_ID;
 if(!spreadsheetId)throw Error("SCI_SHEET_ID unavailable");
 const token=await accessToken();
 const now=new Date();
 const day=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Caracas",year:"numeric",month:"2-digit",day:"2-digit"}).format(now);
 const row=["WEB_"+m.eventId.replace(/-/g,"_"),day,m.product,m.event,m.channel,m.campaign,m.path,m.qa?"TEST":"REAL",now.toISOString()];
 const response=await fetch("https://sheets.googleapis.com/v4/spreadsheets/"+spreadsheetId+":batchUpdate",{
  method:"POST",
  headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},
  body:JSON.stringify({requests:[{appendCells:{sheetId:METRICS_TAB_ID,rows:[{values:row.map(v=>({userEnteredValue:{stringValue:v}}))}],fields:"userEnteredValue"}}]}),
  cache:"no-store",signal:AbortSignal.timeout(10000)
 });
 if(!response.ok)throw Error("Metrics write failed: "+response.status);
 const receipt=await response.json() as {replies?:unknown[];spreadsheetId?:string};
 return receipt.spreadsheetId===spreadsheetId && Array.isArray(receipt.replies) && receipt.replies.length===1;
}
