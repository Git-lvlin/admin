// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

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
        {
          path: '/user',
          component: '../layouts/UserLayout',
          name: 'user',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              path: '/user/login',
              name: '登录',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/workplace',
            },
            {
              path: '/workplace',
              name: 'workplace',
              component: './workplace',
            },
            {
              path: '/user-management',
              name: 'user-management',
              routes: [
                {
                  name: 'user-list',
                  path: '/user-management/user-list',
                  component: './user-management/user-list',
                }
              ]
            },
            {
              path: '/order-management',
              name: 'order-management',
              routes: [
                {
                  name: 'pending-orders',
                  path: '/order-management/pending-orders',
                  component: './order-management/pending-orders',
                },
                {
                  name: 'retail-list',
                  path: '/order-management/retail-list',
                  component: './order-management/retail-list',
                }
              ]
            },
            {
              path: '/product-management',
              name: 'product-management',
              routes: [
                {
                  name: 'product-list',
                  path: '/product-management/product-list',
                  component: './product-management/product-list',
                },
                {
                  name: 'brand-list',
                  path: '/product-management/brand-list',
                  component: './product-management/brand-list',
                },
                {
                  name: 'product-log',
                  path: '/product-management/product-log',
                  component: './product-management/product-log',
                },
                {
                  name: 'freight-template',
                  path: '/product-management/freight-template',
                  component: './product-management/freight-template',
                },
                {
                  name: 'product-review',
                  path: '/product-management/product-review',
                  component: './product-management/product-review',
                },
                {
                  name: 'product-category',
                  path: '/product-management/product-category',
                  component: './product-management/product-category',
                },
              ]
            },
            {
              path: '/setting',
              name: 'setting',
              routes: [
                {
                  name: 'account-management',
                  path: '/setting/account-management',
                  component: './setting/account-management',
                },
                {
                  name: 'role-management',
                  path: '/setting/role-management',
                  component: './setting/role-management',
                },
                {
                  name: 'authority-management',
                  path: '/setting/authority-management',
                  component: './setting/authority-management',
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
