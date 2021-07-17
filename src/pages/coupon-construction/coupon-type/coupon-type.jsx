import React, { useState,useEffect } from 'react';
import { Form, Input, Tabs } from 'antd';
import { FormattedMessage, connect } from 'umi';
import styles from '../style.less'
const { TabPane } = Tabs;
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';

const couponType = (props) => {
    let { id } = props
    let { dispatch, DetailList } = props
    const [flag, setFlag] = useState()
    const [discounts, setDiscounts] = useState('');
    const [coupons, setCoupons] = useState('');
    const [immediately, setImmediately] = useState('');

    const onDiscounts = e => {
        setDiscounts(e.target.value)
    }
    const onCoupons = e => {
        setCoupons(e.target.value)
    }
    const onImmediately = e => {
        setImmediately(e.target.value)
    }
    const callback = cate => {
        dispatch({
            type: 'UseScopeList/fetchCouponType',
            payload: {
                couponType: cate
            }
        })
    }
    const toggle = val => {
        setFlag(val)
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
    useEffect(()=>{
        console.log('DetailList.data',DetailList.data)
    },[])
    return (
        <Tabs onChange={callback}  defaultActiveKey={DetailList.data?.couponType.toString()}>
            <TabPane key='1' className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.radio.public" />} key="1">
                <ProForm.Group>
                    <span>使用门槛: 活动商品满</span>
                    <ProFormText
                        width={100}
                        name="usefulAmount"
                        rules={[
                            {validator: checkConfirm}
                        ]}
                    />
                    <span>元 （如果设置为0，则无使用门槛)</span>
                </ProForm.Group>
                <ProForm.Group>
                    <span>优惠内容 : 减免</span>
                    <ProFormText 
                        name="freeAmount"
                        fieldProps={{
                            onChange: (e) => onDiscounts(e),
                            }}
                        width={100}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>元</span>
                </ProForm.Group>
                <p>优惠券面值<span className={styles.compute}>{ discounts||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay}</span> 元</p>
            </TabPane>


            <TabPane key='2' className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.radio.partially-public" />} key="2">
                <ProForm.Group>
                    <span>使用门槛 : 活动商品满</span>
                    <ProFormText
                        width={100}
                        name={flag == 2 ? 'usefulNum' : 'usefulAmount'}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <ProFormSelect
                        name="unit"
                        initialValue={1}
                        fieldProps={{ onChange: (val) => { toggle(val) } }}
                        options={[
                            {
                                value: 1,
                                label: '元',
                            },
                            {
                                value: 2,
                                label: '件',
                            },
                        ]}
                        width={100}
                        placeholder="元"
                    />
                    <span>（如果设置为0，则无使用门槛）</span>
                </ProForm.Group>
                <ProForm.Group>
                    <span>优惠内容: </span>
                    <ProFormText 
                        name="freeDiscount"
                        fieldProps={{
                            onChange: (e) => onCoupons(e),
                            }}
                        width={100}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span> %折扣，最多优惠</span>
                    <ProFormText
                        width={100}
                        name="maxFreeAmount"
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>（不填写则不作限制） 元</span>
                    <p>（只能填1-99的整数）</p>
                </ProForm.Group>
                <p>优惠券面值<span className={styles.compute}>{coupons ? (100 - coupons) / 100 : ''||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay ? (100 - DetailList.data?.freeDiscount) / 100 : ''}</span> 折券</p>
            </TabPane>

            <TabPane key='3' className={styles.unfold} tab={<FormattedMessage id="formandbasic-form.radio.private" />} key="3">
                <ProForm.Group>
                    <span>使用门槛 :订单金额满</span>
                    <ProFormText
                        width={100}
                        name='usefulAmount'
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>元 （如果设置为0，则无使用门槛）</span>
                </ProForm.Group>
                <ProForm.Group>
                    <span>优惠内容 : 可立减</span>
                    <ProFormText 
                        name="freeAmount"
                        fieldProps={{
                            onChange: (e) => onImmediately(e),
                            }}
                        width={100}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>元</span>
                </ProForm.Group>
                <p>优惠券面值<span className={styles.compute}>{immediately||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay}</span> 元</p>
            </TabPane>

        </Tabs>
    )
}
export default connect(({ DetailList }) => ({
    DetailList
}))(couponType);