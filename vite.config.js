import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["swiper/react"],
  },
  build: {
    rollupOptions: {
      external: ["axios", "swiper"],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
