/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
