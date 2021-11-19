import React, { useState} from 'react';
import { ModalForm} from '@ant-design/pro-form';
import { couponEnd } from '@/services/coupon-management/coupon-end';

export default props=>{
    const {endId,visible,setVisible}=props

    return (
        <ModalForm
          title="提示"
          key={endId}
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
          couponEnd({id:endId}).then(res=>{
            if(res.code==0){
              // boxref.current.reload();
              setVisible(false)
              return true;
            }
          })
        
          }}
      >
        <p>活动终止后不可恢复，确认要终止此活动吗？</p>
      </ModalForm>
    )
}

