/** @type {import('next').NextConfig} */

// Determines if the deployment is for GitHub Pages
const isGithubPages = process.env.IS_GITHUB_PAGES === 'true';

const nextConfig = {
  // Use the repository name as the `basePath` for GitHub Pages deployment
  basePath: isGithubPages ? '/sohnent' : '',
  // Use the repository name as the `assetPrefix` for GitHub Pages deployment
  assetPrefix: isGithubPages ? '/sohnent/' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
