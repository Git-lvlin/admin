import React from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormCheckbox,
  ProFormDateTimeRangePicker,
  ProFormDateTimePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, Result, Form } from 'antd';
import EditTable from './edit-table';
import styles from './index.less';

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

const IntensiveActivityCreate = () => {
  return (
    <PageContainer className={styles.page}>
      <ProCard>
        <StepsForm
          onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            message.success('提交成功');
          }}
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
            onFinish={async ({ name }) => {
              console.log(name);
              return true;
            }}

          >
            <EditTable />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="checkbox"
            title="确认活动参数"
            {...formItemLayout}
          >
            <ProFormText name="dbname" label="活动名称" width="md" placeholder="请输入活动名称" />
            <ProFormDateTimeRangePicker label="活动时间" width="md" />
            <ProFormDateTimePicker label="订金支付截至时间" width="md" />
            <ProFormCheckbox.Group value={'1'} label="可购买的会员店等级" disabled options={[{ label: '全部', value: 1 }]} />
            <ProFormCheckbox.Group value={'1'} label="可购买的会员等级" disabled options={[{ label: '全部', value: 1 }]} />
            <ProFormDigit label="可恢复支付次数" fieldProps={{ value: 1 }} min={0} max={3} placeholder="输入范围0-3" />
            <ProFormDigit label="每次恢复可支付时长" fieldProps={{ value: 3 }} min={0} max={24} placeholder="输入范围0-24小时" />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="time"
            title="完成"
            {...formItemLayout}
          >
            <Result
              status="success"
              title="活动创建成功"
              subTitle="活动将在3天后开始，请留意"
            />
            <div
              style={{
                margin: '0 auto 30px',
                backgroundColor: 'rgba(247, 247, 247, 1)',
                padding: '20px 100px'
              }}
            >
              <Form.Item
                label="最多参与会员店"
              >
                276 家
              </Form.Item>
              <Form.Item
                label="参与活动商品"
              >
                <span style={{ wordBreak: 'break-all', whiteSpace: 'nowrap' }}>洁柔FACE抽纸面巾纸 500抽（skuID：2903）</span>
                <br />
                广州市洁柔纸业有限公司
              </Form.Item>
              <Form.Item label="当前可购买会员总数">
                1092378 名
              </Form.Item>
              <Form.Item label="所有全款结清可收款">
                <span style={{ wordBreak: 'break-all', whiteSpace: 'nowrap' }}>275,000.00 元（贰拾柒萬伍仟圆整）</span>
              </Form.Item>
            </div>
          </StepsForm.StepForm>
        </StepsForm >
      </ProCard >
    </PageContainer >
  )
}

export default IntensiveActivityCreate
