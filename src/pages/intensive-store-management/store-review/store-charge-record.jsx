import { useState, useEffect } from "react"
import ProTable from '@/components/pro-table'
import PageContainer from "@/components/PageContainer"
import { Form,Button } from 'antd';
import { amountTransform } from '@/utils/utils'
import {
    DrawerForm
} from '@ant-design/pro-form';
import { pageByStoreNo } from '@/services/intensive-store-management/store-review'

const formItemLayout = {
    labelCol: { span: 4 },
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
  const { visible, setVisible, callback,storeNo} = props;
  const [detailList,setDetailList]=useState()
  const [storeMsg,setStoreMsg]=useState()
  const [form] = Form.useForm();
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      valueType: 'indexBorder'
    },
    {
      title: '缴费项目',
      dataIndex: 'title',
      align: 'center',
    },
    // {
    //   title: '开通类型',
    //   dataIndex: 'renew',
    //   align: 'center',
    // },
    {
      title: '缴费金额(元)',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_)=>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '缴费时间',
      dataIndex: 'payTime',
      align: 'center',
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      align: 'center',
      render: (_)=>{
        return _?.desc
      }
    },
    {
      title: '支付单号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '有效期',
      dataIndex: 'period',
      align: 'center',
    },
    {
      title: '有效截止日',
      dataIndex: 'expireTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center',
      render:(_,data) =>{
        if(_&&_!='-'){
          return <a href={data?.contractUrl} target="_blank">{_}</a>
        }else{
          return '-'
        }
        
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <DrawerForm
      title='店铺信息'
      onVisibleChange={setVisible}
      visible={visible}
      width={1400}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      submitter={{
        render: (props, defaultDoms) => {
          return <Button type="primary" onClick={()=>{setVisible(false)}}>返回</Button>
        },
      }}
      {...formItemLayout}
    >
    <p>店主手机：{storeMsg?.memberPhone}&nbsp;&nbsp; 店主姓名：{storeMsg?.realname}&nbsp;&nbsp; 店铺编号：{storeMsg?.shopMemberAccount}&nbsp;&nbsp; 店铺名称：{storeMsg?.storeName}&nbsp;&nbsp; 入驻申请时间：{storeMsg?.applyTime}</p>
      <ProTable
        columns={columns}
        headerTitle="店铺缴费记录"
        request={pageByStoreNo}
        form={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        params={{
          storeNo
        }}
        postData={(data)=>{
          setStoreMsg(data)
          return data.records
        }}
        options={false}
        search={false}
      />
    </DrawerForm>
  )
}