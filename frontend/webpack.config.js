const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const fs = require("fs");

new HtmlWebpackPlugin({
  template: "./public/index.html",
  BASE_URL: "/",
});

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      BASE_URL: "/",
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify("/"),
    }),
    new Dotenv(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    server: {
      type: "https",
      options: {
        key: fs.readFileSync(
          "/Users/joaorocha/Projects/mrjohnnyrocha.com/frontend/localhost+2-key.pem"
        ),
        cert: fs.readFileSync(
          "/Users/joaorocha/Projects/mrjohnnyrocha.com/frontend/localhost+2.pem"
        ),
      },
    },
  },
};
