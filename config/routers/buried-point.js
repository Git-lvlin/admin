const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/buried-point',
  name: 'buried-point',
  routes: [
    {
      name: 'incident-analysts',
      path: '/buried-point/incident-analysts',
      component: './buried-point/incident-analysts',
      wrappers: [RouteWatcher],
    },
    {
      name: 'metadata-management',
      path: '/buried-point/metadata-management',
      routes: [
        {
          name: 'meta-event',
          path: '/buried-point/metadata-management/meta-event',
          component: './buried-point/metadata-management/meta-event',
          wrappers: [RouteWatcher],
        }
      ]
    },
  ]
}