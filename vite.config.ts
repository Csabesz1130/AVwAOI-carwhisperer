import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(async () => {
  // Dynamically import remix-pwa
  const { remixPWA } = await import('@remix-pwa/dev')
  
  return {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
      tsconfigPaths(),
      remixPWA(),
    ],
    optimizeDeps: {
      exclude: [
        '@remix-pwa/push/client',
        'socket.io-client',
      ],
    },
    ssr: {
      noExternal: ['@remix-pwa/dev'],
    },
  }
})
