// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    API_URL: 'https://adminapi-dev.yeahgo.com',
    MARKET_URL: 'http://publicmobile-dev.yeahgo.com',
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
