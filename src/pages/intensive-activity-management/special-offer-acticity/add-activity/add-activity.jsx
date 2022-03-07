import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormText,ProFormDateTimeRangePicker,ProFormTextArea,ProFormCheckbox,ProFormRadio,ProFormTimePicker,ProFormDependency } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import { saveWSDiscountActiveConfig,getActiveConfigById } from '@/services/intensive-activity-management/special-offer-acticity';
import { amountTransform } from '@/utils/utils'
import moment from 'moment';
import styles from './style.less'
import GoosSet from './goos-set'
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
  const [detailList,setDetailList]=useState()
  const [falg,setFalg]=useState(true)
  const [goosList,setGoosList]=useState()
  const [visible, setVisible] = useState(false);
  let id = props.location.query.id
  const [form] = Form.useForm()

  const activityName = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value&&/[%&',;=?$\x22]/.test(value)) {
        await reject('不可以含特殊字符')
      } else {
        await resolve()
      }
    })
  }

  const checkConfirm2=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    }else {
        await resolve()
    }
    })
  }

  const checkConfirm5=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length<5) {
        await reject('请输入5-1000个字符')
    }else {
        await resolve()
    }
    })
  }
  useEffect(() => {
    if (id) {
      getActiveConfigById({id}).then(res=>{
        setDetailList(res.data?.content?.goods)
        form.setFieldsValue({
            dateRange: [moment(res.data?.startTime*1000).valueOf(), moment(res.data?.endTime*1000).valueOf()],
            buyerLimit:res.data?.content?.buyerLimit==999999?'':res.data?.content?.buyerLimit,
            joinAgainPercent:amountTransform(res.data?.content?.joinAgainPercent,'*'),
            joinBuyerType:res.data?.content?.joinBuyerType,
            joinShopType:[res.data?.content?.joinShopType],
            ruleText:res.data?.content?.ruleText,
            shoperLimitAll:res.data?.content?.shoperLimitAll,
            shoperLimitOnece:res.data?.content?.shoperLimitOnece,
            price:res.data?.content?.price,
            buyerType:res.data?.content?.buyerType,
            buyerTimeType:res.data?.content?.buyerTimeType,
            timeRange: res.data?.content?.buyerTimeType==0?[]:[moment(res.data?.content?.buyerStartTime, 'HH:mm:ss'),moment(res.data?.content?.buyerEndTime, 'HH:mm:ss') ],
            ...res.data
          })
      })
    }
  }, [])
  const onsubmit = (values) => {
    try {
      const parmas={
        ...values,
        id:id?id:0,
        startTime:moment(values.dateRange[0]).valueOf()/1000,
        endTime:moment(values.dateRange[1]).valueOf()/1000,
        buyerStartTime:values.buyerTimeType==0?'00:00:00':values.timeRange[0],
        buyerEndTime:values.buyerTimeType==0?'23:59:59':values.timeRange[1],
        joinShopType:values.joinShopType[0],
        joinAgainPercent:amountTransform(values.joinAgainPercent,'/'),
        goods:goosList?.map(ele=>({skuId:ele.skuId,spuId:ele.spuId,wsId:ele.wsId,price:amountTransform(ele.price,'*'),status:ele.status,buyLimit:ele.maxNum}))||detailList,
        buyerLimit:values.buyerType==0?999999:values.buyerLimit,
        status:1,
      }
      saveWSDiscountActiveConfig(parmas).then(res=>{
        if(res.code==0){
          message.success(id?'编辑成功':'添加成功'); 
          history.push('/intensive-activity-management/special-offer-acticity/special-offer-acticity-list')
        }
      })
    } catch (error) {
      console.log('error',error)
    }
  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <PageContainer>
      <ProForm
        form={form}
        {...formItemLayout}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button style={{marginLeft:'100px'}} type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确定
                </Button>,
                <Button  type="default" key="goback" onClick={() => {
                  history.push('/intensive-activity-management/special-offer-acticity/special-offer-acticity-list')
                }}>
                  返回
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
        className={styles.add_activity}
      >
        <ProFormText
          width="md"
          name="name"
          label='活动名称'
          placeholder='请输入活动名称'
          rules={[
            { required: true, message: '请输入活动名称' },
            { validator: activityName }
          ]}
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
        <ProFormRadio.Group
          name="buyerType"
          label='C端可购买数量'
          rules={[
            { required: true, message: '请选择限领方式' }
          ]}
          options={[
            {
              label: <ProFormDependency name={['buyerType']}>
                {
                  ({ buyerType }) => (
                    <ProFormText 
                      rules={[ { required: buyerType==0?false:true, message: '请填写购买数量' },{ validator: checkConfirm2 }]}   
                      name="buyerLimit" 
                      fieldProps={{addonAfter:'每人/每天'}}
                    />
                  )
                }
                </ProFormDependency> , value: 1
            },
            {
              label: '不限', value: 0
            }
          ]}
          initialValue={1}
         />
        <ProFormRadio.Group
          name="buyerTimeType"
          label='C端可购买时间'
          rules={[{ required: true, message: '请选择限领方式' }]}
          options={[
            {
              label: <ProFormDependency name={['buyerTimeType']}>
                {
                  ({ buyerTimeType }) => (
                   <ProFormTimePicker.RangePicker rules={[ { required:buyerTimeType==0?false:true, message: '请选择时间区间' }]} name="timeRange" extra='（控件只可选24小时区间）'/>
                  )
                }
                </ProFormDependency>
                , value: 1
            },
            {
              label: '不限', value: 0
            }
          ]}
          initialValue={1}
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
          initialValue={[1]}
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
          initialValue={1}
        />
         <GoosSet
          detailList={detailList}
          id={id} 
          callback={(val)=>{
            setGoosList(val)
          }}
        />
         <ProFormTextArea
          label='活动规则'
          name="ruleText"
          style={{ minHeight: 32, marginTop: 15 }}
          placeholder='请输入5-1000个字符'
          rules={[
            { required: true, message: '请备注使用规则' },
            { validator: checkConfirm5 }
          ]}
          rows={4}
          fieldProps={{
            maxLength:1000
          }}
        />
      </ProForm >
    </PageContainer>
  );
};
