/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // One domain only: belvoroai.com (no www) goes to https://www.belvoroai.com.
      // Vercel's domain settings usually redirect first; this is the fallback.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'belvoroai.com' }],
        destination: 'https://www.belvoroai.com/:path*',
        statusCode: 301,
      },
      // The old signup form page. Booking now happens on Calendly
      // (same link as CONSULTATION_URL in src/lib/links.ts).
      {
        source: '/get-started',
        destination: 'https://calendly.com/belvoroai/free-consultation',
        permanent: false,
      },
    ]
  },
}
module.exports = nextConfig
