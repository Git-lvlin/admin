import React, { useState} from 'react';
import { ModalForm} from '@ant-design/pro-form';
import { message } from 'antd';
import { changeStatus } from '@/services/activity-management/spring-festival-build-building-activity';
import { history,connect } from 'umi';

export default props=>{
    const {endId,visible,setVisible,canBlack}=props

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
            changeStatus({id:endId,actCode:'bhActiveCode',status:0}).then(res=>{
            if(res.code==0){
              setVisible(false) 
              canBlack(true)
              setTimeout(()=>{
                canBlack(false)
              },1000)  
              message.success('操作成功')
              return true;
            }
          })
        
          }}
      >
        <p>活动终止后不可恢复，确认要终止此活动吗？</p>
      </ModalForm>
    )
}

