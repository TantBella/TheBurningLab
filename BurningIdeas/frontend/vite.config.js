import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      //    "/api": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      "/api": "http://localhost:3000",
      "/users": "http://localhost:3000",
      "/signin": "http://localhost:3000",
      "/signup": "http://localhost:3000",
      "/editaccount": "http://localhost:3000",
      "/deleteaccount": "http://localhost:3000",
      "/ideas": "http://localhost:3000",
      "/idea": "http://localhost:3000",
    },
  },
});
