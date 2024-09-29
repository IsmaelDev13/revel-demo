/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "revel-car-models.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "driverevel.com",
      },
    ],
  },
};

module.exports = nextConfig;
