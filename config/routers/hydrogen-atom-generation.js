const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  name: 'hydrogen-atom-generation',
  path: '/hydrogen-atom-generation',
  routes: [
    {
      name: 'generation-management',
      path: '/hydrogen-atom-generation/generation-management',
      component: './hydrogen-atom-generation/generation-management',
      wrappers: [RouteWatcher],
    },
  ]
}