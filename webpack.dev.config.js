const path = require("path");
const { merge } = require('webpack-merge');
var common = require('./webpack.common.config');

module.exports = merge(common, {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: '[name].[contenthash].js'
    },
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,
        open: true,
        port: 3000
    }
});
