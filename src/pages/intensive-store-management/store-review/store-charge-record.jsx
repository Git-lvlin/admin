import { useState, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import PageContainer from "@/components/PageContainer"
import { Form } from 'antd';
import { amountTransform } from '@/utils/utils'
import {
    DrawerForm
} from '@ant-design/pro-form';

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
  const { visible, setVisible, callback,data} = props;
  const [detailList,setDetailList]=useState()
  const [form] = Form.useForm();
  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      dataIndex: '',
      align: 'center',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '生活馆服务费',
        2: 'VIP服务费',
        3: '店铺保证金',
      },
      fieldProps:{
        placeholder:'请选择缴费项目'
      }
    },
    {
      title: '缴费项目',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      dataIndex: '',
      align: 'center',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '开通',
        2: '延期',
      },
      fieldProps:{
        placeholder:'请选择缴费类型'
      }
    },
    {
      title: '开通类型',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '缴费金额(元)',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '缴费时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '支付方式',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '支付单号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '有效期',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '有效截止日',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
      reder:(_) =>{
        return <a>{_}</a>
      }
    },
    {
      title: '备注',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <DrawerForm
      title='店铺信息'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        // onClose: () => {
        //   onClose();
        // }
      }}
      submitter={{
        searchConfig:{
          resetText:'返回',
          submitText:''
        }
      }}
      {...formItemLayout}
    >
    <p>店主手机：18898762231 店主姓名：李玮峰 店铺编号：深2-023 店铺名称：神奈健康中心 入驻申请时间：2022-10-20 17:09:55</p>
      <ProTable
        columns={columns}
        headerTitle="店铺缴费记录"
        // request={}
        form={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
      {/* {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
        />
      } */}
    </DrawerForm>
  )
}