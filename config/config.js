// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import user from './routers/user'
import userManagement from './routers/user-management'
import orderManagement from './routers/order-management'
import productManagement from './routers/product-management'
import setting from './routers/setting'
import intensiveActivityManagement from './routers/intensive-activity-management'
import supplierManagement from './routers/supplier-management'
import intensiveStoreManagement from './routers/intensive-store-management'
import singleContractActivityManagement from './routers/single-contract-activity-management'
import groupContractActivityManagement from './routers/group-contract-activity-management'
import couponManagement from './routers/coupon-management'




const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  fastRefresh: {},
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        user,
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/product-management/product-list',
            },
            {
              path: '/workplace',
              name: 'workplace',
              component: './workplace',
            },
            userManagement,
            orderManagement,
            productManagement,
            setting,
            intensiveActivityManagement,
            supplierManagement,
            intensiveStoreManagement,
            singleContractActivityManagement,
            groupContractActivityManagement,
            couponManagement,
            {
              path: '/cms',
              name: 'cms',
              routes: [
                {
                  name: 'goos-reg',
                  path: '/cms/goos-reg',
                  routes: [
                    {
                      name: 'member',
                      path: '/cms/goos-reg/member',
                      component: './cms/goos-reg/member'
                    },
                    {
                      name: 'hot-goos',
                      path: '/cms/goos-reg/hot-goos',
                      component: './cms/goos-reg/hot-goos'
                    },
                    {
                      name: 'crazy-date',
                      path: '/cms/goos-reg/crazy-date',
                      component: './cms/goos-reg/crazy-date'
                    },
                    {
                      name: 'save-money',
                      path: '/cms/goos-reg/save-money',
                      component: './cms/goos-reg/save-money',
                    },
                    {
                      name: 'strategy-today',
                      path: '/cms/goos-reg/strategy-today',
                      component: './cms/goos-reg/strategy-today',
                    }
                  ]
                },
              ]
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
