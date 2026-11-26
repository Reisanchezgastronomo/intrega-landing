// Native Netlify rate limit for the experimental SCI capture path.
// Pass through to the existing Next.js handler; no payload or IP logging.
export default async (_request: Request, context: { next: () => Promise<Response> }) => {
  return context.next();
};

export const config = {
  path: "/api/sci/capture",
  rateLimit: {
    windowLimit: 5,
    windowSize: 180,
    aggregateBy: ["ip", "domain"],
  },
};
