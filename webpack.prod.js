const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["mozjpeg", { quality: 75 }],
            ["pngquant", { quality: [0.6, 0.8] }],
            ["svgo", {}],
          ],
        },
      },

      generator: [
        {
          type: "asset",
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [["webp", { quality: 75 }]],
          },
        },
      ],
    }),
  ],
});
