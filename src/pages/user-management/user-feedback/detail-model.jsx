import React, { useEffect, useState} from 'react';
import { ModalForm,ProFormTextArea} from '@ant-design/pro-form';
import { Button, message,Typography,Descriptions, Space,Image } from 'antd';
import { feedbackReply,feedbackDetail} from '@/services/user-management/user-feedback';
import { history,connect } from 'umi';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { Title } = Typography;

export default props=>{
    const {detailId,visible,setVisible,canBlack,onClose}=props
    const [detailData, setDetailData] = useState()
    useEffect(()=>{
      feedbackDetail({id:detailId}).then(res=>{
        if(res.code==0){
          setDetailData(res.data)
        }
      })
    },[])
    return (
        <ModalForm
          title='用户反馈详情'
          key={detailId}
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
              <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  回复
              </Button>
              ];
          },
          }}
          onFinish={async (values) => {
            feedbackReply({feedBackId:detailId,...values}).then(res=>{
            if(res.code==0){
              // setVisible(false) 
              // canBlack(true) 
              message.success('操作成功')
              return true;
            }
          })
        
          }}
      >
        <p><Image src={detailData?.createIcon} height={50} width={50} />&nbsp;&nbsp;{detailData?.createName} &nbsp;&nbsp;{detailData?.createTime}</p>
          <Descriptions style={{ flex: 1 }}>
            <Descriptions.Item label="联系手机">{detailData?.mobile}</Descriptions.Item>
            <Descriptions.Item label="问题类型">
              <Space>{detailData?.parentType} <span style={{color:'red'}}>[{detailData?.type}]</span></Space>
            </Descriptions.Item>
            <Descriptions.Item label="系统和型号">
              {detailData?.system} {detailData?.model}
            </Descriptions.Item>
            <Descriptions.Item label="APP版本">{detailData?.version}</Descriptions.Item>
            <Descriptions.Item label="状态">
            {{1: '待处理',2: '已处理'}[detailData?.status]}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions style={{ flex: 1 }}>
            <Descriptions.Item label="反馈内容">
              <pre>{detailData?.content}</pre>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions style={{ flex: 1 }}>
            <Descriptions.Item label="关联订单号">
              {detailData?.orderId}
            </Descriptions.Item>
          </Descriptions>
          <p>回复：</p>
          <ProFormTextArea 
            width="xl" 
            name="content" 
            fieldProps={{
              maxLength:500,
              showCount:true
            }} 
          />
      </ModalForm>
    )
}

