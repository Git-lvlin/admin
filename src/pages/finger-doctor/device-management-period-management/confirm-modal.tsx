import {
  ModalForm,
} from '@ant-design/pro-form';


export default (props) => {
  const { visible, setVisible, callback, params, title, api, resetText, submitText } = props;

  return (
    <ModalForm
      title={title}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={550}
      onFinish={(values) => {
        api(params).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback()
          }
        })
      }}
      submitter={{
        searchConfig:{
          resetText: resetText,
          submitText: submitText
        }
      }}
      labelAlign="right"
    >
      <p style={{ color:'red' }}>确认后立即生效且无法取消！</p>
      <p style={{ color:'#999999' }}>你还要继续吗？</p>
    </ModalForm>
  );
};