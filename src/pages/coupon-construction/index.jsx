import React, { useState } from 'react';
import { DatePicker, Input, Form, Divider } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import { message } from 'antd';
import styles from './style.less';
import CouponType from './coupon-type/coupon-type'
import Circulation from './circulation/circulation'
import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import { couponSub } from '@/services/coupon-construction/coupon-couponsub';
import ProForm, { ProFormText,ProFormRadio} from '@ant-design/pro-form';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default () => {
  const [catetype,setCatetype]=useState(1)
  const [useType,setUseType]=useState(1)
  const [classId,setClassId]=useState('')
  const [spuIds,setSpuIds]=useState('')
  const [wholesaleIds,setWholesaleIds]=useState('')

  const callback=cate=>{
    console.log('cate',cate)
    setCatetype(parseInt(cate))
  }
  const onuseType=val=>{
    console.log('val',val)
    setUseType(parseInt(val))
  }
  const oncateId=classId=>{
    console.log('classId',classId)
    setClassId(classId)
  }
  const onsupid=suid=>{
    console.log('suid',suid)
    setSpuIds(suid)
  }
  const onwhid=whid=>{
    console.log('whid',whid)
    setWholesaleIds(whid)
  }
  return (
    <>
        <Divider orientation="left">基本设置</Divider>
        <ProForm 
          onFinish={async (values) => {
            console.log('values',values)
              values.couponType=catetype||1,//优惠券类型
              values.couponTypeInfo={
                usefulAmount:values.usefulAmount,//用价格门槛(单位分)
                freeAmount:values.freeAmount,//优惠金额(单位分)
                unit:values.unit,//单位
                usefulNum:values.usefulNum,//用件数门槛
                freeDiscount:values.freeDiscount,//折扣
                maxFreeAmount:values.maxFreeAmount//最多优惠（单位分）
              }
              values.useType=useType
              values.issueQuantity=parseInt(values.issueQuantity)//发行量
              values.limitStartTime=values.date[0],//限时领取开始时间
              values.limitEndTime=values.date[1],//限时领取结束时间
              values.activityStartTime=values.date2[0],//有效期开始时间
              values.activityEndTime=values.date2[1],//有效期结束时间
              values.activityStartDay=parseInt(values.activityStartDay),//有效期开始天数
              values.activityEndDay=parseInt(values.activityEndDay),//有效期结束天数
              values.useTypeInfoM={//秒约商品详情信息
                memberType:parseInt(values.memberType),
                goodsType:values.goodsType||1,
                spuIds:spuIds,
                classId:classId
              }
              values.useTypeInfoJ={//集约商品详情信息
                wholesaleIds:wholesaleIds
              }
              couponSub(values)
            message.success('提交成功');
          }}
          style={{width:'1000px',margin:'0 auto'}}
        >
        {/* 优惠券名称 */}
        <ProFormText
          width="md"
          name="couponName"
          label={<FormattedMessage id="formandbasic-form.title.label" />}
          tooltip="最长为 50 位"
          placeholder="请输入名称"
          // rules={[{ required: true }]}
        />

        {/* 优惠券类型 */}
        <Form.Item
          label={<FormattedMessage id="formandbasic-form.public.label" />}
          name="couponType"
          // rules={[{ required: true }]}
          
        >
          <CouponType oncallback={callback} />
        </Form.Item>

        {/* 发行量 */}
        <Form.Item label="发行量" name="layout" >
          <Circulation />
        </Form.Item>

        {/* 每人限领 */}
        <ProForm.Group>
          <ProFormRadio.Group
              name="limitType"
              label="每人限领"
              // rules={[{ required: true }]}
              options={[{ label: '不限次数', value: 1,},{ label: '限领', value: 2}]}
            />
          <ProFormText
              width={120}
              name="limitQuantity"
          />
          <span>次</span>
        </ProForm.Group>

        {/* 限时领取 */}
        <FormItem
          label={<FormattedMessage id="formandbasic-form.date.label" />}
          name="date"
        >
          <RangePicker
            placeholder={[
              formatMessage({
                id: 'formandbasic-form.placeholder.start',
              }),
              formatMessage({
                id: 'formandbasic-form.placeholder.end',
              }),
            ]}
          />
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
        <PeriodValidity />

        <Divider orientation="left">使用设置</Divider>

        {/* 使用范围 */}
        <ProForm.Item
          label={<FormattedMessage id="formandbasic-form.usable.range" />}
          name="useType"
          // rules={[{ required: true }]}
        >
          <UseScope
            onuseType={onuseType}
            oncateId={oncateId}
            onsupid={onsupid}
            onwhid={onwhid}
             />
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
