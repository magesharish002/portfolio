import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base keeps the build portable: it works on GitHub Pages
  // project sites (/<repo>/) and on a root domain without config changes.
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
});
