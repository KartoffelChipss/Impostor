import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        preact(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
            manifest: {
                name: 'Impostor',
                short_name: 'Impostor',
                description: 'Spiel Impostor!',
                theme_color: '#ff4c4c',
                background_color: '#0a0a0a',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                        src: 'web-app-manifest-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'web-app-manifest-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'web-app-manifest-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
        }),
    ],
    server: {
        allowedHosts: ['mbjan.local'],
    },
});
