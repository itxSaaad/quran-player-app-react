import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['/favicon.ico', '/robots.txt', '/apple-touch-icon.png'],
      manifest: {
        name: 'Quran Player - React',
        short_name: 'Quran Player',
        description: 'Listen to the Quran in beautiful recitations.',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: '/images/screen1.png',
            sizes: '1918x816',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/images/screen2.png',
            sizes: '2560x1440',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
        theme_color: '#121286',
        background_color: '#121286',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        id: '/',
        display_override: ['window-controls-overlay'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
