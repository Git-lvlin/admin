import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormText,ProFormDateTimeRangePicker,ProFormTextArea,ProFormCheckbox,ProFormRadio,ProFormTimePicker } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import { amountTransform } from '@/utils/utils'
import moment from 'moment';
import styles from './style.less'
import GoosSet from './goos-set'
import { PageContainer } from '@ant-design/pro-layout';


const formItemLayout = {
  labelCol: { span: 3 },
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
  const [detailList,setDetailList]=useState()
  const [falg,setFalg]=useState(true)
  const [goosList,setGoosList]=useState()
  const [visible, setVisible] = useState(false);
  let id = props.location.query.id
  const [form] = Form.useForm()
  useEffect(() => {
    if (id) {
        form.setFieldsValue({
        //   dateRange: [moment(DetailList.data?.limitStartTime).valueOf(), moment(DetailList.data?.limitEndTime).valueOf()],
        //   dateTimeRange: DetailList.data?.activityStartTime?[moment(DetailList.data?.activityStartTime).valueOf(), moment(DetailList.data?.activityEndTime).valueOf()]:null,
        //   ...DetailList.data
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

  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <PageContainer>
      <ProForm
        form={form}
        {...formItemLayout}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button style={{marginLeft:'100px'}} type="default" key="goback" onClick={() => {
                  history.push('/intensive-activity-management/special-offer-acticity/special-offer-acticity-list')
                }}>
                  返回
                </Button>,
                <Button type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确定
                </Button>,
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
        <ProFormText
          width="md"
          name="name"
          label='活动名称'
          rules={[
            { required: true, message: '请输入活动名称' },
            { validator: checkConfirm }
          ]}
        />
        
        <ProFormDateTimeRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
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
         <ProFormRadio.Group
              name="limitType"
              label='C端可购买数量'
              rules={[{ required: true, message: '请选择限领方式' }]}
              options={[
                {
                  label: <ProFormText  name="limitQuantity" fieldProps={{addonAfter:'每人/每天'}}/>, value: 1
                },
                {
                  label: '不限', value: 2
                }
              ]}
         />
         <ProFormRadio.Group
              name="limitType"
              label='C端可购买时间'
              rules={[{ required: true, message: '请选择限领方式' }]}
              options={[
                {
                  label: <ProFormTimePicker.RangePicker name="timeRange" extra='（控件只可选24小时区间）'/>, value: 1
                },
                {
                  label: '不限', value: 2
                }
              ]}
        />
        <ProFormCheckbox.Group
          name="joinShopType"
          label="参与活动的店铺"
          options={[
            {
              label: '生鲜店铺',
              value: 1,
            },
          ]}
          rules={[{ required: true, message: '请选择参与活动的店铺' }]}
        />
        <ProFormRadio.Group
          name="joinBuyerType"
          label="参与活动的消费者"
          options={[
            {
              label: '全部消费者',
              value: 1,
            },
            {
              label: '从未下过单的消费者（新人）',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '请选择参与活动的消费者' }]}
        />
         <GoosSet
          detailList={detailList}
          id={id} 
          falg={falg} 
          callback={(val)=>{
            setGoosList(val)
          }}
        />
      </ProForm >
    </PageContainer>
  );
};
