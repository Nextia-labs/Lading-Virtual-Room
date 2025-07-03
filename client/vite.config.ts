// client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// import cartographer from "@replit/vite-plugin-cartographer";

export default defineConfig({
  base: "/Lading-Virtual-Room/",
  plugins: [
    react(),
    // runtimeErrorOverlay(),
    // cartographer().cartographer(), // si realmente lo quisieras
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  root: ".",          // ya estás dentro de client
  build: {
    outDir: "dist",    // client/dist
    emptyOutDir: true,
  },
});
