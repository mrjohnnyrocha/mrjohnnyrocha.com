const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig(
  {
    transpileDependencies: true,
    // Development Proxy Configuration (for development only)
    devServer: {
      proxy: {
        "/api": {
          target: "https://127.0.0.1:8000/",
          changeOrigin: true, // this is essential for handling CORS
          pathRewrite: { "^/api": "" },
        },
      },
    };
);
