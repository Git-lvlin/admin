import React, { useState, useRef } from 'react';
import { Button, Space, Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList } from '@/services/intensive-store-management/store-review';
import AddressCascader from '@/components/address-cascader';
import Form from './form';

const StoreReview = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();
  const formRef = useRef();

  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺ID'
      }
    },
    // {
    //   title: '店铺图片',
    //   dataIndex: ['details', 'storeLogo'],
    //   valueType: 'text',
    //   hideInSearch: true,
    //   render: (_) => <img src={_} width="50" height="50" />
    // },
    {
      title: '店主手机号',
      dataIndex: 'phone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主手机号'
      },
      render: (_, { details }) => details?.phone
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      },
      render: (_, { details }) => details?.storeName
    },
    {
      title: '提货点所在地区',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => `${details?.provinceName} ${details?.cityName} ${details?.regionName}`
    },
    {
      title: '提货点详细地址',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => details?.address
    },
    {
      title: '提货点门牌号',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => details?.houseNumber
    },
    {
      title: '提货店授权书',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => (
        <Space>
          <Image src={details.credentialUrl} width={50} height={50} />
        </Space>
      )
    },
    {
      title: '身份证',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => (
        <Space>
          <Image src={details.idHandheld} width={50} height={50} />
          <Image src={details.idFront} width={50} height={50} />
          <Image src={details.idBack} width={50} height={50} />
        </Space>
      )
    },
    {
      title: '所在地区',
      dataIndex: '',
      valueType: 'select',
      hideInTable: true,
    },
    {
      title: '详情地址',
      dataIndex: '',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入详情地址'
      },
      hideInTable: true,
    },
    {
      title: '审核状态',
      dataIndex: ['verifyStatus', 'code'],
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        1: '店铺入驻成功',
        2: '驳回',
        3: '已通过',
        4: '待审核'
      }
    },
    {
      title: '审核状态',
      dataIndex: 'verifyStatus',
      valueType: 'text',
      hideInTable: true,
      valueEnum: {
        1: '店铺入驻成功',
        2: '驳回',
        3: '已通过',
        4: '待审核'
      }
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      valueType: 'text',
      hideInTable: true,
      renderFormItem: () => <AddressCascader />
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: ['verifyStatus', 'code'],
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ === 4 && <a onClick={() => { setSelectItem(data); setFormVisible(true) }}>审核</a>;
      }
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
      {formVisible && <Form
        visible={formVisible}
        setVisible={setFormVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
    </PageContainer>
  );
};

export default StoreReview;
