import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'spark-echarts',
      formats: ['es', 'umd']
    }
  }
})