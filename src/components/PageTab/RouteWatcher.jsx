import React from 'react';
import { RouteWatcher } from 'antd-pro-page-tabs';
import { useIntl } from 'umi';

export default (props) => {
  const intl = useIntl();
  const { route } = props;
  if (route.path) {
    route.name = intl.formatMessage({ id: `menu${route.path.replace(/\//g, '.')}` });
  }
  return <RouteWatcher {...props} />
}