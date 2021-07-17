import React, { useState} from 'react';
import {Form,Input,Tabs} from 'antd';
import {FormattedMessage,connect} from 'umi';
import styles from '../style.less'
import ProForm,{ProFormText} from '@ant-design/pro-form';
const { TabPane } = Tabs;

const circulation=props=>{
    const { DetailList}=props
    let {id}=props
    const [sumcoupon,setSumcoupon] = useState(0);
    const [summoney,setSummoney] = useState(0);
    // const sumCoupon=e=>{
    //     setSumcoupon(e.target.value)
    // }
    const sumMoney=e=>{
        setSummoney(e.target.value)
    }
    const checkConfirm=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)) {
            await reject('不能输入小数')
        } else {
            await resolve()
        }
        })
    }
    return(
        <Tabs>
            {/* <TabPane className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.issued.amount" />} key="1">
                <ProForm.Group>
                    <ProFormText 
                        name="issueAmount"
                        fieldProps={{
                            onChange: (e) => sumCoupon(e),
                            }}
                        placeholder="请输入拟发行的总金额"
                        width={100}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>元</span>
                </ProForm.Group>
                <p>优惠券发行总数量为<span className={styles.compute }>{sumcoupon/10||(parseInt(id)==id)&&DetailList.data?.issueAmount/10}</span>张</p>
            </TabPane> */}
            <TabPane className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.issued.quantity" />} key="2">
               <ProForm.Group>
                    <ProFormText 
                        name="issueQuantity"
                        fieldProps={{
                            onChange: (e) => sumMoney(e),
                            }}
                        placeholder="请输入拟发行的总数量"
                        width={100}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>张</span>
                </ProForm.Group>
                <p>优惠券发行总金额为<span className={styles.compute }>{summoney*10||(parseInt(id)==id)&&DetailList.data?.issueQuantity*10}</span>元</p>
            </TabPane>
        </Tabs>
    )
}

export default connect(({ DetailList}) => ({
    DetailList,
  }))(circulation);
  