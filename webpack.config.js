const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./render.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
