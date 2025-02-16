import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/users": "http://localhost:3000",
      "/signin": "http://localhost:3000",
      "/signup": "http://localhost:3000",
      "/editaccount": "http://localhost:3000",
      "/deleteaccount": "http://localhost:3000",
      "/postidea": "http://localhost:3000",
      "/ideas": "http://localhost:3000",
      "/idea/:ideaId": "http://localhost:3000",
      "/idea/delete": "http://localhost:3000",
    },
  },
});
