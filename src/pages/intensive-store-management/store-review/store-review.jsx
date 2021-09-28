import React, { useState, useRef } from 'react';
import { Button, Space, Image, Tooltip } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList } from '@/services/intensive-store-management/store-review';
import AddressCascader from '@/components/address-cascader';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { history } from 'umi';
import Form from './form';
import Drawer from './store-review-detail';

const StoreReview = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
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
    // {
    //   title: '提货店授权书',
    //   dataIndex: '',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   render: (_, { details }) => (
    //     <Space>
    //       <Image src={details.credentialUrl} width={50} height={50} />
    //     </Space>
    //   )
    // },
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
      render: (_, data) => {
        if (_ === 2) {
          return (
            <>
              审核不通过&nbsp;
              <Tooltip title={data.auditMsg}><QuestionCircleOutlined /></Tooltip>
            </>
          )
        }
        return {
          0: '没有申请过',
          1: '审核通过',
          2: '审核不通过',
          3: '已缴保证金',
          4: '待缴保证金',
          5: '取消申请',
          6: '待审核',
        }[_]
      }
    },
    {
      title: '审核状态',
      dataIndex: 'verifyStatus',
      valueType: 'text',
      hideInTable: true,
      valueEnum: {
        0: '没有申请过',
        1: '审核通过',
        2: '审核不通过',
        3: '已缴保证金',
        4: '待缴保证金',
        5: '取消申请',
        6: '待审核',
      }
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect />)
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
        return _ !== 1 && <a onClick={() => { setDrawerVisible(true); setSelectItem(data); }}>审核</a>;
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
            // <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
      />
      {drawerVisible &&
        <Drawer
          id={selectItem.id}
          visible={drawerVisible}
          setVisible={setDrawerVisible}
          callback={() => {
            setDrawerVisible(false);
            setSelectItem(null);
            actionRef.current.reload()
          }}
        />
      }
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
