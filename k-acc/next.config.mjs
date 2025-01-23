/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"], // This transforms SVG imports into React components
        });
    
        return config;
      },
};

export default nextConfig;
