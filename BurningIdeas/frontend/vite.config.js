import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": process.env.VITE_DOTNET_API_URL,
         "/answers": process.env.VITE_DOTNET_API_URL,
      "/users": process.env.VITE_DOTNET_API_URL,
      "/user/:id": process.env.VITE_DOTNET_API_URL,
      "/signin": process.env.VITE_DOTNET_API_URL,
      "/signup": process.env.VITE_DOTNET_API_URL,
      "/editaccount/:id": process.env.VITE_DOTNET_API_URL,
      "/deleteaccount/id": process.env.VITE_DOTNET_API_URL,
      "/newidea": process.env.VITE_DOTNET_API_URL,
      "/ideas/:userId": process.env.VITE_DOTNET_API_URL,
      "/idea/:ideaId": process.env.VITE_DOTNET_API_URL,
      "/idea/:ideaId/delete": process.env.VITE_DOTNET_API_URL,
    },
  },
});
