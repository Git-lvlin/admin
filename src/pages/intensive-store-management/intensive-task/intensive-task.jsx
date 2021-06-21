import React from 'react'
import { Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { orderPage } from '@/services/intensive-store-management/intensive-task';
import { useParams, useLocation } from 'umi';

const IntensiveTask = props => {
  const params = useParams();
  const location = useLocation();
  const columns = [
    {
      title: '活动编号',
      dataIndex: 'wsId',
      valueType: 'text',
    },
    {
      title: '活动名称',
      dataIndex: 'wsName',
      valueType: 'text',
    },
    {
      title: '集约量',
      dataIndex: 'totalNum',
      valueType: 'text',
    },
    {
      title: '集约金额',
      dataIndex: 'totalAmount',
      valueType: 'text',
    },
    {
      title: '活动商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
    },
    {
      title: '活动商品skuID',
      dataIndex: 'skuIds',
      valueType: 'text',
    },
    {
      title: '活动时段',
      dataIndex: 'wholesaleTime',
      valueType: 'text',
      render: (_, data) => (
        <>
          {data.wholesaleStartTime}<br/>
          {data.wholesaleEndTime}
        </>
      )
    },
    {
      title: '活动状态',
      dataIndex: 'wsStatus',
      valueType: 'text',
    },
    {
      title: '活动采购单数',
      dataIndex: 'total',
      valueType: 'text',
    },
  ];
  return (
    <PageContainer>
      <div style={{ marginBottom: 10, background: '#fff', padding: 10 }}>
        <Space size="large">
          <span>{location?.query?.storeName}</span>
          <span>({location?.query?.linkman} {location?.query?.phone})</span>
        </Space>
      </div>
      <ProTable
        rowKey="wsId"
        options={false}
        params={{
          storeNo: params.id
        }}
        request={orderPage}
        search={false}
        columns={columns}
      />
    </PageContainer>
  )
}


export default IntensiveTask;
