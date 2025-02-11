import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vite-pwa-org.netlify.app/guide/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
});