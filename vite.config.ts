import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 🚨 IMPORTANT FIX
  optimizeDeps: {
    exclude: ["@aws-amplify/backend", "../amplify", "amplify"],
  },

  // Prevent Vite from trying to load TS backend files at runtime
  build: {
    rollupOptions: {
      external: [
        "../amplify/data/resource",
        "amplify/data/resource",
      ],
    },
  },
});
