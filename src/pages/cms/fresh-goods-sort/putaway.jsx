import React, { useState} from 'react';
import { ModalForm} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { changeStatus } from '@/services/intensive-activity-management/penny-activity';
import { history,connect } from 'umi';
import { ExclamationCircleFilled } from '@ant-design/icons';

export default props=>{
    const {selectedRows,visible,setVisible,callback,onClose}=props

    return (
        <ModalForm
          title={<p><ExclamationCircleFilled style={{color:"#FAAD14"}}/> {selectedRows?.length}款商品上架确认</p>}
          onVisibleChange={setVisible}
          visible={visible}
          modalProps={{
            forceRender: true,
            destroyOnClose: true,
            onCancel: () => {
              onClose();
            }
          }}
          submitter={{
          render: (props, defaultDoms) => {
              return [
              <Button  key="cacnl" onClick={() =>{setVisible(false);onClose()}}>
                  暂时不上架
              </Button>,
              <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确认上架
              </Button>
              ];
          },
          }}
          onFinish={async (values) => {
            changeStatus({id:pennyId,actCode:'wsCentActiveCode',status:0}).then(res=>{
            if(res.code==0){
              setVisible(false) 
              callback(true) 
              message.success('操作成功')
              return true;
            }
          })
        
          }}
      >
        <p><span style={{color:"red"}}>上架后即可对外销售</span>，你还要继续吗？</p>
      </ModalForm>
    )
}

