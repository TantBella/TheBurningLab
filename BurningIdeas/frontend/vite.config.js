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
      "/signin": "http://localhost:3000/",
      "/signup": "http://localhost:3000/",
      "/editaccount/:userId": "http://localhost:3000/",
      "/users/:userId": "http://localhost:3000/",
    },
  },
});
