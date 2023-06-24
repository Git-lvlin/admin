import { ModalForm} from '@ant-design/pro-form';
import { message } from 'antd';
import { deleteCommissionById } from '@/services/product-management/designated-commodity-settlement';
import { ExclamationCircleFilled} from '@ant-design/icons';

export default (props)=>{
    const {detailData,visible,setVisible,callback}=props
    return (
        <ModalForm
          title={<p><ExclamationCircleFilled style={{color:'#FBC550'}}/> &nbsp;请确认是否要删除商品结算配置！</p>}
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
            deleteCommissionById({id:detailData.id}).then(res=>{
            if(res.code==0){
              setVisible(false) 
              callback() 
              message.success('操作成功')
              return true;
            }
          })
        
          }}
      >
        <p><span style={{color:'#F1574B'}}>删除后将导致商品已应用的结算失效，<br/>后续也无法应用此结算</span>，你还要继续吗？</p>
      </ModalForm>
    )
}

