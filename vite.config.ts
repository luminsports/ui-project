import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import typescript from '@rollup/plugin-typescript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@test': path.resolve(__dirname, './test'),
      '@': path.resolve(__dirname, './lib'),
    },
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'index',
      fileName: format => `index.${format}.js`,
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'vue' },
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: path.resolve('lib'),
          declaration: true,
          declarationDir: path.resolve('dist'),
          exclude: path.resolve('node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },

  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: path.resolve(__dirname, './test/setupMocks.ts'),
  },
})
