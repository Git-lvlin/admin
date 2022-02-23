import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 2 },
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

export default  () => {
  const [form] = Form.useForm()
  useEffect(() => {
        form.setFieldsValue({})
  }, [])
  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value<1||value>100000){
        await reject('只能输入1-10万之间的整数')
    }else if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    }else {
        await resolve()
    }
    })
  }
  const onsubmit = (values) => {
  }
  const columns= [
    {
      title: '操作时间',
      dataIndex: 'dateRange',
      valueType: 'text',
      render:(_, data)=>{
        return <p>{data.limitStartTime} 至 {data.limitEndTime}</p>
      },
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '操作人',
      dataIndex: 'couponName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入红包名称'
      },
    },
    {
      title: '保证金金额',
      dataIndex: 'issueAmount',
      valueType:'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{!isNaN(_)?Number(_).toFixed(2):_}</p>
      }
    },
    {
      title: '服务金金额',
      dataIndex: 'issueQuantity',
      valueType: 'text',
      hideInSearch: true,
      render:(_, data)=>{
        return <p>{data.issueQuantity==-1?'不限量':data.issueQuantity}</p>
      }
    },   
  ];
  return (
    <>
      <ProForm
        form={form}
        {...formItemLayout}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button style={{width:'150px'}} type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  修改
                </Button>
              ];
            }
          }
        }
        onFinish={async (values) => {
            await onsubmit(values);
            return true;
        }
        }
      >
        <p style={{fontWeight:'bold'}}>残疾人入驻社区店缴费配置</p>
        <ProFormText
            width="md"
            name="couponName"
            label='保证金金额'
            rules={[
                { validator: checkConfirm }
            ]}
            fieldProps={{
                addonAfter:"元"
            }}
        />
        <ProFormText
            width="md"
            name="couponName"
            label='服务费金额'
            rules={[
                { validator: checkConfirm }
            ]}
            fieldProps={{
                addonAfter:"元/3年"
            }}
        />
      </ProForm >
      <ProTable
       headerTitle="操作日志"
       rowKey="id"
       options={false}
       //   request={couponList}
       search={false}
       columns={columns}
       style={{marginTop:'20px'}}
    />
    </>
  );
};
