
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')


module.exports = merge.smart(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
  ],
})
