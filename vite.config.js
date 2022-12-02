// vite.config.js
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import terser from '@rollup/plugin-terser'
import { resolve } from 'path'

export default defineConfig({
  plugins: [splitVendorChunkPlugin(), terser()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.js'),
      name: 'modal',
      // the proper extensions will be added
      fileName: 'joomla-modal'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['./polyfill.js'],
    }
  }
})

