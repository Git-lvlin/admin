import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import CouponType from './coupon-type/coupon-type'
import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import AssignCrowd from './assign-crowd/assign-crowd'
import { couponSub } from '@/services/coupon-construction/coupon-coupon-sub';
import { couponEdit } from '@/services/coupon-construction/coupon-edit';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import moment from 'moment';
import styles from './style.less'
const FormItem = Form.Item;

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

const couponConstruction = (props) => {
  const { dispatch, DetailList, UseScopeList } = props
  const [choose, setChoose] = useState()
  const [submitType, setSubmitType] = useState()
  let id = props.location.query.id
  let type = props.location.query.type
  const [form] = Form.useForm()
  useEffect(() => {
    if (id) {
      setTimeout(() => {
        form.setFieldsValue({
          dateRange: [moment(DetailList.data?.limitStartTime).valueOf(), moment(DetailList.data?.limitEndTime).valueOf()],
          dateTimeRange: DetailList.data?.activityStartTime?[moment(DetailList.data?.activityStartTime).valueOf(), moment(DetailList.data?.activityEndTime).valueOf()]:null,
          ...DetailList.data
        })
      }, 1000)
    } else {
      dispatch({
        type: 'UseScopeList/fetchUseScopeList',
        payload: {
          UseScopeObje: {}
        }
      })
    }
  }, [])
  //红包名称验证规则
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length > 50) {
        await reject('红包名称不超过50个字符')
      } else if (value&&/[^\u4e00-\u9fa5\0-9]/.test(value)) {
        await reject('只能输入汉字')
      } else {
        await resolve()
      }
    })
  }
  const onsubmit = (values) => {
    try {
    //发放类型
    values.issueType = parseInt(type)|| id&&DetailList.data?.issueType
    values.couponTypeInfo = {
      usefulAmount: parseInt(values.usefulAmount),//用价格门槛(单位分)
      freeAmount: parseInt(values.freeAmount),//优惠金额(单位分)
      unit: values.unit,//单位
      usefulNum: parseInt(values.usefulNum),//用件数门槛
      freeDiscount: values.freeDiscount,//折扣
      maxFreeAmount: parseInt(values.maxFreeAmount),//最多优惠（单位分）
    }
    
    values.issueQuantity = parseInt(values.issueQuantity)//发行量
    values.limitStartTime = values.dateRange ? values.dateRange[0] : null,//可领取开始时间
    values.limitEndTime = values.dateRange ? values.dateRange[1] : null,//可领取结束时间
    values.limitQuantity = parseInt(values.limitQuantity)//限领数量
    values.limitType=values.issueType==3?2:values.limitType//限领类型
    values.issueQuantityType=values.issueType==2?1: values.issueQuantityType//发行量类型
  
    values.activityStartTime = values.dateTimeRange ? values.dateTimeRange[0] : null,//有效期开始时间
    values.activityEndTime = values.dateTimeRange ? values.dateTimeRange[1] : null,//有效期结束时间
    values.activityStartDay = parseInt(values.activityStartDay),//有效期开始天数
    values.activityEndDay = parseInt(values.activityEndDay),//有效期结束天数
    values.useTypeInfoM = {//秒约商品详情信息
      goodsType: type==3||DetailList.data?.issueType == 3 && id?2:values.goodsType,
      spuIds: UseScopeList.UseScopeObje.spuIds,
      classId: parseInt(UseScopeList.UseScopeObje.unit)
    }
    //群体Id
    values.couponCrowdId = UseScopeList.UseScopeObje.CrowdIds
    values.memberType = parseInt(values.memberType)
    //集约商品详情信息
    // values.useTypeInfoJ = {
    //   wholesaleType: values.wholesaleType,
    //   wholesaleIds: UseScopeList.UseScopeObje.wholesaleIds
    // }

    if (values.memberType == 1) {
      delete values.couponCrowdId
    }
  

    if (values.goodsType == 1) {
      delete values.useTypeInfoM.spuIds
      delete values.useTypeInfoM.classId
    } else if (values.goodsType == 2) {
      delete values.useTypeInfoM.classId
    } else if (values.goodsType == 3) {
      delete values.useTypeInfoM.spuIds
    }

    if (values.useType == 1) {
      // delete values.useTypeInfoJ
    } else if (values.useType == 2) {
      delete values.useTypeInfoM
    }else if(values.useType==4){
      delete values.useTypeInfoM
      // delete values.useTypeInfoJ
    }
    // if (values.wholesaleType == 1) {
    //   delete values.wholesaleIds
    // }
    //提交类型
    values.couponVerifyStatus = submitType
    } catch (error) {
      console.log('error',error)
    }
    if (id) {
      couponEdit({ ...values, id: id }).then((res) => {
        if (res.code == 0) {
          history.push('/coupon-management/coupon-list')
          message.success('提交成功');
          dispatch({
            type: 'UseScopeList/fetchUseScopeList',
            payload: {
              UseScopeObje: {}
            }
          })
        }
      })
    } else {
      couponSub(values).then((res) => {
        if (res.code == 0) {
          history.push('/coupon-management/coupon-list')
          message.success('提交成功');
          dispatch({
            type: 'UseScopeList/fetchUseScopeList',
            payload: {
              UseScopeObje: {}
            }
          })
        }
      })
    }

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
                <Button style={{marginLeft:'80px'}} type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                  setSubmitType(1)
                }}>
                  保存
                </Button>,
                <Button type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                  setSubmitType(3)
                }}>
                  提交审核
                </Button>,
                <Button type="default" onClick={() => history.push('/coupon-management/coupon-list')}>
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
        className={styles.discountFrom}
      >
        <h3 className={styles.head}><span style={{borderBottom:'5px solid #666666'}}>基本信息</span></h3>
        {/* 红包名称 */}
        <ProFormText
          width="md"
          name="couponName"
          label={<FormattedMessage id="formandbasic-form.title.label" />}
          rules={[
            { required: true, message: '请输入红包名称' },
            { validator: checkConfirm }
          ]}
        />

        {/* 红包类型 */}
        <CouponType id={id} type={type}/>


        {/* 每人限领 */}
         {
           type==3||DetailList.data?.issueType == 3 && id?
           <ProFormText
            width={120}
            label="每人限领"
            readonly
            name="limitQuantity"
            fieldProps={{
              value:'1张/天'
            }}
            initialValue="1"
           />
         :
         <>
          <ProFormRadio.Group
            name="limitType"
            label={<FormattedMessage id="formandbasic-form.each.limit" />}
            rules={[{ required: true, message: '请选择限领方式' }]}
            options={[
              {
                label: <FormattedMessage id="formandbasic-form.quota" />, value: 2
              }]}
          />
            <ProFormDependency name={['limitType']}>
              {({ limitType }) => {
                  if (!limitType) return null;
                  return ( 
                    <div className={styles.unfold}>
                      <ProForm.Group>
                        <ProFormText
                          width={120}
                          name="limitQuantity"
                        />
                        <span><FormattedMessage id="formandbasic-form.zhang" /></span>
                      </ProForm.Group>
                  </div>
                  );
              }}
            </ProFormDependency>
         </>
         }
        

        {/* 可领取时间 */}
        {
          type != 2 || DetailList.data?.issueType !=2 && id ? 
            <ProFormDateTimeRangePicker
              label='可领取时间'
              rules={[{ required: true, message: '请选择限领时间' }]}
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
            :null
        }

        {/* 有效期 */}
        <PeriodValidity  id={id} type={type}/>

       {
         type==3||DetailList.data?.issueType == 3 && id?
          <ProFormText
            width={120}
            label="可领条件"
            readonly
            fieldProps={{
              value:'每日首次下单成功'
          }}
        />
        :null
       }
        

        {/* 可领红包群体 */}
        <AssignCrowd id={id} type={type} callback={(current)=>setChoose(current)} />

        <h3 className={styles.head}><span style={{borderBottom:'5px solid #666666'}}>使用设置</span></h3>

        {/* 使用范围 */}
        <UseScope id={id} type={type} choose={choose} form={form}/>
   
        {/*使用说明 */}
        <ProFormTextArea
          label='使用说明'
          name="couponRule"
          style={{ minHeight: 32, marginTop: 15 }}
          placeholder='列如红包适用商品、使用限制等信息'
          rules={[{ required: true, message: '请备注使用规则' }]}
          rows={4}
        />
      </ProForm >
    </>
  );
};

export default connect(({ DetailList, UseScopeList }) => ({
  DetailList,
  UseScopeList
}))(couponConstruction);
