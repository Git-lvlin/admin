import TimeSelect from '@/components/time-select'
import React, { useState, useRef } from 'react';
import { Button, Space, Image, Tooltip } from 'antd';
import ProTable from '@/components/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { getStoreList } from '@/services/intensive-store-management/store-review';
import AddressCascader from '@/components/address-cascader';
import { QuestionCircleOutlined } from '@ant-design/icons'
import Form from './form';
import Drawer from './store-review-detail';
import RangeInput from '@/components/range-input';
import CancelModel from './cancel-model'

const StoreReview = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
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
      },
      width: 80,
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInTable: true,
      order:-1
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
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
      title: '店主姓名',
      dataIndex: 'realname',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主姓名'
      },
    },
    {
      title: '提货点所在地区',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) =>{
        if(details?.provinceName){
          return `${details?.provinceName} ${details?.cityName} ${details?.regionName}`
        }else{
          return '-'
        }
      } 
    },
    {
      title: '提货点详细地址',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => details?.address
    },
    {
      title: '交保证金(元)',
      dataIndex: 'deposit',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => _ / 100
    },
    {
      title: '交服务费(元)',
      dataIndex: 'serviceFee',
      valueType: 'text',
      hideInSearch: true,
      render: (_) => _ / 100
    },
    {
      title: '提货点门牌号',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, { details }) => details?.houseNumber,
      width: 120,
    },
    {
      title: '申请类型',
      dataIndex: 'applyType',
      valueType: 'select',
      valueEnum: {
        10: '正常申请',
        11: 'VIP社区店',
        20: '绿色通道申请',
        30: '健康生活馆',
        33: '爱心回馈系统建店',
        36: '早筛孝爱活动建站',
        40: '区县服务商建店',
        41: '门店合作商建店'
      },
      hideInTable: true,
    },
    {
      title: '申请类型',
      dataIndex: ['applyType', 'desc'],
      width: 100,
      hideInSearch: true,
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
          {/* <Image src={details.idHandheld} width={50} height={50} /> */}
          <Image src={details.idFront} width={50} height={50} />
          <Image src={details.idBack} width={50} height={50} />
        </Space>
      )
    },
    // {
    //   title: '详情地址',
    //   dataIndex: '',
    //   valueType: 'text',
    //   fieldProps: {
    //     placeholder: '请输入详情地址'
    //   },
    //   hideInTable: true,
    // },
    {
      title: '入驻状态',
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
          0: '全部',
          2: '审核不通过',
          3: '已缴费',
          4: '待缴费',
          5: '取消申请',
          6: '待审核',
        }[_]
      }
    },
    {
      title: '入驻状态',
      dataIndex: 'verifyStatus',
      valueType: 'text',
      hideInTable: true,
      valueEnum: {
        0: '全部',
        2: '审核不通过',
        3: '已缴费',
        4: '待缴费',
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
      title: '提交认证时间',
      dataIndex: 'provideTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true,
    },
    {
      title: '提交认证时间',
      dataIndex: 'provideTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '交保证金金额',
      dataIndex: 'deposit',
      valueType: 'text',
      renderFormItem: () => <RangeInput />,
      hideInTable: true,
    },
    {
      title: '交服务费金额',
      dataIndex: 'serviceFee',
      valueType: 'text',
      renderFormItem: () => <RangeInput />,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: ['verifyStatus', 'code'],
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return <>
                {_ !== 1 && <a onClick={() => { setDrawerVisible(true); setSelectItem(data); }}>审核 &nbsp;&nbsp;</a>}
                {_ == 3 && data.deposit==0 && data.serviceFee==0 && <a onClick={() => { setVisible(true); setSelectItem(data); }}>申请注销</a>}
               </>
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
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        search={{
          labelWidth: 120,
          defaultCollapsed: true,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
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
       {visible && <CancelModel
        visible={visible}
        setVisible={setVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
    </PageContainer>
  );
};

export default StoreReview;
