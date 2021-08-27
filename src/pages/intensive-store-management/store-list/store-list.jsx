import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Tooltip } from 'antd';
import ProTable from '@ant-design/pro-table';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList } from '@/services/intensive-store-management/store-list';
import { history } from 'umi';
import AddressCascader from '@/components/address-cascader';
import Form from './form';
import Create from './create';
import Return from './return';
import ExcelModal from './excel-modal'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const StoreList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const [excelVisible, setExcelVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [visit, setVisit] = useState(false)
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
    //   dataIndex: 'storeLogo',
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
      hideInTable: true,
    },
    {
      title: '店主',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => <div><div>{data.phone}</div><div>{data.linkman}</div></div>
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      }
    },
    {
      title: '积分',
      dataIndex: 'score',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '积分',
    //   dataIndex: 'score',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    {
      title: '提货点所在地区',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '集约任务',
      dataIndex: 'wholeTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a
            onClick={() => {
              history.push({
                pathname: `/intensive-store-management/intensive-task/${data.storeNo}`,
                query: {
                  storeName: data.storeName,
                  phone: data.phone,
                  linkman: data.linkman,
                  memberId: data.memberId,
                }
              })
            }}>
            {_}
          </a>
          : _
      }
    },
    {
      title: '店内订单',
      dataIndex: 'saleOrderTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shopkeeper-order/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.linkman,
              }
            })
          }}>
            {_}
          </a>
          :
          _
      }
    },
    {
      title: '商品',
      dataIndex: 'productTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/product-management/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.linkman,
              }
            })
          }}>{_}</a>
          :
          _
      }
    },
    {
      title: '订单用户',
      dataIndex: 'userTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shop-user/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.linkman,
              }
            })
          }}>{_}</a>
          :
          _
      }
    },
    {
      title: '直推用户',
      dataIndex: 'shopkeeperInvitedTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shopkeeper-user/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.linkman,
                memberId: data.memberId,
              }
            })
          }}>{_}</a>
          :
          _
      }
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect />)
    },
    {
      title: '详情地址',
      dataIndex: 'address',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入详情地址'
      },
      hideInTable: true,
    },
    {
      title: '营业状态',
      dataIndex: ['status', 'desc'],
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        const { remark } = data;
        return (
          <>
            {_}&nbsp;
            {remark && <Tooltip title={remark}><QuestionCircleOutlined /></Tooltip>}
          </>
        )
      }
    },
    {
      title: '营业状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '启用',
        2: '注销',
        3: '关闭'
      },
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          <a onClick={() => { history.push(`/intensive-store-management/store-detail/${data.storeNo}`) }}>详情</a>
          {data.status.code === 2 && <a onClick={() => { setSelectItem({ ...data, type: 1 }); setReturnVisible(true) }}>线下退保证金登记</a>}
          {data.status.code === 2 && <a onClick={() => { setSelectItem({ ...data, type: 2 }); setReturnVisible(true) }}>线上原路退回保证金</a>}
          {data.status.code === 1 && <a onClick={() => { setSelectItem({ ...data, toStatus: 3 }); setFormVisible(true) }}>关闭</a>}
          {data.status.code === 3 && <a onClick={() => { setSelectItem({ ...data, toStatus: 1 }); setFormVisible(true) }}>开启</a>}
          {data.status.code === 3 && <a onClick={() => { setSelectItem({ ...data, toStatus: 2 }); setFormVisible(true) }}>注销</a>}
        </Space>
      )
    },
  ];

  const getFieldValue = () => {
    if (formRef?.current?.getFieldsValue) {
      const { current, pageSize, area = [], ...rest } = formRef?.current?.getFieldsValue?.();
      return {
        provinceId: area[0]?.value,
        cityId: area[1]?.value,
        regionId: area[2]?.value,
        ...rest
      }
    }
    return {}
  }

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
            <Button
              key="new"
              onClick={() => {
                setCreateVisible(true);
              }}
            >
              新建
            </Button>,
            <Export
              change={(e) => { setVisit(e) }}
              key="export"
              type="community-shopkeeper-export"
              conditions={getFieldValue}
            />,
            <ExportHistory key="exportHistory" show={visit} setShow={setVisit} type="community-shopkeeper-export" />
            // <Button
            //   key="new2"
            //   onClick={() => {
            //     setExcelVisible(true);
            //   }}
            // >
            //   批量新建
            // </Button>,
            // <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
      />
      {formVisible && <Form
        visible={formVisible}
        setVisible={setFormVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
      {returnVisible && <Return
        visible={returnVisible}
        setVisible={setReturnVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
      {createVisible && <Create
        visible={createVisible}
        setVisible={setCreateVisible}
        callback={() => { actionRef.current.reload() }}
      />}
      {excelVisible && <ExcelModal
        visible={excelVisible}
        setVisible={setExcelVisible}
        callback={() => { actionRef.current.reload() }}
      />}
    </PageContainer>
  );
};

export default StoreList;
