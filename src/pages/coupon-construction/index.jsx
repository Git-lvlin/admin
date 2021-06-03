import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Form, Divider, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import styles from './style.less';
import CouponType from './coupon-type/coupon-type'
import Circulation from './circulation/circulation'
import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import { couponSub } from '@/services/coupon-construction/coupon-couponsub';
import ProForm, { ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { history,connect } from 'umi';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const couponConstruction=(props) => {
  const { dispatch,DetailList,UseScopeList }=props
  let id = props.location.query.id
  console.log('query',id)
  const [form] = Form.useForm()
  useEffect(() => {
    if(id){
      form.setFieldsValue(DetailList.data)
      console.log('UseScopeList',UseScopeList)
    }
    return undefined
  })
  //优惠劵验证规则
  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value.length > 50) {
          await reject('优惠券名称不超过50个字符')
      }else if (/^[a-zA-Z0-9_]+$/.test(value)) {
          await reject('只能输入汉字')
      } else {
          await resolve()
      }
    })
  }
  return (
    <>
      <Divider orientation="left">基本设置</Divider>
      <ProForm
          form={form}
          onFinish={async (values) => {
          console.log('values', values)
          try {
              values.couponType = UseScopeList.couponType || 1,//优惠券类型
              values.couponTypeInfo = {
                usefulAmount: values.usefulAmount,//用价格门槛(单位分)
                freeAmount: values.freeAmount,//优惠金额(单位分)
                unit: values.unit,//单位
                usefulNum: values.usefulNum,//用件数门槛
                freeDiscount: values.freeDiscount,//折扣
                maxFreeAmount: values.maxFreeAmount//最多优惠（单位分）
              }
              values.useType = parseInt(UseScopeList.useType)||1//使用范围
              values.issueQuantity = parseInt(values.issueQuantity)//发行量
              values.limitStartTime = values.date?values.date[0]:Date.now(),//限时领取开始时间
              values.limitEndTime = values.date?values.date[1]:null,//限时领取结束时间
              values.activityStartTime = values.date2?values.date2[0]:null,//有效期开始时间
              values.activityEndTime = values.date2?values.date2[1]:null,//有效期结束时间
              values.activityStartDay = parseInt(values.activityStartDay),//有效期开始天数
              values.activityEndDay = parseInt(values.activityEndDay),//有效期结束天数
              values.useTypeInfoM = {//秒约商品详情信息
                memberType: parseInt(values.memberType),
                goodsType: values.goodsType || 1,
                spuIds: UseScopeList.spuIds,
                classId: UseScopeList.unit
              }
              values.useTypeInfoJ = {//集约商品详情信息
                wholesaleIds: UseScopeList.wholesaleIds
              }
            couponSub(values)
            message.success('提交成功');
            // history.push('/coupon-management/coupon-list') 
            
          } catch (error) {
            console.log('error', error)
          }
        }}
        style={{ width: '1000px', margin: '0 auto' }}
      >
        {/* 优惠券名称 */}
        <ProFormText
          width="md"
          name="couponName"
          label={<FormattedMessage id="formandbasic-form.title.label" />}
          rules={[
            { required: true, message: '请输入优惠劵名称' },
            {validator: checkConfirm}
          ]}
        />

        {/* 优惠券类型 */}
        <Form.Item
          label={<FormattedMessage id="formandbasic-form.public.label" />}
          name="couponType"
          rules={[{ required: true}]}
        >
          <CouponType id={id}/>
        </Form.Item>

        {/* 发行量 */}
        <Form.Item label="发行量" name="layout" >
          <Circulation id={id} />
        </Form.Item>

        {/* 每人限领 */}
        <ProForm.Group>
          <ProFormRadio.Group
            name="limitType"
            label="每人限领"
            // rules={[{ required: true }]}
            options={[{ label: '不限张数', value: 1, }, { label: '限领', value: 2 }]}
          />
          <ProFormText
            width={120}
            name="limitQuantity"
          />
          <span>张</span>
        </ProForm.Group>

        {/* 限时领取 */}
        <FormItem
          label={<FormattedMessage id="formandbasic-form.date.label" />}
          name="date"
        >
          {
            id&&DetailList.data?
            <p >{DetailList.data?.limitStartTime+' -- '+DetailList.data?.limitEndTime}</p>
            :<RangePicker
              name="dateRange"
              placeholder={[
                formatMessage({
                  id: 'formandbasic-form.placeholder.start',
                }),
                formatMessage({
                  id: 'formandbasic-form.placeholder.end',
                }),
              ]}
            />
          }
        </FormItem>

        {/* 有效期 */}
        <ProFormRadio.Group
          name="activityTimeType"
          label="有效期"
          // rules={[{ required: true }]}
          options={[
            {
              label: '固定时间',
              value: 1,
            },
            {
              label: '领券',
              value: 2,
            }
          ]}
        />
        <PeriodValidity id={id} />

        <Divider orientation="left">使用设置</Divider>

        {/* 使用范围 */}
        <ProForm.Item
          label={<FormattedMessage id="formandbasic-form.usable.range" />}
          name="useType"
        // rules={[{ required: true }]}
        >
          <UseScope/>
        </ProForm.Item>

        {/* 使用说明 */}
        <FormItem
          label={<FormattedMessage id="formandbasic-form.goal.label" />}
          name="couponRule"
        >
          <TextArea
            style={{ minHeight: 32, marginTop: 15 }}
            placeholder={formatMessage({
              id: 'formandbasic-form.goal.placeholder',
            })}
            rows={4}
          />
        </FormItem>

      </ProForm >
    </>
  );
};

export default connect(({ DetailList,UseScopeList}) => ({
  DetailList,
  UseScopeList
}))(couponConstruction);
