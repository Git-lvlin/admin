import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import Form from './form';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const columns = [
    {
      title: '活动编号',
      dataIndex: 'brandName',
      valueType: 'select',
      hideInSearch: true,
    },
    {
      title: '活动名称',
      dataIndex: 'brandName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入名称'
      }
    },
    {
      title: '活动状态',
      dataIndex: 'brandName',
      valueType: 'select',
      valueEnum: {
        0: '全部',
        1: '待开始',
        2: '进行中',
        3: '已结束',
      },
      hideInTable: true,
    },
    {
      title: '活动时间',
      dataIndex: 'brandName',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '可购买后销售的会员店等级',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '可购买的会员等级',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '可恢复支付次数',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '每次恢复的支付时限(小时)',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '活动时段',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '订金支付截止时间',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'brandName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <>
          <a onClick={() => { setSelectItem(data); setFormVisible(true) }}>详情</a>
          &nbsp;
          <a style={{ color: 'red' }} onClick={() => { brandDel(data.brandId) }}>终止</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="out" type="primary" icon={<PlusOutlined />} onClick={() => { setFormVisible(true) }}>新建</Button>
        </div>
      </Card>
      <ProTable
        rowKey="brandId"
        options={false}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
        actionRef={actionRef}
      />
    </PageContainer>

  );
};

export default TableList;
