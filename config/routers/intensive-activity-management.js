const RouteWatcher = '@/components/PageTab/RouteWatcher';


export default {
  path: '/intensive-activity-management',
  name: 'intensive-activity-management',
  routes: [
    {
      name: 'intensive-activity-list',
      path: '/intensive-activity-management/intensive-activity-list',
      component: './intensive-activity-management/intensive-activity-list',
      wrappers: [RouteWatcher],
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
      wrappers: [RouteWatcher],
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
      wrappers: [RouteWatcher],
    },
    {
      name: 'intensive-remind-statistics',
      path: '/intensive-activity-management/intensive-remind-statistics',
      component: './intensive-activity-management/intensive-remind-statistics',
      wrappers: [RouteWatcher],
    },
    {
      name: 'platfor-bonus-percentage',
      path: '/intensive-activity-management/platfor-bonus-percentage',
      component: './intensive-activity-management/platfor-bonus-percentage',
      wrappers: [RouteWatcher],
    },
    {
      name: 'platfor-bonus-percentage-audit',
      path: '/intensive-activity-management/platfor-bonus-percentage-audit',
      component: './intensive-activity-management/platfor-bonus-percentage-audit',
      wrappers: [RouteWatcher],
    }
  ]
}
