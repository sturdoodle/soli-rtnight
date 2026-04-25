import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'o-logo.png', 'manifest.json', 'pwa/*.png'],
      manifest: {
        name: 'QPkendra AI Resume Builder',
        short_name: 'QP | Resume Builder',
        description: 'Build an interview-ready, ATS-compliant resume for free. AI-powered and privacy-first.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        categories: ['productivity', 'business', 'utilities'],
        icons: [
          {
            src: 'o-logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'o-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'o-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'pwa/desktop-wide.png',
            sizes: '2560x1334',
            type: 'image/png',
            form_factor: 'wide',
            label: 'QPkendra Desktop Editor'
          },
          {
            src: 'pwa/mobile-narrow.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'QPkendra Mobile Editor'
          }
        ],
        shortcuts: [
          {
            name: 'New Resume',
            url: '/#/',
            icons: [{ src: 'o-logo.png', sizes: '192x192' }]
          },
          {
            name: 'About Us',
            url: '/#/about',
            icons: [{ src: 'o-logo.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: '/#/',
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none'
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        banner: `/* Built by qkendra.com. Before using any part, please inform and also take permission by: hello@qpkendra.com */`,
        compact: true,
        generatedCode: {
          constBindings: true
        },
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
          pdf: ['jspdf', 'html2canvas']
        }
      }
    }
  }
})
