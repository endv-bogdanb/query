import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    { ...eslint({ failOnWarning: true }), apply: "build" },
    {
      ...eslint({ fix: true, failOnError: false, failOnWarning: false }),
      apply: "serve",
      enforce: "post",
    },
  ],
  base: isProduction ? `/query/` : undefined,
});
