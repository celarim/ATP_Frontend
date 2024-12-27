import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        //대상 서버
        target: "https://637b1d88-d99f-48ca-b187-81bb20e3ae05.mock.pstmn.io",
        //대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        //api제거
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
