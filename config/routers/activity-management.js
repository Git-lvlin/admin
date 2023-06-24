const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/activity-management',
  name: 'activity-management',
  routes: [
    {
      path: '/activity-management/sign-activity-management',
      name: 'sign-activity-management',
      routes: [
        {
          name: 'sign-rule',
          path: '/activity-management/sign-activity-management/sign-rule',
          component: './activity-management/sign-activity-management/sign-rule',
          wrappers: [RouteWatcher],
        },
        {
          name: 'usable-commodity',
          path: '/activity-management/sign-activity-management/usable-commodity',
          component: './activity-management/sign-activity-management/usable-commodity',
          wrappers: [RouteWatcher],
        },
        {
          name: 'grant-detail',
          path: '/activity-management/sign-activity-management/grant-detail',
          component: './activity-management/sign-activity-management/grant-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'consume-detail',
          path: '/activity-management/sign-activity-management/consume-detail',
          component: './activity-management/sign-activity-management/consume-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'user-detail',
          path: '/activity-management/sign-activity-management/user-detail',
          component: './activity-management/sign-activity-management/user-detail',
          wrappers: [RouteWatcher],
          hideInMenu: true
        },
        {
          name: 'show-configuration',
          path: '/activity-management/sign-activity-management/show-configuration',
          component: './activity-management/sign-activity-management/show-configuration',
          wrappers: [RouteWatcher],
        }
      ]
    },
    {
      path: '/activity-management/blind-box-activity-management',
      name: 'blind-box-activity-management',
      routes: [
        {
          name: 'blind-box-management-list',
          path: '/activity-management/blind-box-activity-management/blind-box-management-list',
          component: './activity-management/blind-box-activity-management/blind-box-management-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'blind-box-consume-detail',
          path: '/activity-management/blind-box-activity-management/blind-box-consume-detail',
          component: './activity-management/blind-box-activity-management/blind-box-consume-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'blind-box-grant-detail',
          path: '/activity-management/blind-box-activity-management/blind-box-grant-detail',
          component: './activity-management/blind-box-activity-management/blind-box-grant-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'blind-box-employ-detail',
          path: '/activity-management/blind-box-activity-management/blind-box-employ-detail',
          component: './activity-management/blind-box-activity-management/blind-box-employ-detail',
          wrappers: [RouteWatcher],
          hideInMenu: true
        },
        {
          name: 'bind-box-rule-set',
          path: '/activity-management/blind-box-activity-management/bind-box-rule-set',
          component: './activity-management/blind-box-activity-management/bind-box-rule-set',
          wrappers: [RouteWatcher],
          hideInMenu: true
        },
        {
          name: 'blind-box-withdraw-deposit-detail',
          path: '/activity-management/blind-box-activity-management/blind-box-withdraw-deposit-detail',
          component: './activity-management/blind-box-activity-management/blind-box-withdraw-deposit-detail',
          wrappers: [RouteWatcher],
        }
      ]
    },
    {
      name: 'everyday-red-packet-activity',
      path: '/activity-management/everyday-red-packet-activity',
      routes: [
        {
          name: 'activity-list',
          path: '/activity-management/everyday-red-packet-activity/activity-list',
          component: './activity-management/everyday-red-packet-activity/activity-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'red-packet-particulars',
          path: '/activity-management/everyday-red-packet-activity/red-packet-particulars',
          component: './activity-management/everyday-red-packet-activity/red-packet-particulars',
          wrappers: [RouteWatcher],
        },
        {
          name: 'everyday-packet-rule',
          path: '/activity-management/everyday-red-packet-activity/everyday-packet-rule',
          component: './activity-management/everyday-red-packet-activity/everyday-packet-rule',
          wrappers: [RouteWatcher],
          hideInMenu: true
        }
      ]
    },
    {
      path: '/activity-management/group-activities-management',
      name: 'group-activities-management',
      routes: [
        {
          name: 'activity-list',
          path: '/activity-management/group-activities-management/activity-list',
          component: './activity-management/group-activities-management/activity-list',
          wrappers: [RouteWatcher]
        },
        {
          name: 'activity-data',
          path: '/activity-management/group-activities-management/activity-data',
          component: './activity-management/group-activities-management/activity-data',
          wrappers: [RouteWatcher]
        },
      ]
    },
    {
      name: 'share-red-packet-activity',
      path: '/activity-management/share-red-packet-activity',
      routes: [
        {
          name: 'activity-list',
          path: '/activity-management/share-red-packet-activity/activity-list',
          component: './activity-management/share-red-packet-activity/activity-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'activity-data',
          path: '/activity-management/share-red-packet-activity/activity-data',
          component: './activity-management/share-red-packet-activity/activity-data',
          wrappers: [RouteWatcher],
        },
        {
          name: 'share-packet-rule',
          path: '/activity-management/share-red-packet-activity/share-packet-rule',
          component: './activity-management/share-red-packet-activity/share-packet-rule',
          wrappers: [RouteWatcher],
          hideInMenu: true
        }
      ]
    },
    {
      name: 'spring-festival-build-building-activity',
      path: '/activity-management/spring-festival-build-building-activity',
      routes: [
        {
          name: 'spring-festival-list',
          path: '/activity-management/spring-festival-build-building-activity/spring-festival-list',
          component: './activity-management/spring-festival-build-building-activity/spring-festival-list',
          wrappers: [RouteWatcher],
        },
        {
          name: 'rule-configuration',
          path: '/activity-management/spring-festival-build-building-activity/rule-configuration',
          component: './activity-management/spring-festival-build-building-activity/rule-configuration',
          wrappers: [RouteWatcher],
          hideInMenu: true
        },
        {
          name: 'consume-detail',
          path: '/activity-management/spring-festival-build-building-activity/consume-detail',
          component: './activity-management/spring-festival-build-building-activity/consume-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'grant-detail',
          path: '/activity-management/spring-festival-build-building-activity/grant-detail',
          component: './activity-management/spring-festival-build-building-activity/grant-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'employ-detail',
          path: '/activity-management/spring-festival-build-building-activity/employ-detail',
          component: './activity-management/spring-festival-build-building-activity/employ-detail',
          wrappers: [RouteWatcher],
          hideInMenu: true
        },
        {
          name: 'cash-advance-detail',
          path: '/activity-management/spring-festival-build-building-activity/cash-advance-detail',
          component: './activity-management/spring-festival-build-building-activity/cash-advance-detail',
          wrappers: [RouteWatcher],
        },
        {
          name: 'ranking-data',
          path: '/activity-management/spring-festival-build-building-activity/ranking-data',
          component: './activity-management/spring-festival-build-building-activity/ranking-data',
          wrappers: [RouteWatcher],
        },
        {
          name: 'binding-set',
          path: '/activity-management/spring-festival-build-building-activity/binding-set',
          component: './activity-management/spring-festival-build-building-activity/binding-set',
          wrappers: [RouteWatcher],
        },
      ]
    },
  ]
}