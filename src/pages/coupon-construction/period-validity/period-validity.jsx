import React from 'react';
import {Form,DatePicker} from 'antd';
import {formatMessage,connect} from 'umi';
import ProForm,{ ProFormText } from '@ant-design/pro-form';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const validity=(props)=>{
    let {id,DetailList,position}=props
    return (
        <>
         {
             position==1||DetailList.data?.activityStartTime?
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
            </FormItem>:null
         }
        {
            position==2||DetailList.data?.activityEndDay?
            <>
                {
                id&&DetailList.data?
                <p>领券{DetailList.data?.activityStartDay}天起，{DetailList.data?.activityEndDay}天内可用</p>
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
            :null
         }
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(validity);