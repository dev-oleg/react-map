const path = require('path')
const {merge} = require('webpack-merge')
const commonConfig = require('./common.config')

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist')
    },
    // resolve: {
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //     alias: {
    //         images: path.resolve(__dirname, 'dist/assets/')
    //     }
    // }
})