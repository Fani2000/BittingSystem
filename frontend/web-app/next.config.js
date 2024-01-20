/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ],
    },
    env: {
        NEXTAUTH_SECRET: "secrets"
    }
}

module.exports = nextConfig
