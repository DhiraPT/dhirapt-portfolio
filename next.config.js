/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lfjzmnveejtlimxyhvaa.supabase.co',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
