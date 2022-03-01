import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormText,ProFormDateTimeRangePicker,ProFormTextArea,ProFormCheckbox,ProFormRadio } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import { amountTransform } from '@/utils/utils'
import { saveWSCentActiveConfig,getActiveConfigById } from '@/services/intensive-activity-management/penny-activity';
import moment from 'moment';
import styles from './style.less'
import GoosSet from './goos-set'

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
  const [detailList,setDetailList]=useState()
  const [falg,setFalg]=useState(true)
  const [goosList,setGoosList]=useState()
  const [visible, setVisible] = useState(false);
  let id = props.location.query.id
  const [form] = Form.useForm()
  useEffect(() => {
    if (id) {
      getActiveConfigById({id}).then(res=>{
        console.log('res',res)
        form.setFieldsValue({
            dateRange: [moment(res.data?.startTime*1000).valueOf(), moment(res.data?.endTime*1000).valueOf()],
            buyerLimit:res.data?.content?.buyerLimit,
            joinAgainPercent:res.data?.content?.joinAgainPercent,
            joinBuyerType:res.data?.content?.joinBuyerType,
            joinShopType:[res.data?.content?.joinShopType],
            ruleText:res.data?.content?.ruleText,
            shoperLimitAll:res.data?.content?.shoperLimitAll,
            shoperLimitOnece:res.data?.content?.shoperLimitOnece,
            price:res.data?.content?.price,
            ...res.data
          })
      })
    }
  }, [])
  //红包名称验证规则
  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value<0.01||value>99999.99) {
        await reject('0.01-99999.99之间数字')
    }else if (value&&value.length>0&&!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)&&value!=0) {
        await reject('只能输入小数和整数')
    }else {
        await resolve()
    }
    })
  }

  const checkConfirm2=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value<1||value>999999) {
        await reject('1-999999之间整数')
    }else if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    }else {
        await resolve()
    }
    })
  }

  const checkConfirm3=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value<0||value>100) {
        await reject('0-100之间整数')
    }else if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    }else {
        await resolve()
    }
    })
  }

  const onsubmit = (values) => {
    const parmas={
      ...values,
      id:id?id:0,
      startTime:moment(values.dateRange[0]).valueOf(),
      endTime:moment(values.dateRange[1]).valueOf(),
      joinShopType:values.joinShopType[0],
      joinAgainPercent:amountTransform(values.joinAgainPercent,'/'),
      goods:goosList.map(ele=>({skuId:ele.skuId,spuId:ele.spuId,wsId:ele.wsId,price:ele.price,status:ele.status})),
      status:1,
    }
    saveWSCentActiveConfig(parmas).then(res=>{
      if(res.code==0){
        message.success(id?'编辑成功':'添加成功'); 
        history.push('/intensive-activity-management/penny-activity/activity-list')
      }
    })
  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <>
      <ProForm
        form={form}
        {...formItemLayout}
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
            return true;
        }
        }
        className={styles.added_activity}
      >
        <ProFormText
          width="md"
          name="name"
          label='活动名称'
          rules={[
            { required: true, message: '请输入活动名称' },
          ]}
          fieldProps={{
            maxLength:20
          }}
        />

        <ProFormText
          width="md"
          name="price"
          label='活动价'
          rules={[
            { required: true, message: '请输入活动价' },
            { validator: checkConfirm }
          ]}
          fieldProps={{
            addonAfter:"元",
          }}
        />
        <ProFormText
          width="md"
          name="shoperLimitAll"
          label='每位店主总限量'
          rules={[
            { required: true, message: '请输入每位店主总限量' },
            { validator: checkConfirm2 }
          ]}
          initialValue={200}
        />
        <ProFormText
          width="md"
          name="shoperLimitOnece"
          label='每位店主单次限量'
          rules={[
            { required: true, message: '请输入每位店主单次限量' },
            { validator: checkConfirm2 }
          ]}
          initialValue={50}
        />
        <ProFormText
          width="md"
          name="buyerLimit"
          label='每位消费者限量'
          rules={[
            { required: true, message: '请输入每位消费者限量' },
            { validator: checkConfirm2 }
          ]}
          initialValue={1}
        />
        <ProFormText
          width="md"
          name="joinAgainPercent"
          label='店主再次参与活动条件'
          rules={[
            { required: true, message: '请输入店主再次参与活动条件' },
            { validator: checkConfirm3 }
          ]}
          fieldProps={{
            addonBefore:'需完成已有推广任务',
            addonAfter:"%",
          }}
          initialValue={90}
        />

        <GoosSet
          detailList={detailList}
          id={id} 
          falg={falg} 
          callback={(val)=>{
            setGoosList(val)
          }}
        />
        <ProFormDateTimeRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
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
        />
        <ProFormCheckbox.Group
          name="joinShopType"
          label="参与活动的店铺"
          options={[
            {
              label: '生鲜店铺',
              value: 1,
            },
          ]}
          rules={[{ required: true, message: '请选择参与活动的店铺' }]}
        />
         <ProFormRadio.Group
          name="joinBuyerType"
          label="参与活动的消费者"
          options={[
            {
              label: '全部消费者',
              value: 1,
            },
            {
              label: '从未下过单的消费者（新人）',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '请选择参与活动的消费者' }]}
        />
        <ProFormTextArea
          label='活动规则'
          name="ruleText"
          style={{ minHeight: 32, marginTop: 15 }}
          placeholder='请输入5-1000个字符'
          rules={[{ required: true, message: '请备注使用规则' }]}
          rows={4}
          fieldProps={{
            maxLength:1000
          }}
        />
      </ProForm >
    </>
  );
};
