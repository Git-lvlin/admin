import React, { useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less'
// import Circulation from '../circulation/circulation'
import ProForm, { ProFormText, ProFormSelect,ProFormRadio,ProFormDependency } from '@ant-design/pro-form';

const couponType = (props) => {
    let { id,Discounts,type } = props
    return (
        <>
            <ProFormText
                width={120}
                label="开盲盒机会获取途径"
                readonly
                initialValue=" "
            />
            <ProFormRadio.Group
                name="couponType"
                label='1、邀请好友'
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
            <ProFormDependency name={['couponType']}>
                {({ couponType }) => { 
                if(!couponType||couponType==2) return null
                if(couponType==1){
                    return  <div className={styles.unfold}>
                             <p>每邀请2位新用户注册获得1次</p>
                             <>
                             <p>此任务每天最高可获得1次</p>
                             <p>中奖概率20%</p>
                             </>
                             <>
                             <ProForm.Group>
                                <span>此任务每天最高可获得</span>
                                <ProFormText
                                    width={100}
                                    name="usefulAmount"
                                    rules={[
                                        {validator: checkConfirm}
                                    ]}
                                />
                                <span>次</span>
                                </ProForm.Group>
                                <ProForm.Group>
                                    <span>中奖概率</span>
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
                                    <span>%，支持100以内的正整数，不填则默认为100%</span>
                                </ProForm.Group>
                             </>
                            </div>
                }
              }}
            </ProFormDependency>
            <ProFormRadio.Group
                name="couponType2"
                label='2、每日签到'
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
            <ProFormDependency name={['couponType2']}>
                {({ couponType2 }) => { 
                if(!couponType2||couponType2==2) return null
                if(couponType2==1){
                    return  <div className={styles.unfold}>
                             <p>每连续签到3天获得1次</p>
                             <p>中奖概率20%</p>
                             <ProForm.Group>
                                    <span>中奖概率</span>
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
                                    <span>%，支持100以内的正整数，不填则默认为100%</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>
            <ProFormRadio.Group
                name="couponType3"
                label='3、订单消费'
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
            <ProFormDependency name={['couponType3']}>
                {({ couponType3 }) => { 
                if(!couponType3||couponType3==2) return null
                if(couponType3==1){
                    return  <div className={styles.unfold}>
                              <p>每日首次消费2笔订单获得1次</p>
                              <p>中奖概率0.03%</p>
                              <ProForm.Group>
                                    <span>中奖概率</span>
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
                                    <span>%，支持100以内的正整数，不填则默认为100%</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>

        </>
    )
}
export default connect(({ DetailList }) => ({
    DetailList
}))(couponType);