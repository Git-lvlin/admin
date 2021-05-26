import React, { useState, useRef } from 'react';
import { Button, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import moment from 'moment';
import { couponList } from '@/services/coupon-management/coupon-list';
import { history } from 'umi';





const TableList = () => {
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(false);
  const actionRef = useRef();
  const columns = [
    {
      title: '编号',
      dataIndex: 'nickName',
      valueType: 'text',
    },
    {
      title: '优惠券名称',
      dataIndex: 'couponName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入优惠券名称'
      }
    },
    {
      title: '优惠券类型',
      dataIndex: 'couponType',
      valueType: 'select',
      valueEnum: {
        1: '满减券',
        2: '折扣券',
        3: '立减券'
      }
    },
    {
      title: '使用范围',
      dataIndex: 'useType',
      valueType: 'select',
      valueEnum: {
        1: '秒约商品',
        2: '集约商品',
      },
      hideInSearch: true,
    },
    
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        params={{
          status: 1,
        }}
        request={couponList}
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
      />
    </PageContainer>

  );
};

export default TableList;
