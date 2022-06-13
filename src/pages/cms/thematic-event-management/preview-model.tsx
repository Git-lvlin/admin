import { ModalForm} from '@ant-design/pro-form';
import type { endItem } from './data'

export default (props:endItem)=>{
    const {link,visible,setVisible,callback}=props
    return (
        <ModalForm
          title="预览"
          onVisibleChange={setVisible}
          visible={visible}
          width={425}
          submitter={{
          render: (props, defaultDoms) => {
              return [
              ...defaultDoms
              ];
          },
          }}
          onFinish={async (values) => {
              setVisible(false) 
              callback() 
              return true;
          }}
      >
       <iframe src={link} style={{width:'375px',height:'667px'}}></iframe>
      </ModalForm>
    )
}

