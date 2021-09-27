import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button,List } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import GainType from './gain-type/gain-type'
// import UseScope from './use-scope/use-scope'
import PeriodValidity from './period-validity/period-validity'
import PrizeSet from './prize-set/prize-set'
import Upload from '@/components/upload';
import { couponSub } from '@/services/coupon-construction/coupon-coupon-sub';
import { couponEdit } from '@/services/coupon-construction/coupon-edit';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import moment from 'moment';
import styles from './style.less'
import { PageContainer } from '@ant-design/pro-layout';
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

export default (props) => {
  const { dispatch, DetailList, UseScopeList } = props
  const [choose, setChoose] = useState()
  const [submitType, setSubmitType] = useState()
  let id = props.location.query.id
  let type = props.location.query.type
  const [form] = Form.useForm()
//   useEffect(() => {
//     if (id) {
//       setTimeout(() => {
//         form.setFieldsValue({
//           dateRange: [moment(DetailList.data?.limitStartTime).valueOf(), moment(DetailList.data?.limitEndTime).valueOf()],
//           dateTimeRange: DetailList.data?.activityStartTime?[moment(DetailList.data?.activityStartTime).valueOf(), moment(DetailList.data?.activityEndTime).valueOf()]:null,
//           ...DetailList.data
//         })
//       }, 1000)
//     } else {
//       dispatch({
//         type: 'UseScopeList/fetchUseScopeList',
//         payload: {
//           UseScopeObje: {}
//         }
//       })
//     }
//   }, [])
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

  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
      <ProForm
        form={form}
        {...formItemLayout}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button style={{marginLeft:'80px'}} type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  保存
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
        className={styles.bindBoxRuleSet}
        initialValues={{
          ruleItems: [{
            title: '',
            name: ''
          }]
        }}
      >
        {/* 活动名称 */}
        <ProFormText
            width={250}
            label="活动名称"
            placeholder="输入活动名称"
            name="NAME"
            rules={[
              { required: true, message: '请输入活动名称' },
            ]}
        />
        {/* 活动时间 */}
        <ProFormDateTimeRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
            name="dateRange"
            extra="提示：活动时间不能和其他盲盒活动时间重叠"
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
        <PeriodValidity/>
        <ProFormText
            width={120}
            label="盲盒中奖后兑奖有效期"
            readonly
            initialValue=" "
        />
        <div className={styles.unfold}>
            <ProForm.Group>
            <span>中奖后</span>
            <ProFormText
                width={120}
                name="limitQuantity"
            />
            <span>天内有效</span>
            </ProForm.Group>
            <p className={styles.give}>超出有效期后将不能再兑换中奖的奖品</p>
        </div>

        {/* 开盲盒机会获取途径 */}
        <GainType/>

        {/* 中奖次数 */}
        <ProForm.Group>
            <span>每天可中奖最高总次数</span>
            <ProFormText 
                name="freeAmount"
                fieldProps={{
                    onChange: (e) => onDiscounts(e)
                    }}
                width={100}
                rules={[
                    {validator: checkConfirm}
                ]} 
            />
            <span>次，当天总计达到此中奖次数，后面的人不再中奖</span>
        </ProForm.Group>

        {/* 奖品设置 */}
        <PrizeSet/>
        

        {/* 奖品预告 */}
        <Form.Item label="奖品预告（尺寸30x50）">
          <Form.List name="ruleItems">
              {(fields, { add, remove }) => (
                <>
                  <List
                    bordered
                    itemLayout="horizontal"
                  >
                    {fields.map((field) => {
                      return (
                        <List.Item
                          key={field.key}
                          // className={styles.list}
                        >
                          <ProForm.Group>
                            <Form.Item name="images">
                              <Upload code={204} multiple maxCount={100} accept="image/*" size={1 * 1024} />
                            </Form.Item>
                            &nbsp;
                            <ProFormText
                              {...field}
                              name={[field.name, 'name']}
                              fieldKey={[field.fieldKey, 'name']}
                              placeholder='奖品名，6个字以内'
                              key="1"
                              fieldProps={{
                                style: {
                                  width: 328
                                }
                              }}
                            />
                          </ProForm.Group>
                        </List.Item>
                      )
                    })}
                  </List>
                  <Button icon={<PlusOutlined />} style={{ marginTop: 10 }} onClick={() => { add() }}>
                    添加更多
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

        {/* 活动规则 */}
        <ProFormTextArea
            label='活动规则'
            name="couponActivityRule"
            style={{ minHeight: 32, marginTop: 15 }}
            placeholder='列如玩法规则、简单的用户协议'
            rules={[{ required: true, message: '请备注活动规则' }]}
            rows={4}
        />
        {/* 活动状态 */}
        <ProFormRadio.Group
                name="ssdfasw"
                label='活动状态'
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
        <p className={styles.hint}>提示：关闭活动后，将清空用户的账户记录，请谨慎操作。</p>
      </ProForm >
  );
};


