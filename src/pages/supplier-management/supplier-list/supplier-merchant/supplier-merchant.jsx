import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { getCommonList, statusSwitch, detailExt } from '@/services/supplier-management/supplier-list'
import { history } from 'umi';
import Edit from './edit';
import DisableModal from './disable-modal';

const TableList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [disableModalVisible, setDisableModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const switchStatus = (reason) => {
    statusSwitch({
      supplierId: selectItem.id,
      type: selectItem.status === 1 ? 2 : 1,
      reason,
    }, { showSuccess: true, }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const getDetail = (id) => {
    detailExt({
      supplierId: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData({
          ...res.data.records,
        })
        setFormVisible(true)
      }
    })
  }

  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'companyName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商名称'
      }
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入登录账号'
      }
    },
    {
      title: '负责人',
      dataIndex: 'companyUserName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: '禁用',
        1: '启用'
      }
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
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
      title: '子账号',
      dataIndex: 'subAccountTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return <a onClick={() => { history.push(`/supplier-management/supplier-sub-account/${data.id}`) }}>{_}</a>
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          {data.status === 1 && <a onClick={() => { setSelectItem(data); setDisableModalVisible(true) }}>禁用</a>}
          {data.status === 0 && <a onClick={() => { setSelectItem(data); setDisableModalVisible(true) }}>启用</a>}
          <a onClick={() => { history.push(`/supplier-management/supplier-detail/${data.id}`) }}>详情</a>
          <a onClick={() => { getDetail(data.id) }}>编辑</a>
          <a onClick={() => { history.push(`/supplier-management/after-sale-address/${data.id}`) }}>售后地址</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={getCommonList}
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

      {disableModalVisible &&
        <DisableModal
          visible={disableModalVisible}
          setVisible={setDisableModalVisible}
          data={selectItem}
          callback={(v) => { switchStatus(v) }}
        />}
    </>

  );
};

export default TableList;
