// Existing Netlify native rate limiting; no personal data is stored.
export default async (_request:Request,context:{next:()=>Promise<Response>})=>context.next();
export const config={path:"/api/sci/metric",rateLimit:{windowLimit:20,windowSize:180,aggregateBy:["ip","domain"]}};
