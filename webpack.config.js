const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      containers: path.resolve(__dirname, "src/containers/"),
    },
    extensions: [".js", ".jsx", '.tsx', '.ts'],
    modules: [
      path.resolve(__dirname, "src/"),
      path.resolve(__dirname, "node_modules/"),
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "./index.html",
    }),
  ],
  devServer: {
    compress: true,
  },
};
