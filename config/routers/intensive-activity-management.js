const RouteWatcher = '@/components/PageTab/RouteWatcher';


export default {
  path: '/intensive-activity-management',
  name: 'intensive-activity-management',
  routes: [
    {
      name: 'new',
      path: '/intensive-activity-management/new',
      routes: [
        {
          name: 'intensive-purchase-setting',
          path: '/intensive-activity-management/new/intensive-purchase-setting',
          component: './intensive-activity-management/new/intensive-purchase-setting',
          wrappers: [RouteWatcher]
        },
        {
          name: 'fresh-goods-sort',
          path: '/intensive-activity-management/new/fresh-goods-sort',
          component: './intensive-activity-management/new/fresh-goods-sort',
          wrappers: [RouteWatcher],
        },
        {
          name: 'fresh-goods-class',
          path: '/intensive-activity-management/new/fresh-goods-class',
          component: './intensive-activity-management/new/fresh-goods-class',
          wrappers: [RouteWatcher],
        },
      ]
    },
    {
      name: 'old',
      path: '/intensive-activity-management/old',
      routes: [
        {
          name: 'intensive-activity-list',
          path: '/intensive-activity-management/old/intensive-activity-list',
          component: './intensive-activity-management/old/intensive-activity-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'intensive-bulk-activity-list',
          path: '/intensive-activity-management/old/intensive-bulk-activity-list',
          component: './intensive-activity-management/old/intensive-bulk-activity-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'intensive-activity-profit-detail',
          path: '/intensive-activity-management/old/intensive-activity-profit-detail',
          component: './intensive-activity-management/old/intensive-activity-profit-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'intensive-activity-create',
          path: '/intensive-activity-management/old/intensive-activity-create/:id',
          component: './intensive-activity-management/old/intensive-activity-create',
          hideInMenu: true,
        },
        {
          name: 'intensive-bulk-activity-create',
          path: '/intensive-activity-management/old/intensive-bulk-activity-create/:id',
          component: './intensive-activity-management/old/intensive-bulk-activity-create',
          hideInMenu: true,
        },
        {
          name: 'intensive-activity-detail',
          path: '/intensive-activity-management/old/intensive-activity-detail/:id',
          component: './intensive-activity-management/old/intensive-activity-detail',
          hideInMenu: true,
        },
        {
          name: 'intensive-bulk-activity-detail',
          path: '/intensive-activity-management/old/intensive-bulk-activity-detail/:id',
          component: './intensive-activity-management/old/intensive-bulk-activity-detail',
          hideInMenu: true,
        },
        {
          name: 'intensive-activity-audit',
          path: '/intensive-activity-management/old/intensive-activity-audit',
          component: './intensive-activity-management/old/intensive-activity-audit',
          wrappers: [RouteWatcher],
        },
        {
          name: 'intensive-activity-audit-detail',
          path: '/intensive-activity-management/old/intensive-activity-audit/detail/:id',
          component: './intensive-activity-management/old/intensive-activity-audit/detail',
          hideInMenu: true,
        },
        {
          name: 'intensive-bulk-activity-audit-detail',
          path: '/intensive-activity-management/old/intensive-bulk-activity-audit/detail/:id',
          component: './intensive-activity-management/old/intensive-activity-audit/bulk-detail',
          hideInMenu: true,
        },
        {
          name: 'intensive-remind-configuration',
          path: '/intensive-activity-management/old/intensive-remind-configuration',
          component: './intensive-activity-management/old/intensive-remind-configuration',
          wrappers: [RouteWatcher],
        },
        {
          name: 'intensive-remind-statistics',
          path: '/intensive-activity-management/old/intensive-remind-statistics',
          component: './intensive-activity-management/old/intensive-remind-statistics',
          wrappers: [RouteWatcher],
        },
        {
          name: 'platfor-bonus-percentage',
          path: '/intensive-activity-management/old/platfor-bonus-percentage',
          component: './intensive-activity-management/old/platfor-bonus-percentage',
          wrappers: [RouteWatcher],
        },
        {
          name: 'platfor-bonus-percentage-audit',
          path: '/intensive-activity-management/old/platfor-bonus-percentage-audit',
          component: './intensive-activity-management/old/platfor-bonus-percentage-audit',
          wrappers: [RouteWatcher],
        },
        {
          name: 'goods-sort',
          path: '/intensive-activity-management/old/goods-sort',
          component: './intensive-activity-management/old/goods-sort',
          wrappers: [RouteWatcher],
        },
        {
          name: 'goods-class',
          path: '/intensive-activity-management/old/goods-class',
          component: './intensive-activity-management/old/goods-class',
          wrappers: [RouteWatcher],
        },
      ]
    },
    
    {
      name: 'penny-activity',
      path: '/intensive-activity-management/penny-activity',
      routes: [
          {
            name: 'activity-list',
            path: '/intensive-activity-management/penny-activity/activity-list',
            component: './intensive-activity-management/penny-activity/activity-list',
            wrappers: [RouteWatcher],
          },
          {
            name: 'added-activity',
            path: '/intensive-activity-management/penny-activity/added-activity',
            component: './intensive-activity-management/penny-activity/added-activity',
            hideInMenu: true,
            wrappers: [RouteWatcher],
          },
          // {
          //   name: 'activity-detail',
          //   path: '/intensive-activity-management/penny-activity/activity-detail',
          //   component: './intensive-activity-management/penny-activity/activity-detail',
          //   hideInMenu: true,
          //   wrappers: [RouteWatcher],
          // },
          {
            name: 'activity-tabulate-data',
            path: '/intensive-activity-management/penny-activity/activity-tabulate-data',
            component: './intensive-activity-management/penny-activity/activity-tabulate-data',
          },
        ]
    },
    {
      name: 'special-offer-acticity',
      path: '/intensive-activity-management/special-offer-acticity',
      routes: [
          {
            name: 'special-offer-acticity-list',
            path: '/intensive-activity-management/special-offer-acticity/special-offer-acticity-list',
            component: './intensive-activity-management/special-offer-acticity/special-offer-acticity-list',
            wrappers: [RouteWatcher],
          },
          {
            name: 'add-activity',
            path: '/intensive-activity-management/special-offer-acticity/add-activity',
            component: './intensive-activity-management/special-offer-acticity/add-activity',
            hideInMenu: true,
            wrappers: [RouteWatcher],
          },
          {
            name: 'activity-detail',
            path: '/intensive-activity-management/special-offer-acticity/activity-detail',
            component: './intensive-activity-management/special-offer-acticity/activity-detail',
            hideInMenu: true,
            wrappers: [RouteWatcher],
          },
          {
            name: 'activity-tabulate-data',
            path: '/intensive-activity-management/special-offer-acticity/activity-tabulate-data',
            component: './intensive-activity-management/special-offer-acticity/activity-tabulate-data',
          },
        ]
    },
  ]
}
