const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.cofig')
const proConfig = require('./webpack.pro.config')

let config =  process.NODE_ENV === 'development' ? devConfig : proConfig

module.exports = merge(baseConfig, config)
