/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOT a static export. The quote form needs a server endpoint
  // (app/api/quote/route.js), and Netlify's Next.js Runtime — which it uses
  // for this project whether or not we ask it to — deploys route handlers
  // automatically. Every page here is still statically generated at build
  // time, so the site is served as static HTML; only /api/quote runs per
  // request.
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
};
export default nextConfig;
