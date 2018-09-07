const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                   MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ['./node_modules'],
                            },
                    },
                ]
            },
        ],
    },
    mode: 'production',
    optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ],
        splitChunks: {
            chunks: 'all'
        }
      },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new MiniCssExtractPlugin(),
    ],
});
