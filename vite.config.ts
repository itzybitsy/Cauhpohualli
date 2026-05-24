import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Mock Figma-specific modules for local development
function figmaMockPlugin(): Plugin {
  return {
    name: 'figma-mock',
    resolveId(id) {
      if (id.startsWith('figma:')) return '\0figma-mock:' + id
    },
    load(id) {
      if (!id.startsWith('\0figma-mock:')) return
      const original = id.replace('\0figma-mock:', '')
      // figma:asset/<hash>.png → serve from /figma-assets/<hash>.png
      if (original.startsWith('figma:asset/')) {
        const filename = original.replace('figma:asset/', '')
        return `export default '/figma-assets/${filename}'`
      }
      // figma:foundry-client-api and anything else → empty module
      return `export default {}`
    },
  }
}

export default defineConfig({
  plugins: [
    figmaMockPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
