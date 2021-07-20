import React from 'react';
import {formatMessage,connect} from 'umi';
import ProForm,{ ProFormText,ProFormDateRangePicker } from '@ant-design/pro-form';

const validity=(props)=>{
    let {id,DetailList,position}=props
    return (
        <>
         {
             position==1||(parseInt(id)==id )&&DetailList.data?.activityStartTime?
             <div
                style={{display:position==2?'none':'block'}}
            >
                <ProFormDateRangePicker
                    name='dateTimeRange'
                    placeholder={[
                        formatMessage({id: 'formandbasic-form.placeholder.start'}),
                        formatMessage({id: 'formandbasic-form.placeholder.end'}),
                    ]}
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