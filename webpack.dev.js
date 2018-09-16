const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
    devServer: {
        contentBase: './dist',
        hot: true,
        publicPath: '/',
        historyApiFallback: true
    },
    plugins: [
        ...common.plugins,
        new webpack.HotModuleReplacementPlugin()
    ]
})