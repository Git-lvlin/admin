import { ModalForm} from '@ant-design/pro-form';
import { message } from 'antd';
import { deleteCommissionById } from '@/services/product-management/designated-commodity-settlement';
import { ExclamationCircleFilled} from '@ant-design/icons';

export default (props)=>{
    const {detailData,visible,setVisible,callback}=props
    return (
        <ModalForm
          title={<p><ExclamationCircleFilled style={{color:'#FBC550'}}/>&nbsp;建议分佣/奖励分成不高于5%</p>}
          onVisibleChange={setVisible}
          visible={visible}
          submitter={{
            searchConfig:{
              resetText:'确认设置',
              submitText:'确定关闭'
            }
          }}
          onFinish={async (values) => {
            setVisible(false) 
            callback() 
            message.success('操作成功')
            return true;
          }}
      >
        <p><span style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作，</span><br/><span style={{color:'#999999'}}>你还要继续吗？</span></p>
      </ModalForm>
    )
}

