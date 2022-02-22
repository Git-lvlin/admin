import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 1 },
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
  const [choose, setChoose] = useState()
  const [submitType, setSubmitType] = useState()
  const [publishType,setPublishType]=useState()
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm()
  useEffect(() => {
        form.setFieldsValue({})
  }, [])
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value&&value<0||value>10){
        await reject('只能输入0-10之间数字')
      }else if (value&&!/^[0-9]+(\.[0-9]{2})?$/.test(value)) {
        await reject('0-10之间数字，保留2位小数')
      } else {
        await resolve()
      }
    })
  }
  const checkConfirm2=(rule, value, callback)=>{
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

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
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
      title: '优惠类型',
      dataIndex: 'couponType',
      valueType: 'select',
      valueEnum: {
        1: '满减红包',
        2: '折扣红包',
        3: '立减红包'
      }
    },
    {
      title: '优惠时间段',
      dataIndex: 'dateRange',
      valueType: 'text',
      render:(_, data)=>{
        return <p>{data.limitStartTime} 至 {data.limitEndTime}</p>
      },
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '优惠限量',
      dataIndex: 'text',
    },
    {
      title: '优惠折扣',
      dataIndex: 'issueAmount',
      valueType:'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{!isNaN(_)?Number(_).toFixed(2):_}</p>
      }
    },
    {
      title: '优惠后金额',
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
        <p style={{fontWeight:'bold'}}>所有社区店入驻需缴纳服务费 15000.00元 / 3年</p>

        <ProFormRadio.Group
                name="couponType"
                label='优惠类型'
                options={[
                    {
                        label: '限时折扣',
                        value: 1
                    },
                    {
                        label: '限时前N名折扣',
                        value: 2
                    }
                ]}
                initialValue={1}
            />
            <ProFormDependency name={['couponType']}>
                {({ couponType }) => { 
                if(!couponType) return null
                if(couponType==1){
                    return  <>
                        <ProFormDateTimeRangePicker
                            label='优惠时间段'
                            name="dateRange"
                            fieldProps={{
                                disabledDate:(current)=>disabledDate(current)
                            }}
                            placeholder={[
                                formatMessage({
                                id: 'formandbasic-form.placeholder.start',
                                }),
                                formatMessage({
                                id: 'formandbasic-form.placeholder.end',
                                }),
                            ]}
                            labelCol={2}
                        />
                        <ProFormText
                            width="md"
                            name="couponName"
                            label='优惠折扣'
                            rules={[
                                { validator: checkConfirm }
                            ]}
                            fieldProps={{
                                addonAfter:"折"
                            }}
                        />
                        <ProFormText
                            width={150}
                            name="couponName"
                            label='优惠后社区店主需缴纳金额为'
                            fieldProps={{
                                addonAfter:"元",
                                bordered:false
                            }}
                            placeholder=''
                            labelCol={3}
                        />
                    </>
                }
                if(couponType==2){
                    return <>
                        <ProFormDateTimeRangePicker
                            label='优惠时间段'
                            name="dateRange"
                            fieldProps={{
                                disabledDate:(current)=>disabledDate(current)
                            }}
                            placeholder={[
                                formatMessage({
                                id: 'formandbasic-form.placeholder.start',
                                }),
                                formatMessage({
                                id: 'formandbasic-form.placeholder.end',
                                }),
                            ]}
                            labelCol={2}
                        />
                        <ProFormText
                            width="md"
                            name="couponName"
                            label='优惠限量'
                            rules={[
                                { validator: checkConfirm2 }
                            ]}
                            fieldProps={{
                                addonBefore:'前',
                                addonAfter:"名"
                            }}
                        />
                        <ProFormText
                            width="md"
                            name="couponName"
                            label='优惠折扣'
                            rules={[
                                { validator: checkConfirm }
                            ]}
                            fieldProps={{
                                addonAfter:"折"
                            }}
                        />
                        <ProFormText
                            width={150} 
                            name="couponName"
                            label='优惠后社区店主需缴纳金额为'
                            fieldProps={{
                                addonAfter:"元",
                                bordered:false
                            }}
                            placeholder=''
                            labelCol={3}
                        />
                    </>
                }
              }}
            </ProFormDependency>
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
