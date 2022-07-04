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
    }
  ]
}