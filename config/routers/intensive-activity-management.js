export default {
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
      path: '/intensive-activity-management/intensive-activity-create/:id',
      component: './intensive-activity-management/intensive-activity-create',
      hideInMenu: true,
    },
    {
      name: 'intensive-activity-detail',
      path: '/intensive-activity-management/intensive-activity-detail/:id',
      component: './intensive-activity-management/intensive-activity-detail',
      hideInMenu: true,
    },
    {
      name: 'intensive-activity-audit',
      path: '/intensive-activity-management/intensive-activity-audit',
      component: './intensive-activity-management/intensive-activity-audit',
    },
    {
      name: 'intensive-activity-audit-detail',
      path: '/intensive-activity-management/intensive-activity-audit/detail/:id',
      component: './intensive-activity-management/intensive-activity-audit/detail',
      hideInMenu: true,
    },
    {
      name: 'intensive-remind-configuration',
      path: '/intensive-activity-management/intensive-remind-configuration',
      component: './intensive-activity-management/intensive-remind-configuration',
    },
    {
      name: 'intensive-remind-statistics',
      path: '/intensive-activity-management/intensive-remind-statistics',
      component: './intensive-activity-management/intensive-remind-statistics',
    },
    {
      name: 'platfor-bonus-percentage',
      path: '/intensive-activity-management/platfor-bonus-percentage',
      component: './intensive-activity-management/platfor-bonus-percentage',
    },
    {
      name: 'platfor-bonus-percentage-audit',
      path: '/intensive-activity-management/platfor-bonus-percentage-audit',
      component: './intensive-activity-management/platfor-bonus-percentage-audit',
    },
    {
      name: 'penny-activity',
      path: '/intensive-activity-management/penny-activity',
      routes: [
          {
            name: 'activity-list',
            path: '/intensive-activity-management/penny-activity/activity-list',
            component: './intensive-activity-management/penny-activity/activity-list'
          },
          {
            name: 'added-activity',
            path: '/intensive-activity-management/penny-activity/added-activity',
            component: './intensive-activity-management/penny-activity/added-activity',
            hideInMenu: true,
          },
          {
            name: 'activity-detail',
            path: '/intensive-activity-management/penny-activity/activity-detail',
            component: './intensive-activity-management/penny-activity/activity-detail',
            hideInMenu: true,
          },
          {
            name: 'activity-commodity',
            path: '/intensive-activity-management/penny-activity/activity-commodity',
            component: './intensive-activity-management/penny-activity/activity-commodity'
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
            component: './intensive-activity-management/special-offer-acticity/special-offer-acticity-list'
          },
          {
            name: 'add-activity',
            path: '/intensive-activity-management/special-offer-acticity/add-activity',
            component: './intensive-activity-management/special-offer-acticity/add-activity',
            hideInMenu: true,
          },
          {
            name: 'activity-detail',
            path: '/intensive-activity-management/special-offer-acticity/activity-detail',
            component: './intensive-activity-management/special-offer-acticity/activity-detail'
          },
        ]
    },
  ]
}
