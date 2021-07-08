import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Form, Divider, message,Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import CouponType from './coupon-type/coupon-type'
import Circulation from './circulation/circulation'
import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import { couponSub } from '@/services/coupon-construction/coupon-coupon-sub';
import ProForm, { ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { history,connect } from 'umi';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const couponConstruction=(props) => {
  const { dispatch,DetailList,UseScopeList }=props
  const [position,setPosition]=useState()
  let id = props.location.query.id
  const [form] = Form.useForm()
  useEffect(() => {
    if(id){
      form.setFieldsValue(DetailList.data)
    }
    return undefined
  })
  //优惠劵名称验证规则
  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length > 50) {
          await reject('优惠券名称不超过50个字符')
      }else if (/[^\u4e00-\u9fa5\0-9]/.test(value)) {
          await reject('只能输入汉字')
      } else {
          await resolve()
      }
    })
  }
  const onsubmit=(values)=>{
    values.couponType = parseInt(UseScopeList.UseScopeObje.couponType) || 1,//优惠券类型
    values.couponTypeInfo = {
      usefulAmount: parseInt(values.usefulAmount),//用价格门槛(单位分)
      freeAmount: parseInt(values.freeAmount),//优惠金额(单位分)
      unit: values.unit,//单位
      usefulNum: parseInt(values.usefulNum),//用件数门槛
      freeDiscount: parseInt(values.freeDiscount),//折扣
      maxFreeAmount: parseInt(values.maxFreeAmount)//最多优惠（单位分）
    }
    values.useType = parseInt(UseScopeList.UseScopeObje.useType)||1//使用范围
    values.issueQuantity = parseInt(values.issueQuantity)//发行量
    values.limitStartTime = values.date?values.date[0]:null,//限时领取开始时间
    values.limitEndTime = values.date?values.date[1]:null,//限时领取结束时间
    values.limitQuantity=parseInt(values.limitQuantity)//限领数量
    values.activityStartTime = values.date2?values.date2[0]:null,//有效期开始时间
    values.activityEndTime = values.date2?values.date2[1]:null,//有效期结束时间
    values.activityStartDay = parseInt(values.activityStartDay),//有效期开始天数
    values.activityEndDay = parseInt(values.activityEndDay),//有效期结束天数
    values.useTypeInfoM = {//秒约商品详情信息
      memberType: parseInt(values.memberType),
      goodsType: values.goodsType,
      spuIds: UseScopeList.UseScopeObje.spuIds,
      classId: parseInt(UseScopeList.UseScopeObje.unit)
    }
    if(values.goodsType==1){
      delete values.useTypeInfoM.spuIds
      delete values.useTypeInfoM.classId
    }else if(values.goodsType==2){
      delete values.useTypeInfoM.classId
    }else if(values.goodsType==3){
      delete values.useTypeInfoM.spuIds
    }
    values.useTypeInfoJ = {//集约商品详情信息
      wholesaleIds:UseScopeList.UseScopeObje.wholesaleIds
    }
    couponSub(values).then((res)=>{
      if(res.code==0){
        history.push('/coupon-management/coupon-list') 
        message.success('提交成功'); 
        dispatch({
          type:'UseScopeList/fetchUseScopeList',
          payload:{
            UseScopeObje:{}
          }
        })
      }
    }) 
  }
  return (
    <>
      <Divider orientation="left">查看详情</Divider>
      <ProForm
          form={form}
          submitter={
            {
              render: (props, doms) => {
                if(parseInt(id)!=id){
                return [
                  <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                    保存
                  </Button>,
                  <Button type="default" onClick={()=>history.push('/coupon-management/coupon-list')}>
                    返回
                  </Button>,
                  
                ];
              }
              }
            }
          }
          onFinish={async (values)=>{
             await  onsubmit(values);
             return true;
            }
           }
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
        <FormItem
          label={<FormattedMessage id="formandbasic-form.public.label" />}
          name="couponType"
          // rules={[{ required: true, message: '请选择优惠券类型' }]}
        >
          <CouponType id={id}/>
        </FormItem>

        {/* 发行量 */}
        <FormItem  label={<FormattedMessage id="formandbasic-form.circulation" />} name="layout" >
          <Circulation id={id} />
        </FormItem>

        {/* 每人限领 */}
        <ProForm.Group>
          <ProFormRadio.Group
            name="limitType"
            label={<FormattedMessage id="formandbasic-form.each.limit" />}
            rules={[{ required: true, message: '请选择限领方式' }]}
            options={[
              { 
                label: <FormattedMessage id="formandbasic-form.needless" />, value: 1, 
              }, 
              { 
                label: <FormattedMessage id="formandbasic-form.quota" />, value: 2 
              }]}
          />
          <ProFormText
            width={120}
            name="limitQuantity"
          />
          <span><FormattedMessage id="formandbasic-form.zhang" /></span>
        </ProForm.Group>

        {/* 限时领取 */}
        <FormItem
          label={<FormattedMessage id="formandbasic-form.date.label" />}
          name="date"
          rules={[{ required: true, message: '请选择限领时间' }]}
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
          label={<FormattedMessage id="formandbasic-form.period.of.validity" />}
          fieldProps={{
            onChange: (e) => setPosition(e.target.value),
          }}
          rules={[{ required: true, message: '请选择有效期限' }]}
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
        <PeriodValidity position={position} id={id} />

        <Divider orientation="left">使用设置</Divider>

        {/* 使用范围 */}
        <FormItem
          label={<FormattedMessage id="formandbasic-form.usable.range" />}
          name="useType"
        >
          <UseScope id={id}/>
        </FormItem>

        {/* 使用说明 */}
        <FormItem
          label={<FormattedMessage id="formandbasic-form.goal.label" />}
          name="couponRule"
          rules={[{ required: true, message: '请备注使用说明' }]}
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
