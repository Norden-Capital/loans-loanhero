import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LoanHero',
    short_name: 'LoanHero',
    description: 'Quick & Easy Personal Loans Canada',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#588157',
    icons: [
      { src: '/icon.png', sizes: 'any', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: 'any', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
