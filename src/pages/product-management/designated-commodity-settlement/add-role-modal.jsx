import { ModalForm,ProFormTextArea,ProFormText} from '@ant-design/pro-form';
import { message } from 'antd';

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

export default (props)=>{
    const {endId,visible,setVisible,callback}=props
    return (
        <ModalForm
          title="添加结算角色"
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
              setVisible(false) 
              callback(values) 
              return true;
            }
          }
          {...formItemLayout}
      >
        <ProFormText
          name="name"
          label='角色名称'
          placeholder='请输入2至16个汉字或字符'
          fieldProps={{
            maxLength:16,
            minLength:2
          }}
          rules={[{ required: true, message: '请输入角色名称' }]}
        />
        <ProFormTextArea
          name="tip"
          label="结算说明"
          placeholder="请输入30个以内汉字或字符"
          fieldProps={{
            maxLength:30,
          }}
        />
      </ModalForm>
    )
}

