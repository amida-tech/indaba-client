const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules'],
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
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify(process.env.API_URL),
                AUTH_API_URL: JSON.stringify(process.env.AUTH_API_URL),
                SURVEY_API_URL: JSON.stringify(process.env.SURVEY_API_URL),
                MESSAGING_API_URL: JSON.stringify(process.env.MESSAGING_API_URL),
                REALM: JSON.stringify(process.env.REALM),
            },
        }),
    ],
};
