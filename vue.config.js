const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   devServer: {
//     proxy: {
//       // '/api': {
//       //   target: 'http://localhost:4500/',
//       //   changeOrigin: true,
//       //   pathRewrite: { '^/api': '' }
//       // }
//       '/home': {
//         target: 'https://seat.dc-eve.com',
//         changeOrigin: true,
//       }
//     },
//   },
//   transpileDependencies: true
// })
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/home/toolsToken1': {
        target: 'https://seat.dc-eve.com', // 目标 API 的域名
        changeOrigin: true, // 允许跨域
        pathRewrite: { '^/home': '' }, // 重写路径，例如将 '/api' 替换为空字符串
      },
    },
  },
});
