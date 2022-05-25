const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const root = path.resolve(__dirname, "../");
const proxyConfig = require("../proxy.json");

module.exports = {
  entry: path.resolve(root, "./src/index.js"),
  output: {
    path: path.resolve(root, "./dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.s?css$/, use: [ "vue-style-loader", "css-loader", "sass-loader" ] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, "./src/index.html"),
      filename: "index.html"
    }),
    new VueLoaderPlugin()
  ],
  mode: "development",
  devServer: {
    allowedHosts: "all",
    static: {
      directory: path.join(__dirname, "../static")
    },
    proxy: {
      "/api": {
        target: proxyConfig.target,
        changeOrigin: true
      }
    }
  }
};