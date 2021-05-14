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
              redirect: '/product-management/product-list',
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
                },
                {
                  name: 'disable-user-list',
                  path: '/user-management/disable-user-list',
                  component: './user-management/disable-user-list',
                },
                {
                  name: 'user-detail',
                  path: '/user-management/user-detail/:id',
                  component: './user-management/user-detail',
                  hideInMenu: true,
                },
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
                  name: 'order-detail',
                  path: '/order-management/order-detail/:id',
                  component: './order-management/order-detail',
                },
                {
                  name: 'retail-list',
                  path: '/order-management/retail-list',
                  component: './order-management/retail-list',
                },
                {
                  name: 'intensive-order',
                  path: '/order-management/intensive-order',
                  routes: [
                    {
                      name: 'shopkeeper-order',
                      path: '/order-management/intensive-order/shopkeeper-order',
                      component: './order-management/intensive-order/shopkeeper-order',
                    },
                    {
                      name: 'supplier-order',
                      path: '/order-management/intensive-order/supplier-order',
                      component: './order-management/intensive-order/supplier-order',
                    },
                  ]
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
              path: '/intensive-activity-management',
              name: 'intensive-activity-management',
              routes: [
                {
                  name: 'intensive-activity-list',
                  path: '/intensive-activity-management/intensive-activity-list',
                  component: './intensive-activity-management/intensive-activity-list',
                },
                {
                  name: 'intensive-activity-create',
                  path: '/intensive-activity-management/intensive-activity-create',
                  component: './intensive-activity-management/intensive-activity-create',
                  hideInMenu: true,
                },
              ]
            },
            {
              path: '/supplier-management',
              name: 'supplier-management',
              routes: [
                {
                  name: 'supplier-list',
                  path: '/supplier-management/supplier-list',
                  component: './supplier-management/supplier-list',
                },
                {
                  name: 'consultant-product-list',
                  path: '/supplier-management/consultant-product-list/:id',
                  component: './supplier-management/consultant-product-list',
                  hideInMenu: true,
                },
                {
                  name: 'consultant-supplier-list',
                  path: '/supplier-management/consultant-supplier-list/:id',
                  component: './supplier-management/consultant-supplier-list',
                  hideInMenu: true,
                },
                {
                  name: 'after-sale-address',
                  path: '/supplier-management/after-sale-address/:id',
                  component: './supplier-management/after-sale-address',
                  hideInMenu: true,
                },
                {
                  name: 'supplier-sub-account',
                  path: '/supplier-management/supplier-sub-account/:id',
                  component: './supplier-management/supplier-sub-account',
                  hideInMenu: true,
                },
                {
                  name: 'supplier-detail',
                  path: '/supplier-management/supplier-detail/:id',
                  component: './supplier-management/supplier-detail',
                  hideInMenu: true,
                },
              ]
            },
            // {
            //   path: '/asset-management',
            //   name: 'asset-management',
            //   routes: [
            //     {
            //       name: 'settlement-profit-list',
            //       path: '/asset-management/settlement-profit-list',
            //       component: './asset-management/settlement-profit-list',
            //     },
            //   ]
            // },
            {
              path: '/intensive-store-management',
              name: 'intensive-store-management',
              routes: [
                {
                  name: 'store-list',
                  path: '/intensive-store-management/store-list',
                  component: './intensive-store-management/store-list',
                },
                {
                  name: 'store-review',
                  path: '/intensive-store-management/store-review',
                  component: './intensive-store-management/store-review',
                },
                {
                  name: 'grade-index',
                  path: '/intensive-store-management/grade-index',
                  component: './intensive-store-management/grade-index',
                },
                {
                  name: 'assessment-reward',
                  path: '/intensive-store-management/assessment-reward',
                  component: './intensive-store-management/assessment-reward',
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
