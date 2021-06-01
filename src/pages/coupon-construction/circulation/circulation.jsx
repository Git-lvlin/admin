import React, { useState} from 'react';
import {Form,Input,Tabs} from 'antd';
import {FormattedMessage,connect} from 'umi';
import styles from '../style.less'
import ProForm from '@ant-design/pro-form';
const { TabPane } = Tabs;

const circulation=props=>{
    const { DetailList}=props
    let {id}=props
    const [sumcoupon,setSumcoupon] = useState(0);
    const [summoney,setSummoney] = useState(0);
    const sumCoupon=e=>{
        setSumcoupon(e.target.value)
    }
    const sumMoney=e=>{
        setSummoney(e.target.value)
    }
    return(
        <Tabs  type="card">
            <TabPane className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.issued.amount" />} key="1">
                <ProForm.Group>
                    <Form.Item name="issueQuantity">
                        <Input placeholder="请输入拟发行的总金额" onChange={sumCoupon}/>
                    </Form.Item>
                    <span>元</span>
                </ProForm.Group>
                <p>优惠券发行总数量为<span className={styles.compute }>{(parseInt(id)==id)&&DetailList.data?.issueQuantity/10||sumcoupon/10}</span>张</p>
            </TabPane>
            <TabPane className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.issued.quantity" />} key="2">
               <ProForm.Group>
                    <Form.Item name="issueQuantity">
                        <Input placeholder="请输入拟发行的总数量" onChange={sumMoney}/>
                    </Form.Item>
                    <span>张</span>
                </ProForm.Group>
                <p>优惠券发行总金额为<span className={styles.compute }>{(parseInt(id)==id)&&DetailList.data?.issueQuantity*10|| summoney*10 }</span>元</p>
            </TabPane>
        </Tabs>
    )
}

export default connect(({ DetailList}) => ({
    DetailList,
  }))(circulation);
  