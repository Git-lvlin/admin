import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,Space,Descriptions } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormText,ProFormDateTimeRangePicker,ProFormTextArea,ProFormCheckbox,ProFormRadio,DrawerForm } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import { amountTransform } from '@/utils/utils'
import { saveWSCentActiveConfig,getActiveConfigById } from '@/services/intensive-activity-management/penny-activity';
import moment, { now } from 'moment';
import { PageContainer } from '@ant-design/pro-layout';

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

export default (props) => {
  const {setVisible,visible,onClose,callback,record}=props
  const [detailList,setDetailList]=useState()
  const [goosList,setGoosList]=useState()
  const [loading,setLoading]=useState(false)
  const [form] = Form.useForm()
  const ref=useRef()
  const columns= [
    {
      title: 'spuID',
      dataIndex: 'spuID',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'skuID',
      dataIndex: 'skuID',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '日期',
      dataIndex: 'wholesaleStartTime',
      valueType: 'dateTimeRange',
      hideInTable:true
    },
    {
      title: '商品主图',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '商品规格',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '采购店主数',
      dataIndex: 'shoperLimitAll',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'B端采购订单数',
      dataIndex: 'shoperLimitOnece',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'B端采购份数',
      dataIndex: 'buyerLimit',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'C端零售份数',
      dataIndex: 'joinShopType',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'C端转化率',
      dataIndex: 'goodsCount',
      valueType: 'text',
      hideInSearch: true,
    }
  ];
  useEffect(() => {
    if (record?.id) {
    //   getActiveConfigById({di:record?.id}).then(res=>{
    //     if(res.data?.endTime<res.data?.time){
    //       message.error('活动已结束！'); 
    //       setFormVisible(false)
    //       onClose()
    //       return false
    //     }
    //     setDetailList(res.data)
    //   })
    }
  }, [])

  const onsubmit = (values) => {
    setVisible(false)
    callback(true)
  }


  return (
      <DrawerForm
        title={`活动编号：${record.id}`}
        onVisibleChange={setVisible}
        visible={visible}
        form={form}
        width={1500}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          onClose: () => {
            onClose();
          }
        }}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button style={{marginLeft:'250px'}} type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确定
                </Button>,
              ];
            }
          }
        }
        onFinish={async (values) => {
            await onsubmit(values);
        }
        }
      {...formItemLayout}
    >
      <Descriptions title="活动数据" labelStyle={{fontWeight:'bold'}} column={9} layout="vertical" bordered>
        <Descriptions.Item  label="采购店主数">{detailList?.totalMemberNum}  </Descriptions.Item>
        <Descriptions.Item  label="B端采购订单数">{detailList?.totalNum}  </Descriptions.Item>
        <Descriptions.Item  label="B端采购份数">{detailList?.restNum}  </Descriptions.Item>
        <Descriptions.Item  label="C端零售份数">{detailList?.useNum}  </Descriptions.Item>
        <Descriptions.Item  label="C端转化率">{detailList?.prizeNum}  </Descriptions.Item>
      </Descriptions>
      <ProTable
        actionRef={ref}
        headerTitle="活动商品"
        rowKey="id"
        options={false}
        // params={{
        //     actCode:'wsCentActiveCode'
        // }}
        // request={getActiveConfigList}
        // postData={postData}
        search={{
        defaultCollapsed: false,
        labelWidth: 100,
        optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
        ],
        }}
        columns={columns}
        pagination={{
            pageSize: 10,
            showQuickJumper: true,
        }}
        />
    </DrawerForm>
  );
};
