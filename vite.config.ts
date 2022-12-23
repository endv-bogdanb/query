import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS(), tsconfigPaths()],
  base: isProduction ? `/query/` : undefined,
});