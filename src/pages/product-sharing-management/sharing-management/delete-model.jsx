import { ModalForm} from '@ant-design/pro-form';
import { message } from 'antd';
import { deleteCommissionById } from '@/services/product-management/designated-commodity-settlement';
import { ExclamationCircleFilled} from '@ant-design/icons';

export default (props)=>{
    const {detailData,visible,setVisible,callback}=props
    return (
        <ModalForm
          title="确认提示"
          onVisibleChange={setVisible}
          visible={visible}
          submitter={{
            searchConfig:{
              resetText:'取消关闭',
              submitText:'确定关闭'
            }
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
        <p><ExclamationCircleFilled style={{color:'#FBC550'}}/>&nbsp;<span style={{fontWeight:'bold'}}>是否确定关闭分成配置？</span><br/><span style={{color:'#999999'}}>关闭分成配置会导致此商品的后续交易将无法分成！</span></p>
      </ModalForm>
    )
}

