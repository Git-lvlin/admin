import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import CouponType from './coupon-type/coupon-type'
import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import AssignCrowd from './assign-crowd/assign-crowd'
import { couponSub } from '@/services/coupon-construction/coupon-coupon-sub';
import { couponEdit } from '@/services/coupon-construction/coupon-edit';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import moment from 'moment';
import styles from './style.less'
const FormItem = Form.Item;

const couponConstruction = (props) => {
  const { dispatch, DetailList, UseScopeList } = props
  const [position, setPosition] = useState()
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
  //优惠劵名称验证规则
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length > 50) {
        await reject('优惠券名称不超过50个字符')
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
    values.issueType = parseInt(type)
    values.couponTypeInfo = {
      usefulAmount: parseInt(values.usefulAmount),//用价格门槛(单位分)
      freeAmount: parseInt(values.freeAmount),//优惠金额(单位分)
      unit: values.unit,//单位
      usefulNum: parseInt(values.usefulNum),//用件数门槛
      freeDiscount: values.freeDiscount,//折扣
      maxFreeAmount: parseInt(values.maxFreeAmount)//最多优惠（单位分）
    }
    
    values.issueQuantity = parseInt(values.issueQuantity)//发行量
    values.limitStartTime = values.dateRange ? values.dateRange[0] : null,//可领取开始时间
    values.limitEndTime = values.dateRange ? values.dateRange[1] : null,//可领取结束时间
    values.limitQuantity = parseInt(values.limitQuantity)//限领数量
    values.activityStartTime = values.dateTimeRange ? values.dateTimeRange[0] : null,//有效期开始时间
    values.activityEndTime = values.dateTimeRange ? values.dateTimeRange[1] : null,//有效期结束时间
    values.activityStartDay = parseInt(values.activityStartDay),//有效期开始天数
    values.activityEndDay = parseInt(values.activityEndDay),//有效期结束天数
    values.useTypeInfoM = {//秒约商品详情信息
      goodsType: values.goodsType,
      spuIds: UseScopeList.UseScopeObje.spuIds,
      classId: parseInt(UseScopeList.UseScopeObje.unit)
    }
    //群体Id
    values.couponCrowdId = UseScopeList.UseScopeObje.CrowdIds
    values.memberType = parseInt(values.memberType)
    //集约商品详情信息
    values.useTypeInfoJ = {
      wholesaleType: values.wholesaleType,
      wholesaleIds: UseScopeList.UseScopeObje.wholesaleIds
    }

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
      delete values.useTypeInfoJ
    } else if (values.useType == 2) {
      delete values.useTypeInfoM
    }else if(values.useType==4){
      delete values.useTypeInfoM
      delete values.useTypeInfoJ
    }
    if (values.wholesaleType == 1) {
      delete values.wholesaleIds
    }
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
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button type="primary" key="submit" onClick={() => {
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
        style={{background:'#fff',padding:'20px' }}
      >
        <h3 className={styles.head}><span style={{borderBottom:'5px solid #666666'}}>基本信息</span></h3>
        {/* 优惠券名称 */}
        <ProFormText
          width="md"
          name="couponName"
          label={<FormattedMessage id="formandbasic-form.title.label" />}
          rules={[
            { required: true, message: '请输入优惠劵名称' },
            { validator: checkConfirm }
          ]}
        />

        {/* 优惠券类型 */}
        <CouponType id={id} type={type}/>


        {/* 每人限领 */}
        <ProForm.Group>
          {
            type == 2 ?
              <ProFormRadio.Group
                name="limitType"
                label={<FormattedMessage id="formandbasic-form.each.limit" />}
                rules={[{ required: true, message: '请选择限领方式' }]}
                options={[
                  {
                    label: <FormattedMessage id="formandbasic-form.quota" />, value: 2
                  }]}
              />
              : <ProFormRadio.Group
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
          }
          <ProFormText
            width={120}
            name="limitQuantity"
          />
          <span><FormattedMessage id="formandbasic-form.zhang" /></span>
        </ProForm.Group>

        {/* 可领取时间 */}
        {
          type == 2 || DetailList.data?.issueType == 2 && id ? null
            :
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
        }

        {/* 有效期 */}
        {
          type == 2 ?
            <ProFormRadio.Group
              name="activityTimeType"
              label={<FormattedMessage id="formandbasic-form.period.of.validity" />}
              fieldProps={{
                onChange: (e) => setPosition(e.target.value),
              }}
              rules={[{ required: true, message: '请选择有效期限' }]}
              options={[
                {
                  label: '领券',
                  value: 2,
                }
              ]}
            />
            : <ProFormRadio.Group
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
        }

        <PeriodValidity position={position} id={id} />

        {/* 可领券群体 */}
        <ProFormRadio.Group
          name="memberType"
          label={type == 1 ? '可领券群体' : '发券群体'}
          rules={[{ required: true, message: '请选择群体' }]}
          fieldProps={{
            onChange: (e) => setChoose(e.target.value),
          }}
          options={[
            {
              label: '全部用户',
              value: 1,
            },
            {
              label: '指定群体用户',
              value: 2,
            },
            {
              label: '新用户（未下过订单的用户）',
              value: 4,
            },
          ]}
        />
        <AssignCrowd id={id} choose={choose} />

        <h3 className={styles.head}><span style={{borderBottom:'5px solid #666666'}}>使用设置</span></h3>

        {/* 使用范围 */}
        <UseScope id={id} choose={choose} form={form}/>

        {/* 使用说明 */}
          <ProFormTextArea
            label={<FormattedMessage id="formandbasic-form.goal.label" />}
            name="couponRule"
            style={{ minHeight: 32, marginTop: 15 }}
            placeholder={formatMessage({
              id: 'formandbasic-form.goal.placeholder',
            })}
            rules={[{ required: true, message: '请备注使用说明' }]}
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
