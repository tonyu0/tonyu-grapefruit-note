import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'

import { fileURLToPath, URL } from 'url' // add

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // add
    },
  },
  define: {
    // https://vuejs.org/api/compile-time-flags
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
  }
})
