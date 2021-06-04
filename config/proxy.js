/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/auth/': {
      target: 'https://adminapi-dev.yeahgo.com',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    // '/java-admin/': {
    //   target: 'http://192.168.14.188:50039',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
    // '/goodsService/': {
    //   target: 'http://192.168.14.148:50003',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
  }
};
