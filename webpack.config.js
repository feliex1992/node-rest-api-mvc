const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const {
  NODE_ENV = "production"
} = process.env;

module.exports = {
  entry: "./src/server.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "ts-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === "development",
  watchOptions: {
    ignored: 'node_modules/**'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPluginNext({
      onBuildEnd:{
        scripts: ["npm run run:dev"],
        blocking: false,
        parallel: true
      }
    })
  ]
};
