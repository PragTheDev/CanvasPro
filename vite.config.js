import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        "content.js": resolve(__dirname, "src/content.js"),
      },
      output: {
        entryFileNames: "[name]",
        assetFileNames: "[name][extname]",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/popup.html",
          dest: ".",
        },
      ],
    }),
  ],
});