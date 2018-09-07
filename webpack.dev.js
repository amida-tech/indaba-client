const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const StyleLintPlugin = require('stylelint-webpack-plugin');

const StyleLintPluginConfig = new StyleLintPlugin({
    files: 'src/styles/**/*.scss',
});

module.exports = merge(common, {
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    module: {
        rules: [
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
        ],
    },
    plugins: [
        StyleLintPluginConfig,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
});
