const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
    path: '/hydrogen-atom-management',
    name: 'hydrogen-atom-management',
    routes: [
      {
        name: 'hydrogen-atom-configuration',
        path: '/hydrogen-atom-management/hydrogen-atom-configuration',
        component: './hydrogen-atom-management/hydrogen-atom-configuration',
        wrappers: [RouteWatcher],
      },
    ]
  }