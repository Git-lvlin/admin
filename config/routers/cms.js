const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/cms',
  name: 'cms',
  routes: [
    {
      name: 'banner-admin',
      path: '/cms/banner-admin',
      component: './cms/banner-admin',
      wrappers: [RouteWatcher],
    },
    {
      name: 'thematic-event-management',
      path: '/cms/thematic-event-management',
      component: './cms/thematic-event-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'home-activity',
      path: '/cms/home-activity',
      component: './cms/home-activity',
      wrappers: [RouteWatcher],
    },
    {
      name: 'goos-reg',
      path: '/cms/goos-reg',
      routes: [
        {
          name: 'member',
          path: '/cms/goos-reg/member',
          component: './cms/goos-reg/member',
          wrappers: [RouteWatcher],
        },
        {
          name: 'hot-goos',
          path: '/cms/goos-reg/hot-goos',
          component: './cms/goos-reg/hot-goos',
          wrappers: [RouteWatcher],
        },
        {
          name: 'crazy-date',
          path: '/cms/goos-reg/crazy-date',
          component: './cms/goos-reg/crazy-date',
          wrappers: [RouteWatcher],
        },
        {
          name: 'weekend-revelry',
          path: '/cms/goos-reg/weekend-revelry',
          component: './cms/goos-reg/weekend-revelry',
          wrappers: [RouteWatcher],
        },
        {
          name: 'save-money',
          path: '/cms/goos-reg/save-money',
          component: './cms/goos-reg/save-money',
          wrappers: [RouteWatcher],
        },
        {
          name: 'strategy-today',
          path: '/cms/goos-reg/strategy-today',
          component: './cms/goos-reg/strategy-today',
          wrappers: [RouteWatcher],
        },
        {
          name: 'chat-recommended-products',
          path: '/cms/goos-reg/chat-recommended-products',
          component: './cms/goos-reg/chat-recommended-products',
          wrappers: [RouteWatcher],
        },
        {
          name: 'recommended-products-configuration',
          path: '/cms/goos-reg/recommended-products-configuration',
          component: './cms/goos-reg/recommended-products-configuration',
          wrappers: [RouteWatcher],
        }
      ]
    },
    {
      path: '/cms/business-school',
      name: 'business-school',
      routes: [
        {
          name: 'article-list',
          path: '/cms/business-school/article-list',
          component: './cms/business-school/article-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'shopkeeper-disclose',
          path: '/cms/business-school/shopkeeper-disclose',
          component: './cms/business-school/shopkeeper-disclose',
          wrappers: [RouteWatcher],
          hideInMenu: true
        },
        {
          name: 'article-category-list',
          path: '/cms/business-school/article-category-list',
          component: './cms/business-school/article-category-list',
          wrappers: [RouteWatcher],
        },
      ]
    },
    {
      name: 'new-poster',
      path: '/cms/new-poster',
      component: './cms/new-poster',
      wrappers: [RouteWatcher],
    },
    {
      name: 'coupon',
      path: '/cms/coupon',
      component: './cms/coupon',
      wrappers: [RouteWatcher],
    },
    {
      name: 'hot-search',
      path: '/cms/hot-search',
      component: './cms/hot-search',
      wrappers: [RouteWatcher],
    },
    {
      name: 'market',
      path: '/cms/market',
      component: './cms/market',
      wrappers: [RouteWatcher],
    },
    {
      name: 'content-version',
      path: '/cms/content-version',
      component: './cms/content-version',
      wrappers: [RouteWatcher],
    },
    {
      path: '/cms/coupon-management',
      name: 'coupon-management',
      routes: [
        {
          name: 'coupon-list',
          path: '/cms/coupon-management/coupon-list',
          component: './cms/coupon-management/coupon-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'coupon-construction',
          path: '/cms/coupon-management/coupon-construction',
          component: './cms/coupon-management/coupon-construction',
          wrappers: [RouteWatcher],
          hideInMenu: true,
        },
        {
          name: 'coupon-codebase',
          path: '/cms/coupon-management/coupon-list/coupon-codebase',
          component: './cms/coupon-management/coupon-codebase',
          wrappers: [RouteWatcher],
          hideInMenu: true,
        },
        {
          name: 'list-details',
          path: '/cms/coupon-management/coupon-list/list-details',
          component: './cms/coupon-management/list-details',
          wrappers: [RouteWatcher],
          hideInMenu: true,
        },
        {
          name: 'coupon-audit',
          path: '/cms/coupon-management/coupon-audit',
          component: './cms/coupon-management/coupon-audit',
          wrappers: [RouteWatcher],
        },
        {
          name: 'audit-details',
          path: '/cms/coupon-management/coupon-audit/audit-details',
          component: './cms/coupon-management/audit-details',
          wrappers: [RouteWatcher],
          hideInMenu: true,
        },
        {
          name: 'coupon-crowd',
          path: '/cms/coupon-management/coupon-crowd',
          component: './cms/coupon-management/coupon-crowd',
          wrappers: [RouteWatcher],
        },
        {
          name: 'add-crowd',
          path: '/cms/coupon-management/coupon-crowd/add-crowd',
          component: './cms/coupon-management/coupon-crowd/add-crowd',
          wrappers: [RouteWatcher],
        }
      ],
    },
    {
      path: '/cms/message-management',
      name: 'message-management',
      routes: [
        {
          name: 'member-message-template-config',
          path: '/cms/message-management/member-message-template-config',
          component: './cms/message-management/member-message-template-config',
          wrappers: [RouteWatcher],
        },
        {
          name: 'store-message-template-config',
          path: '/cms/message-management/store-message-template-config',
          component: './cms/message-management/store-message-template-config',
          wrappers: [RouteWatcher],
        },
        {
          name: 'supplier-message-template-config',
          path: '/cms/message-management/supplier-message-template-config',
          component: './cms/message-management/supplier-message-template-config',
          wrappers: [RouteWatcher],
        },
        {
          name: 'platform-message-template-config',
          path: '/cms/message-management/platform-message-template-config',
          component: './cms/message-management/platform-message-template-config',
          wrappers: [RouteWatcher],
        },
        {
          name: 'custom-message',
          path: '/cms/message-management/custom-message',
          component: './cms/message-management/custom-message',
          wrappers: [RouteWatcher],
        },
        {
          name: 'audit',
          path: '/cms/message-management/custom-message/audit/:id',
          component: './cms/message-management/custom-message/audit',
          hideInMenu: true
        },
        {
          name: 'detail',
          path: '/cms/message-management/custom-message/detail/:id',
          component: './cms/message-management/custom-message/detail',
          hideInMenu: true
        },
        {
          name: 'stand-inside-letter-list',
          path: '/cms/message-management/stand-inside-letter-list',
          component: './cms/message-management/stand-inside-letter-list',
          wrappers: [RouteWatcher],
        },
        // {
        //   name: 'popup-template',
        //   path: '/cms/message-management/popup-template',
        //   component: './cms/message-management/popup-template',
        //   wrappers: [RouteWatcher],
        // }
      ]
    },
    {
      name: 'popup',
      path: '/cms/popup',
      routes: [
        {
          name: 'home-red-envelopes',
          path: '/cms/popup/home-red-envelopes',
          component: './cms/popup/home-red-envelopes',
          wrappers: [RouteWatcher],
        },
        {
          name: 'start-up',
          path: '/cms/popup/start-up',
          component: './cms/popup/start-up',
          wrappers: [RouteWatcher],
        },
        {
          name: 'home-popup',
          path: '/cms/popup/home-popup',
          component: './cms/popup/home-popup',
          wrappers: [RouteWatcher],
        },
        {
          name: 'popup-template',
          path: '/cms/popup/popup-template',
          component: './cms/popup/popup-template',
          wrappers: [RouteWatcher],
        },
      ]
    },
    {
      name: 'prohibited-words-management',
      path: '/cms/prohibited-words-management',
      component: './cms/prohibited-words-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'home-classification',
      path: '/cms/home-classification',
      component: './cms/home-classification',
      wrappers: [RouteWatcher],
    },
    {
      name: 'shipments-area-configuration',
      path: '/cms/shipments-area-configuration',
      component: './cms/shipments-area-configuration',
      wrappers: [RouteWatcher],
    },
    {
      name: 'cancel-reason',
      path: '/cms/cancel-reason',
      component: './cms/cancel-reason',
      wrappers: [RouteWatcher],
    },
    {
      name: 'story',
      path: '/cms/story',
      component: './cms/story',
      wrappers: [RouteWatcher],
    },
    {
      name: 'home-suspension',
      path: '/cms/home-suspension',
      component: './cms/home-suspension',
      wrappers: [RouteWatcher],
    },
    {
      name: 'generate-invitation-code',
      path: '/cms/generate-invitation-code',
      component: './cms/generate-invitation-code',
      wrappers: [RouteWatcher],
    },
    {
      name: 'express-news',
      path: '/cms/express-news',
      component: './cms/express-news',
      wrappers: [RouteWatcher],
    },
    {
      name: 'enjoy-earning',
      path: '/cms/enjoy-earning',
      component: './cms/enjoy-earning',
      wrappers: [RouteWatcher],
    },
    // {
    //   name: 'king-kong-district',
    //   path: '/cms/king-kong-district',
    //   component: './cms/king-kong-district',
    //   wrappers: [RouteWatcher],
    // },
    // {
    //   name: 'price-comparsion',
    //   path: '/cms/price-comparsion',
    //   routes: [
    //     {
    //       name: 'home-list',
    //       path: '/cms/price-comparsion/home-list',
    //       component: './cms/price-comparsion/home-list',
    //       wrappers: [RouteWatcher],
    //     },
    //     {
    //       name: 'low-goods',
    //       path: '/cms/price-comparsion/low-goods',
    //       component: './cms/price-comparsion/low-goods',
    //       wrappers: [RouteWatcher],
    //     },
    //   ],
    // },
    // {
    //   name: 'route-url-deploy',
    //   path: '/cms/route-url-deploy',
    //   component: './cms/route-url-deploy',
    //   wrappers: [RouteWatcher],
    // },
    // {
    //   name: 'poster',
    //   path: '/cms/poster',
    //   component: './cms/poster',
    //   wrappers: [RouteWatcher],
    // },
    {
      name: 'hydrogen-atom-start-window',
      path: '/cms/hydrogen-atom-start-window',
      component: './cms/hydrogen-atom-start-window',
      wrappers: [RouteWatcher],
    },
    {
      name: 'business-ads',
      path: '/cms/business-ads',
      routes: [
        {
          name: 'ads-management',
          path: '/cms/business-ads/ads-management',
          component: './cms/business-ads/ads-management',
          wrappers: [RouteWatcher],
        },
        {
          name: 'tripartite-advertising-data-statistics',
          path: '/cms/business-ads/tripartite-advertising-data-statistics',
          component: './cms/business-ads/tripartite-advertising-data-statistics',
          wrappers: [RouteWatcher],
        }
      ]
    }
  ]
}