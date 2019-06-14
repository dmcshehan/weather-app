const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
    publicPath: ""
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "./src/assets/skycons.js", to: "./" }]),
    new htmlWebpackPlugin({
      template: "./src/index.html",
      files: {
        css: ["main.css"],
        js: ["src/assets/skycons.js"]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
