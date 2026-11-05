/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: no Node server to attack, no server-side dependencies at runtime.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
};
export default nextConfig;
