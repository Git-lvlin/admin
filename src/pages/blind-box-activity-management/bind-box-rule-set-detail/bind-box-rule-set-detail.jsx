import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import GainType from './gain-type/gain-type'
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
                <Button style={{marginLeft:'80px'}} type="primary"  onClick={{}}>
                    编辑
                </Button>,
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
        <ProFormText
            width={120}
            label="盲盒中奖后兑奖有效期"
            readonly
            initialValue="中秋节盲盒活动"
        />
        <ProFormText
            width={120}
            label="活动时间"
            readonly
            initialValue="2015/06/08 19:00至2025/06/08 19:00"
        />
        <ProFormRadio.Group
            name="activityTimeType"
            label='盲盒机会有效期'
            rules={[{ required: true, message: '请选择有效期限' }]}
            options={[
                {
                    label:'限时',
                    value: 1,
                },
                {
                    label:'永久有效',
                    value: 2,
                }
            ]}
        />
        <ProFormDependency name={['activityTimeType']}>
            {({ activityTimeType }) => {
                if (!activityTimeType) return null
                if (activityTimeType==1){
                    return ( 
                    <div className={styles.unfold}>
                        <p>获得机会48小时内可用</p>
                        <p className={styles.give}>超出有效期后将收回用户过期的开盒机会</p>
                    </div>
                    );
                }
                }}
        </ProFormDependency>
        <ProFormText
            width={120}
            label="盲盒中奖后兑奖有效期"
            readonly
            initialValue=" "
        />
        <div className={styles.unfold}>
            <p>中奖后10天内有效</p>
            <p className={styles.give}>超出有效期后将不能再兑换中奖的奖品</p>
        </div>

        {/* 开盲盒机会获取途径 */}
        <GainType/>

        {/* 中奖次数 */}
        <p>每天可中奖最高总次数20次，当天总计达到此中奖次数，后面的人不再中奖</p>
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

        <Form.Item label="奖品预告（尺寸30x50）">
            <ProForm.Group>
            <Image src={{}} alt="" width='50px' height='50px' />
            <ProFormText 
                name="freeAmount"
                width={200}
                placeholder="奖品名，6个字以内"
                initialValue="苹果手机"
                />
            </ProForm.Group>  
        </Form.Item>

        {/* 活动规则 */}
        <ProFormText
            width={120}
            label="盲盒中奖后兑奖有效期"
            readonly
            initialValue="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
        {/* 活动状态 */}
        <ProFormText
            width={120}
            label="活动状态"
            readonly
            initialValue="开启"
        />
      </ProForm >
  );
};
