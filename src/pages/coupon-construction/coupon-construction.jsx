import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import CouponType from './coupon-type/coupon-type'
import Circulation from './circulation/circulation'
import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import AssignCrowd from './assign-crowd/assign-crowd'
import { couponSub } from '@/services/coupon-construction/coupon-coupon-sub';
import { couponEdit } from '@/services/coupon-construction/coupon-edit';
import ProForm, { ProFormText, ProFormRadio, ProFormDateRangePicker } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import moment from 'moment';
const FormItem = Form.Item;
const { TextArea } = Input;

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
      } else if (/[^\u4e00-\u9fa5\0-9]/.test(value)) {
        await reject('只能输入汉字')
      } else {
        await resolve()
      }
    })
  }
  const onsubmit = (values) => {
    //发放类型
    values.issueType = type
    values.couponTypeInfo = {
      usefulAmount: parseInt(values.usefulAmount),//用价格门槛(单位分)
      freeAmount: parseInt(values.freeAmount),//优惠金额(单位分)
      unit: values.unit,//单位
      usefulNum: parseInt(values.usefulNum),//用件数门槛
      freeDiscount: parseInt(values.freeDiscount),//折扣
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
    }
    if (values.wholesaleType == 1) {
      delete values.wholesaleIds
    }
    //提交类型
    values.couponVerifyStatus = submitType
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
  return (
    <>
      <ProForm
        form={form}
        submitter={
          {
            render: (props, doms) => {
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
        style={{ width: '2000px' }}
      >
        <Divider orientation="left"><FormattedMessage id="formandbasic-form.basic.setup" /></Divider>
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
        <CouponType id={id} />

        {/* 发行量 */}
        {
          type == 2 ?
            <ProFormRadio.Group
              name="issueQuantity"
              label='发行量'
              // rules={[{ required: true, message: '请选择发行量' }]}  
              options={[
                {
                  label: '不限量发放',
                  value: 1
                }]}
            />
            :
            <Circulation id={id} />

        }

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
            <ProFormDateRangePicker
              label='可领取时间'
              rules={[{ required: true, message: '请选择限领时间' }]}
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
          ]}
        />
        <AssignCrowd id={id} choose={choose} />

        <Divider orientation="left">使用设置</Divider>

        {/* 使用范围 */}
        <UseScope id={id} />

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

export default connect(({ DetailList, UseScopeList }) => ({
  DetailList,
  UseScopeList
}))(couponConstruction);
