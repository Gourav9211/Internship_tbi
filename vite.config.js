import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteObfuscateFile } from 'vite-plugin-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    viteObfuscateFile({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.4,
      deadCodeInjection: false,
      debugProtection: false,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'mangled-shuffled',
      renameGlobals: false,
      selfDefending: false,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayEncoding: ['base64'],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersType: 'function',
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        properties: false,
      },
      format: {
        comments: false,
      },
    },
  },
})
