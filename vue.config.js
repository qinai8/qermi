module.exports = {
  lintOnSave: false, // 取消代码检测
  devServer: {
    // host: "localhost",
    // port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        // 代理api
        target: 'http://192.168.1.54:8080', // 代理的目标地址
        ws: true, // proxy websockets
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 重写路径
          '^/api': ''
        }
      }
    }
  }
}
