import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["framer-motion", "lucide-react"],
          "utils-vendor": ["mammoth", "react-dropzone"],
          "charts-vendor": ["recharts"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
