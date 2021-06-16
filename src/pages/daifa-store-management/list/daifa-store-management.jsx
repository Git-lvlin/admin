import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { storeList, storeDetail } from '@/services/daifa-store-management/list'
import { history } from 'umi';
import Edit from './edit';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const actionRef = useRef();

  const switchStatus = (id, type) => {
    statusSwitch({
      supplierId: id,
      type
    }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const getDetail = (id) => {
    storeDetail({
      storeNo: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
        setFormVisible(true)
      }
    })
  }

  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      }
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主姓名'
      }
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入手机号码'
      }
    },
    {
      title: '微信号',
      dataIndex: 'wechatNo',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '岗位或角色',
      dataIndex: 'station',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '已启用',
        2: '已禁用',
        3: '未激活'
      }
    },
    {
      title: '商品数',
      dataIndex: 'goodsTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        if (_ === 0) {
          return _;
        }
        return <a onClick={() => { history.push(`/supplier-management/supplier-sub-account/${data.id}`) }}>{_}</a>
      }
    },
    {
      title: '创建人',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          {data.status === 1 && <a onClick={() => { switchStatus(data.id, 2) }}>禁用</a>}
          {data.status === 2 && <a onClick={() => { switchStatus(data.id, 1) }}>启用</a>}
          <a onClick={() => { history.push(`/supplier-management/supplier-detail/${data.storeNo}`) }}>详情</a>
          <a onClick={() => { getDetail(data.storeNo) }}>编辑</a>
          <a onClick={() => { history.push(`/supplier-management/after-sale-address/${data.id}`) }}>佣金明细</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={storeList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
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
            <Button key="out" type="primary" onClick={() => { setFormVisible(true) }}>新建</Button>,
          ],
        }}
        columns={columns}
        actionRef={actionRef}
      />
      {formVisible && <Edit
        visible={formVisible}
        setVisible={setFormVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { setDetailData(null) }}
      />}
    </>

  );
};

export default TableList;
