// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import user from './routers/user'
import userManagement from './routers/user-management'
import orderManagement from './routers/order-management'
import productManagement from './routers/product-management'
import setting from './routers/setting'
import fingerDoctor from './routers/finger-doctor'
import intensiveActivityManagement from './routers/intensive-activity-management'
import supplierManagement from './routers/supplier-management'
import operationManagement from './routers/operation-management'
import intensiveStoreManagement from './routers/intensive-store-management'
// import singleContractActivityManagement from './routers/single-contract-activity-management'
// import groupContractActivityManagement from './routers/group-contract-activity-management'
import couponManagement from './routers/coupon-management'
import messageManagement from './routers/message-management'
import cms from './routers/cms'
import businessSchool from './routers/business-school'
// import communityManagement from './routers/community-management'
import ProductSharingManagement from './routers/product-sharing-management'
import DaifaStoreManagement from './routers/daifa-store-management'
// import pcm from './routers/price-comparsion-management'
import financialManagement from './routers/financial-management'
import dataBoard from './routers/data-board'
import dc from './routers/dc'
import signActivityManagement from './routers/sign-activity-management'
import BlindBoxActivityManagement from './routers/blind-box-activity-management'
import ActivityManagement from './routers/activity-management'
import GroupActivitiesManagement from './routers/group-activities-management'
import HydrogenAtomManagement from './routers/hydrogen-atom-management'
import BuriedPoint from "./routers/buried-point"
import OfficeManagement from './routers/office-management'
import CityOfficeManagement from './routers/city-office-management'
import AedTeamLeader from './routers/aed-team-leader'
import GreatProjectTeam from './routers/great-project-team'
import HydrogenAtomGeneration from './routers/hydrogen-atom-generation'
import GreatHealthProvince from './routers/great-health-province'
import HydrogenAtomTrusteeship from './routers/hydrogen-atom-trusteeship'
import productPerformanceManagement from './routers/product-performance-management'
import healthPackageActivities from './routers/health-package-activities'
import loveFeedbackActivities from './routers/love-feedback-activities'
import healthGiftPackageActivities from './routers/health-gift-package-activities'

const { REACT_APP_ENV } = process.env;

const config = {
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
  webpack5: {},
  mfsu: {},
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
              redirect: '/workplace',
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
            fingerDoctor,
            intensiveActivityManagement,
            supplierManagement,
            operationManagement,
            intensiveStoreManagement,
            // singleContractActivityManagement,
            // groupContractActivityManagement,
            messageManagement,
            couponManagement,
            cms,
            // pcm,
            // communityManagement,
            DaifaStoreManagement,
            businessSchool,
            ProductSharingManagement,
            financialManagement,
            dataBoard,
            dc,
            signActivityManagement,
            BlindBoxActivityManagement,
            ActivityManagement,
            GroupActivitiesManagement,
            HydrogenAtomManagement,
            HydrogenAtomTrusteeship,
            BuriedPoint,
            OfficeManagement,
            CityOfficeManagement,
            AedTeamLeader,
            GreatProjectTeam,
            HydrogenAtomGeneration,
            GreatHealthProvince,
            productPerformanceManagement,
            healthPackageActivities,
            loveFeedbackActivities,
            healthGiftPackageActivities,
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
}
if (process.env.NODE_ENV !== 'development') {
  config.chunks = ['vendors', 'umi'];
  config.chainWebpack = function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      }
    });
  }
}
export default defineConfig(config);
