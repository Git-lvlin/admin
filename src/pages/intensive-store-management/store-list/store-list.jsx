import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList } from '@/services/Intensive-store-management/store-list';

const StoreList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [config, setConfig] = useState({});
  const [offShelfVisible, setOffShelfVisible] = useState(false);
  const [selectItemId, setSelectItemId] = useState(null);
  const actionRef = useRef();
  const formRef = useRef();

  const getDetail = (id) => {
    api.getDetail({
      spuId: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data);
        setFormVisible(true);
      }
    })
  }

  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺ID'
      }
    },
    {
      title: '店铺图片',
      dataIndex: 'storeLogo',
      valueType: 'text',
      hideInSearch: true,
      render:(_) => <img src={_} width="50" height="50"/> 
    },
    {
      title: '店主手机号',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主手机号'
      }
    },
    {
      title: '店铺名称',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      }
    },
    {
      title: '等级',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '积分',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '提货点所在地区',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '集约任务',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '店主订单',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '商品',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '用户',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '所在地区',
      dataIndex: 'id',
      valueType: 'select',
      hideInTable: true,
    },
    {
      title: '详情地址',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入详情地址'
      },
      hideInTable: true,
    },
    {
      title: '审核状态',
      dataIndex: 'id',
      valueType: 'select',
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'options',
      render:() => <a>详情</a>
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        request={getStoreList}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
            <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
          ],
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default StoreList;
