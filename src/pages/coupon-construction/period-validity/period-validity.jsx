import React from 'react';
import {Form,Input,DatePicker} from 'antd';
import {FormattedMessage,formatMessage} from 'umi';
import styles from '../style.less'
import ProForm,{ ProFormText } from '@ant-design/pro-form';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

export default ()=>{
    return (
        <>
        <ProForm.Group>
            <FormItem
                style={{ display: 'inline-block'}}
                name="date2"
            >
                <RangePicker
                    placeholder={[
                        formatMessage({id: 'formandbasic-form.placeholder.start'}),
                        formatMessage({id: 'formandbasic-form.placeholder.end'}),
                    ]}
                    style={{marginLeft:'20px'}}
                />
            </FormItem>

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
        </ProForm.Group>
        </>
    )
}