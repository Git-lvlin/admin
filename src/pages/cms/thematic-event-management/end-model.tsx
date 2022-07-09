
import { ModalForm} from '@ant-design/pro-form';
import { message } from 'antd';
import { changeStatus } from '@/services/cms/member/thematic-event-management'
import type { endItem } from './data'

export default (props:endItem)=>{
    const {endId,visible,setVisible,callback}=props
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
            changeStatus({id:endId,status:0}).then(res=>{
            if(res.code==0){
              setVisible(false) 
              callback() 
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

