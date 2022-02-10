import React, { useState} from 'react';
import { ModalForm,ProFormRadio} from '@ant-design/pro-form';
import { couponEnd } from '@/services/coupon-management/coupon-end';
import { history,connect } from 'umi';

export default props=>{
    const {visible,setVisible}=props
    return (
        <ModalForm
            title="修改红包类型"
            onVisibleChange={setVisible}
            visible={visible}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
              setVisible(false)
            }}
        >
        <ProFormRadio.Group
          name="activityTimeType"
          fieldProps={{
            onChange: (e) =>{
                history.push('/coupon-management/coupon-list/construction?type='+e.target.value)
            },
          }}
          options={[
            {
              label: '会员领取红包',
              value: 1,
            },
            {
              label: '系统发放红包',
              value: 2,
            },
            {
              label: '每日红包',
              value: 3,
            },
            {
              label: '邀请好友红包',
              value: 4,
            }
          ]}
        />
      </ModalForm>
    )
}
