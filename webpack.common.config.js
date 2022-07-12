// Load the environment from the env file
require("./configs/env")();

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

class GenerateConfigPlugin {

    constructor(options) {
		this.options = Object.assign({
            path: 'config.json',
            envMatch: /^REACT_APP_/i
        }, options);
	}

    apply(compiler) {
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {

            // Filter out the env variable we are interested in using a regex
            const variables = Object.keys(process.env).filter(key => this.options.envMatch.test(key));

            const output = variables.reduce((env, key) => {
                env[key] = process.env[key];
                return env;
            }, {});

            // Insert this list into the webpack build as a new file asset:
            compilation.assets[this.options.path] = {
              source: function() {
                return JSON.stringify(output);
              },
              size: function() {
                return JSON.stringify(output).length;
              }
            };

            callback();
        });
    }
}


module.exports = {
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/inline'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // Ensure that react is running in the correct mode
        // new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }),
        new GenerateConfigPlugin({
            path: 'config.json',
            envMatch: /^REACT_APP_/i
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: 'node_modules/@hpcc-js/wasm/dist/',
                    from: '*.wasm',
                    to: path.join(__dirname, 'build'),
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve("./index.html"),
            favicon: "Favicon.png"
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css"
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            useEslintrc: true
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
};
