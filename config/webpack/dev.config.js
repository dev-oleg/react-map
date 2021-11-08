const path = require('path')
const {merge} = require('webpack-merge')
const commonConfig = require('./common.config')

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 4000,
        compress: true,
        open: {
            app: {
                name: 'chrome'
            }
        }
    }
})