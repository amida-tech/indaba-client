const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body',
});

const StyleLintPlugin = require('stylelint-webpack-plugin');

const StyleLintPluginConfig = new StyleLintPlugin({
    files: 'src/styles/*.scss',
});

module.exports = {
    devServer: {
        port: 3000,
        host: "0.0.0.0",
        disableHostCheck: true,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
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
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    plugins: [
        HtmlWebpackPluginConfig,
        StyleLintPluginConfig,
        new webpack.DefinePlugin({
            'process.env': {
                'API_HTTP_URL': JSON.stringify(process.env.API_HTTP_URL),
                'API_HTTPS_URL': JSON.stringify(process.env.API_HTTPS_URL),
                'AUTH_API_HTTPS_URL': JSON.stringify(process.env.AUTH_API_HTTPS_URL),
                'AUTH_API_HTTP_URL': JSON.stringify(process.env.AUTH_API_HTTP_URL),
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
    ],
};
