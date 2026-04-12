import { defineConfig } from "vite";

//Set changOrigin to true to make the proxy to forward request to just-eat.io
//Solve CORS issues
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://uk.api.just-eat.io",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/api/, "")
      }
    }
  }
});