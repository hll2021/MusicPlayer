const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
      // 开启gzip压缩
      new CompressionWebpackPlugin({
        filename: () => {
          return '[path][base].gz'
        },
        algorithm: 'gzip',
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        test: new RegExp('\\.(' + ['js'].join('|') + ')$'
        ),
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      })
    ],
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vant": "vant",
      "vue-router": "VueRouter"
    },
  },
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false
})
