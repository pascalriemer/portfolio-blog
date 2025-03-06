/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Next.js 14 optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react", "three"],
  },
  // Compiler options
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  // Webpack configuration
  webpack: (config) => {
    // Optimize Three.js
    config.module.rules.push({
      test: /three\/examples\/jsm\/.*\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    })

    return config
  },
}

module.exports = nextConfig

