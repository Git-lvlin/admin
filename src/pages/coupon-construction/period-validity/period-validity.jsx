import React,{useEffect} from 'react';
import {Form,DatePicker} from 'antd';
import {formatMessage,connect} from 'umi';
import ProForm,{ ProFormText,ProFormDateRangePicker } from '@ant-design/pro-form';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const validity=(props)=>{
    let {id,DetailList,position}=props
    return (
        <>
         {
             position==1||(parseInt(id)==id )&&DetailList.data?.activityStartTime?
             <FormItem
                style={{ display: 'inline-block'}}
                name="date2"
            >
                <ProFormDateRangePicker
                    name='dateTimeRange'
                    placeholder={[
                        formatMessage({id: 'formandbasic-form.placeholder.start'}),
                        formatMessage({id: 'formandbasic-form.placeholder.end'}),
                    ]}
                />
            
            </FormItem>:null
         }
        {
            position==2||(parseInt(id)==id )&&DetailList.data?.activityEndDay?
            <>
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
            </>
            :null
         }
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(validity);