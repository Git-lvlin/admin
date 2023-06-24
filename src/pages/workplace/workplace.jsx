import React from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@/components/PageContainer';
import { history } from 'umi';
import { ProfileOutlined } from '@ant-design/icons'
import { getAuth } from '@/components/auth'

import style from './style.less'

const data = [
  {
    url: '/order-management/normal-order',
    name: '普通订单'
  },
  {
    url: '/product-management/supplier/product-list',
    name: '商品管理'
  },
  {
    url: '/user-management/user-list',
    name: '用户管理'
  },
  {
    url: '/intensive-store-management/store-list',
    name: '集约店铺管理'
  },
  {
    url: '/cms/popup/start-up',
    name: '启动广告配置'
  },
  {
    url: '/cms/banner-admin',
    name: 'banner管理'
  },
  {
    url: '/cms/home-activity',
    name: '首页活动图标'
  },
  {
    url: '/supplier-management/supplier-list',
    name: '供应商管理'
  },
  {
    url: '/intensive-activity-management/new/fresh-goods-sort',
    name: '集约活动管理'
  },
  {
    url: '/financial-management/money-management/yeahgo-virtual-account-management',
    name: '约购虚拟户'
  },
  {
    url: '/setting/account-management',
    name: '设置'
  },
]


const WorkPlace = () => {
  return (
    <PageContainer>
      <ProCard.Group wrap title="常用功能" headerBordered>
        {
          data.map(item => {
            return getAuth(item.url.substring(1)) && <ProCard colSpan="148px">
            <div className={style.card} onClick={() => { history.push(item.url) }}>
              <div>
                <ProfileOutlined />
              </div>
              <span>{item.name}</span>
            </div>
          </ProCard>
          })
        }
        {/* <ProCard colSpan="148px">
          <div className={style.card} onClick={() => { history.push('/order-management/normal-order') }}>
            <div>
              <ProfileOutlined />
            </div>
            <span>订单管理</span>
          </div>
        </ProCard>
        <ProCard colSpan="148px">
          <div className={style.card} onClick={() => { history.push('/order-management/normal-order') }}>
            <div>
              <ProfileOutlined />
            </div>
            <span>订单管理</span>
          </div>
        </ProCard> */}
        
      </ProCard.Group>
    </PageContainer>
  );
};

export default WorkPlace
