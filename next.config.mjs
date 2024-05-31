/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com','cdn-icons-png.flaticon.com','avatars.githubusercontent.com'],
    },
};

export default nextConfig;
