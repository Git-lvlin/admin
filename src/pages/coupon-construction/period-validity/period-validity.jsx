import React from 'react';
import { FormattedMessage, formatMessage,connect } from 'umi';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import moment from 'moment';
import ProForm,{ ProFormText,ProFormDateTimeRangePicker,ProFormDependency,ProFormRadio} from '@ant-design/pro-form';
import styles from '../style.less'

const validity=(props)=>{
    let {id,DetailList,type}=props
    const disabledDate=(current)=>{
        return current && current < moment().startOf('day');
    }
    const options=[
        {
          label: '固定时间',
          value: 1,
        },
        {
          label: '领券',
          value: 2,
        }
    ]
    const options2=[
        {
          label: '领券',
          value: 2,
        }
    ]
    return (
        <>
        {
            type!=3||DetailList.data?.issueType != 3 && id?
                <ProFormRadio.Group
                    name="activityTimeType"
                    label={<FormattedMessage id="formandbasic-form.period.of.validity" />}
                    rules={[{ required: true, message: '请选择有效期限' }]}
                    options={type==2||DetailList.data?.issueType == 2 && id?options2:options}
                />
            :null
        }
        <ProFormDependency name={['activityTimeType']}>
            {({ activityTimeType }) => {
                if (!activityTimeType) return null
                if (activityTimeType==1){
                    return  <div className={styles.unfold}>
                                <ProFormDateTimeRangePicker
                                    name='dateTimeRange'
                                    placeholder={[
                                        formatMessage({id: 'formandbasic-form.placeholder.start'}),
                                        formatMessage({id: 'formandbasic-form.placeholder.end'}),
                                    ]}
                                    fieldProps={{
                                        disabledDate:(current)=>disabledDate(current)
                                    }}
                                />
                            </div>
                }
        
                return ( 
                <div className={styles.unfold}>
                    <ProForm.Group>
                        <ProFormText
                            width={100}
                            name="activityStartDay"
                            placeholder="0"
                        />
                        <span>天起,</span>  
                        <ProFormText
                            width={100}
                            name="activityEndDay"
                            placeholder="7"
                        />
                        <span>天内可用</span>
                    </ProForm.Group>
                </div>
                );
                }}
        </ProFormDependency>
         {
            type==3||DetailList.data?.issueType == 3 && id?
                <Form.Item
                 label="有效期"
                >
                <div className={styles.align_from}>
                    <p>领券后</p>
                    <ProFormText
                        width={100}
                        name="activityEndHour"
                    />
                    <p>小时内可用</p>
                </div>
                </Form.Item>
            :null
        }
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(validity);