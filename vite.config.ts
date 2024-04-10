/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import dts from 'vite-plugin-dts'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: './tsconfig.json',
    }),
    DefineOptions(),
    Pages({
      pagesDir: [
        {
          dir: 'src/lib',
          baseRoute: '',
        },
      ],
      exclude: [
        '*/*.vue',
        '*/test/*.vue',
        '*/demo/demo[0-9].vue',
      ],
      extensions: ['vue'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/main.ts'),
      name: 'bundle',
      fileName: 'bundle',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'vant'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          vant: 'Vant',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      reportsDirectory: './test/coverage',
    },
    setupFiles: './test/setup/index.js',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
