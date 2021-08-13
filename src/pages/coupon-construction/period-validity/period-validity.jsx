import React from 'react';
import {formatMessage,connect} from 'umi';
import moment from 'moment';
import ProForm,{ ProFormText,ProFormDateTimeRangePicker } from '@ant-design/pro-form';

const validity=(props)=>{
    let {id,DetailList,position}=props
    const disabledDate=(current)=>{
        return current && current < moment().startOf('day');
    }
    return (
        <>
         {
             position==1||(parseInt(id)==id )&&DetailList.data?.activityStartTime?
             <div
                style={{display:position==2?'none':'block'}}
            >
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
            
            </div>:null
         }
        {
            position==2||(parseInt(id)==id )&&DetailList.data?.activityEndDay?
            <div style={{display:position==1?'none':'block'}}>
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
            :null
         }
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(validity);