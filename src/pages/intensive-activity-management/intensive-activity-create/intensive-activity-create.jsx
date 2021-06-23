import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import {
  StepsForm,
  ProFormText,
  ProFormCheckbox,
  ProFormDateTimeRangePicker,
  ProFormDateTimePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, Result, message, Descriptions } from 'antd';
import EditTable from './edit-table';
import styles from './index.less';
import { addWholesale } from '@/services/intensive-activity-management/intensive-activity-create'
import { numFormat, digitUppercase } from '@/utils/utils'
import { history } from 'umi';
import moment from 'moment'
import { amountTransform } from '@/utils/utils'
import Big from 'big.js'

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const disabledRangeTime = (_, type) => {
  if (type === 'start') {
    return {
      disabledMinutes: () => range(1, 59),
      disabledSeconds: () => range(1, 59),
    };
  }
  return {
    disabledMinutes: () => range(0, 59),
    disabledSeconds: () => range(0, 59),
  };
}

const IntensiveActivityCreate = () => {
  const [selectItem, setSelectItem] = useState(null);
  const [submitValue, setSubmitValue] = useState(null);
  const submit = (values) => {
    const { wholesaleTime, ...rest } = values;
    return new Promise((resolve, reject) => {
      const params = {
        goodsInfos: [{
          spuId: selectItem.spuId,
          skuId: selectItem.skuId,
          totalStockNum: selectItem.totalStockNum,
          minNum: selectItem.minNum,
          price: amountTransform(selectItem.price),
          maxNum: selectItem.maxNum,
          supplierId: selectItem.supplierId,
          totalPrice: selectItem.totalPrice,
          wholesaleSupplyPrice: amountTransform(selectItem.wholesaleSupplyPrice),
          fixedPrice: amountTransform(selectItem.fixedPrice),
          settlePercent: amountTransform(selectItem.settlePercent, '/'),
        }],
        storeLevel: 'ALL',
        memberLevel: 'ALL',
        wholesaleStartTime: wholesaleTime[0],
        wholesaleEndTime: wholesaleTime[1],
        recoverPayTimeout: 0,
        canRecoverPayTimes: 0,
        ...rest,
      }
      setSubmitValue(params)
      addWholesale(params).then(res => {
        if (res.code === 0) {
          resolve()
        }
      }).finally(() => {
        reject()
      })
    });
  }
  return (
    <PageContainer className={styles.page}>
      <ProCard style={{ width: '100%' }}>
        <StepsForm
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}

          submitter={{
            render: (props) => {
              if (props.step === 0 || props.step === 1) {
                return (
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button type="primary" onClick={() => props.onSubmit?.()}>
                      下一步
                    </Button>
                  </div>

                );
              }
              return (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    完成
                  </Button>
                </div>
              )
            }
          }}
        >
          <StepsForm.StepForm
            name="base"
            title="选择活动商品"
            onFinish={() => {
              if (!selectItem) {
                message.error('请选择活动商品');
                return false;
              }

              if (!/^\d+$/g.test(selectItem.totalStockNum) || selectItem.totalStockNum <= 0) {
                message.error('集约总库存只能是大于0的整数');
                return false;
              }

              if (selectItem.fixedPrice < 0 || selectItem.fixedPrice > 10) {
                message.error('配送费补贴只能是0-10之间');
                return false;
              }
              if (selectItem.settlePercent < 0 || selectItem.settlePercent > 20) {
                message.error('集约分成比例只能是0-20之间');
                return false;
              }

              let minWholesalePrice = (amountTransform(selectItem.wholesaleSupplyPrice) + +new Big(selectItem.fixedPrice).times(100)) / (+new Big(1).minus(0.0068).minus(amountTransform(selectItem.settlePercent, '/')));
              minWholesalePrice = +new Big(Math.ceil(minWholesalePrice)).div(100);
              if (selectItem.price < minWholesalePrice) {
                message.error(`集约价格小于集约最低价${minWholesalePrice}`);
                return false;
              }
              return true;
            }}

          >
            <EditTable onSelect={setSelectItem} />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="checkbox"
            title="确认活动参数"
            onFinish={async (values) => {
              await submit(values);
              return true;
            }}
            {...formItemLayout}
            // initialValues={{
            //   canRecoverPayTimes: 1,
            //   recoverPayTimeout: 3
            // }}
            className={styles.center}
          >
            <ProFormText name="name" label="活动名称" width="md" placeholder="请输入活动名称" rules={[{ required: true, message: '请输入活动名称' }]} />
            <ProFormDateTimeRangePicker
              name="wholesaleTime"
              label="活动时间"
              width="md"
              rules={[{ required: true, message: '请选择活动时间' }]}
              fieldProps={{
                disabledDate: (currentDate) => { return +currentDate < +new Date() },
                disabledTime: disabledRangeTime,
                showTime: {
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:59:59', 'HH:mm:ss')]
                }
              }}
            />
            <ProFormDateTimePicker
              name="endTimeAdvancePayment"
              label="店主采购单下单截至时间"
              width="md"
              // rules={[{ required: true, message: '请选择店主采购单下单截至时间' }]}
              fieldProps={{
                disabledDate: (currentDate) => { return +currentDate < +new Date() },
                disabledTime: disabledRangeTime,
                showTime: {
                  defaultValue: moment('00:59:59', 'HH:mm:ss')
                }
              }}
            />
            <ProFormCheckbox.Group value={'1'} label="可购买的会员店等级" disabled options={[{ label: '全部', value: 1 }]} />
            <ProFormCheckbox.Group value={'1'} label="可购买的会员等级" disabled options={[{ label: '全部', value: 1 }]} />
            {/* <ProFormDigit name="canRecoverPayTimes" label="可恢复支付次数" min={0} max={3} placeholder="输入范围0-3" rules={[{ required: true, message: '请输入可恢复支付次数' }]} /> */}
            {/* <ProFormDigit name="recoverPayTimeout" label="每次恢复可支付时长" min={0} max={24} placeholder="输入范围0-24小时" rules={[{ required: true, message: '请输入每次恢复可支付时长' }]} /> */}
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="time"
            title="完成"
            {...formItemLayout}
            onFinish={() => {
              history.push('/intensive-activity-management/intensive-activity-list')
              return true;
            }}
            className={styles.center}
          >
            <Result
              status="success"
              title="活动创建成功"
              subTitle={`活动将在${moment(submitValue?.wholesaleStartTime).fromNow(true)}后开始，请留意`}
            />
            {submitValue && <div
              style={{
                margin: '0 auto 30px',
                backgroundColor: 'rgba(247, 247, 247, 1)',
                padding: '20px',
                maxWidth: 600
              }}
            >
              <Descriptions labelStyle={{ textAlign: 'right', width: 150, display: 'inline-block' }} column={1}>
                <Descriptions.Item label="参与活动商品">{selectItem.goodsName}（skuID：{selectItem.skuId}）</Descriptions.Item>
                {/* <Descriptions.Item label="所有全款结清可收款">{numFormat(submitValue.goodsInfos[0].totalPrice)} 元（{digitUppercase(submitValue.goodsInfos[0].totalPrice)}）</Descriptions.Item> */}
              </Descriptions>
            </div>}
          </StepsForm.StepForm>
        </StepsForm >
      </ProCard >
    </PageContainer >
  )
}

export default IntensiveActivityCreate
