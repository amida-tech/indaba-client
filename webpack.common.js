const path = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new Dotenv(),
    ],
};
