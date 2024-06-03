/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      toRemotePattern(new URL(process.env.NEXT_PUBLIC_BASE_IMAGE_URL)),
    ],
  },
};

export default nextConfig;

function toRemotePattern(urlString) {
  const url = new URL(urlString);
  const response = {
    protocol: url.protocol.replace(":", ""), // replace แทนที่ข้อความเก่า
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
  // console.log("response : " + JSON.stringify(response));

  return response;
}
