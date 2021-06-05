import React from 'react';
import {Form,Input,DatePicker} from 'antd';
import {FormattedMessage,formatMessage,connect} from 'umi';
import styles from '../style.less'
import ProForm,{ ProFormText } from '@ant-design/pro-form';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const validity=(props)=>{
    let {id,DetailList,position}=props
    return (
        <>
         {
             position==1?
             <FormItem
                style={{ display: 'inline-block'}}
                name="date2"
            >{
                id&&DetailList.data?
                <p >{DetailList.data?.activityStartTime+' -- '+DetailList.data?.activityEndTime}</p>
                :<RangePicker
                    placeholder={[
                        formatMessage({id: 'formandbasic-form.placeholder.start'}),
                        formatMessage({id: 'formandbasic-form.placeholder.end'}),
                    ]}
                />
            }
            </FormItem>
            :<ProForm.Group>
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
         }
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(validity);