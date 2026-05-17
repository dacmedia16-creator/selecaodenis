import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

const swapRouter = () => ({
  name: "swap-browser-router-to-memory",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    if (id.endsWith("/src/App.tsx")) {
      return code.replace(/BrowserRouter/g, "MemoryRouter");
    }
    return null;
  },
});

export default defineConfig({
  base: "./",
  plugins: [swapRouter(), react(), viteSingleFile()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    outDir: "dist-single",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
