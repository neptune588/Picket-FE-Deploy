import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
      "/api": {
        // 요청 전달 대상 서버 주소 설정
        // target: "http://52.79.248.192:8080/",
        target: "https://picket.store/",
        // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        rewrite: (path) => path.replace(/^\/api/, ""),
        // SSL 인증서 검증 무시
        secure: false,
        // WebSocket 프로토콜 사용
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
