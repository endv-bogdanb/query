import { defineConfig } from "vitest/config";
import { join, resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@components": resolve(join(__dirname, "src", "components")),
      "@models": resolve(join(__dirname, "src", "models")),
      "@utils": resolve(join(__dirname, "src", "utils")),
      "@routes": resolve(join(__dirname, "src", "routes")),
      "@backend": resolve(join(__dirname, "src", "backedn")),
    },
  },
});
