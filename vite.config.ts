import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base path so the production build works on GitHub Pages
// regardless of the repository name (assets resolve relative to index.html).
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
        },
      },
    },
  },
});
