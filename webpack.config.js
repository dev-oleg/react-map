const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            images: path.resolve(__dirname, 'dist/assets/')
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/leaflet/dist/images',
                    to: 'dist/assets'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    }
}