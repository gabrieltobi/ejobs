const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            hash: true,
            templateContent: `
              <html>
                <head>
                  <title>e-Jobs</title>
                </head>
                <body>
                  <div id="app"></div>
                </body>
              </html>
            `
        })
    ]
}