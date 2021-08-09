import React, { useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less'
import ProForm, { ProFormText, ProFormSelect,ProFormRadio } from '@ant-design/pro-form';

const couponType = (props) => {
    let { id,Discounts } = props
    let { DetailList } = props
    const [flag, setFlag] = useState()
    const [discounts, setDiscounts] = useState('');
    const [coupons, setCoupons] = useState('');
    const [immediately, setImmediately] = useState('');
    const [position,setPosition]=useState()
    const onDiscounts = e => {
        setDiscounts(e.target.value)
        Discounts(e.target.value)
    }
    const onCoupons = e => {
        setCoupons(e.target.value)
    }
    const onImmediately = e => {
        setImmediately(e.target.value)
        Discounts(e.target.value)
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
    return (
        <>
            <ProFormRadio.Group
                name="couponType"
                label='优惠券类型'
                rules={[{ required: true, message: '请选择优惠券类型' }]}
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                {
                    label:'满减券',
                    value: 1,
                },
                {
                    label: '折扣券',
                    value: 2,
                },
                {
                    label: '立减券',
                    value: 3,
                },
                ]}
            />
            {
                position==1||(parseInt(id)==id )&&DetailList.data?.couponType==1?
                <div style={{display:position==2||position==3?'none':'block'}} className={styles.unfold}>
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
                                onChange: (e) => onDiscounts(e)
                                }}
                            width={100}
                            rules={[
                                {validator: checkConfirm}
                            ]} 
                        />
                        <span>元</span>
                    </ProForm.Group>
                    <p>优惠券面值<span className={styles.compute}>{ discounts||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay}</span> 元</p>
                </div>
                :null
            }
            {
                position==2||(parseInt(id)==id )&&DetailList.data?.couponType==2?
                <div style={{display:position==1||position==3?'none':'block'}} className={styles.unfold}>
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
                            onChange: (e) => onCoupons(e)
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
                </div>
                :null
            }
            {
                position==3||(parseInt(id)==id )&&DetailList.data?.couponType==3?
                <div style={{display:position==1||position==2?'none':'block'}} className={styles.unfold}>
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
                </div>
                :null
            }
        </>
    )
}
export default connect(({ DetailList }) => ({
    DetailList
}))(couponType);