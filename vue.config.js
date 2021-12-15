/*
 * @Author: xjh
 * @Date: 2021-12-02 17:51:44
 * @LastEditors: xjh
 * @LastEditTime: 2021-12-14 15:05:59
 * @Description:
 */
const path = require('path')
module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/xjh-components' : '/',
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV === 'development',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        'packages': path.resolve('packages')
      }
    }
  }
}
