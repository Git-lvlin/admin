// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    API_URL: 'https://adminapi-dev.yeahgo.com',
    MARKET_URL: 'https://publicmobile-dev.yeahgo.com',
    APP_URL: 'https://www.yeahgo-dev.com',
    MOBILE_URL: 'https://api-dev.yeahgo.com',
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  }
});
