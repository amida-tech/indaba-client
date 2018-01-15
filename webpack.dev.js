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
    plugins: [
        StyleLintPluginConfig,
    ],
});
