import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": process.env.VITE_DOTNET_API_URL,
      "/users": process.env.VITE_DOTNET_API_URL,
      "/user/:id": process.env.VITE_DOTNET_API_URL,
      "/signin": process.env.VITE_DOTNET_API_URL,
      "/signup": process.env.VITE_DOTNET_API_URL,
      "/editaccount/:id": process.env.VITE_DOTNET_API_URL,
      "/deleteaccount/id": process.env.VITE_DOTNET_API_URL,
      "/postidea": process.env.VITE_DOTNET_API_URL,
      "/ideas": process.env.VITE_DOTNET_API_URL,
      "/idea/:ideaid": process.env.VITE_DOTNET_API_URL,
      "/idea/delete": process.env.VITE_DOTNET_API_URL,
    },
  },
});
