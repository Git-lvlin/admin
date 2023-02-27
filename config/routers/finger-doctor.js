const RouteWatcher = '@/components/PageTab/RouteWatcher';

export default {
  path: '/finger-doctor',
  name: 'finger-doctor',
  routes: [
    {
      name: 'user-health-data-management',
      path: '/finger-doctor/user-health-data-management',
      component: './finger-doctor/user-health-data-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'device-management-period-management',
      path: '/finger-doctor/device-management-period-management',
      component: './finger-doctor/device-management-period-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'health-detection-record-management',
      path: '/finger-doctor/health-detection-record-management',
      component: './finger-doctor/health-detection-record-management',
      wrappers: [RouteWatcher],
    },
    {
      name: 'report-push-object-config',
      path: '/finger-doctor/report-push-object-config',
      component: './finger-doctor/report-push-object-config',
      wrappers: [RouteWatcher],
    },
  ],
}
