import { useEffect } from 'react';
import { Form, message,Button} from 'antd';
import { setMemberShopDeliveryCoverage } from '@/services/intensive-store-management/community-store-setting';
import ProForm, { ProFormSwitch,ProFormDependency,ProFormRadio,ProFormDateTimeRangePicker,ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@/components/PageContainer';
import Upload from '@/components/upload';
import moment from 'moment';
import styles from './style.less'

const formItemLayout = {
  labelCol: { span: 4},
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

 

export default (props) =>{
  const [form] = Form.useForm();
  useEffect(() => {

  }, [])
  const onsubmit=values=>{
     const params={

     }
    setMemberShopDeliveryCoverage(params).then(res=>{
      if(res.code==0){
        message.success('保存成功')
      }
    })
  }
  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <PageContainer title='APP氢原子启动成功后弹窗'>
      <ProForm
        form={form}
        onFinish={async (values)=>{
            await  onsubmit(values);
          return true;
         } }
         {...formItemLayout} 
        submitter={{
          render: (props, doms) => {
            return [
              <Button style={{marginLeft:'1600px'}} type="primary" key="submit" onClick={() => {
                props.form?.submit?.()
              }}>
                保存
              </Button>        
            ];
          }
        }}
        className={styles.hydrogen_atom_start_window}
      >
       <ProCard split="vertical">
        <ProCard colSpan="384px">
          <Form.Item extra="图片上传要求：2MB以内；格式png/jpg/gif" name="logo">
            <Upload multiple maxCount={1} accept="image/*" size={2 * 1024} />
          </Form.Item>
        </ProCard>
        <ProCard>
          <ProFormRadio.Group
            name="switch1"
            label='弹窗时段'
            options={[
                {
                label:'长期',
                value: 1,
                },
                {
                label: '指定时段',
                value: 2,
                }
            ]}
            rules={[{ required: true, message: '请设置弹窗时段' }]}
          />
          <ProFormDependency name={['switch1']}>
            {({ switch1 }) => { 
                if(switch1==1){return null }
                if(switch1==2){
                    return <div style={{marginLeft:'150px'}}>
                            <ProFormDateTimeRangePicker
                                name="dateRange"
                                fieldProps={{
                                disabledDate:(current)=>disabledDate(current),
                                format:"YYYY-MM-DD HH:mm:ss"
                                }}
                            />
                           </div>
                }  
            }}
          </ProFormDependency>
          <ProFormRadio.Group
            name="switch2"
            label='点击弹窗图片跳转目标'
            options={[
                {
                label:'社区店',
                value: 1,
                },
                {
                label: '集约',
                value: 2,
                },
                {
                label: '约购健康',
                value: 3,
                },
                {
                label: '拼团活动',
                value: 4,
                },
                {
                label: '限时秒杀',
                value: 5,
                },
                {
                label: '签到有奖',
                value: 6,
                },
                {
                label: '自定义链接',
                value: 7,
                }
            ]}
            />
            <ProFormDependency name={['switch2']}>
                {({ switch2 }) => { 
                    if(switch2!==7) return null
                    if(switch2==7){
                        return <div style={{marginLeft:'150px'}}>
                                <ProFormText
                                  name="dayGainMax"
                                  fieldProps={{
                                    maxLength: 80
                                  }}
                                  placeholder='请输入点击弹窗跳转的链接地址，不超过80个字符'
                                />
                               </div>
                    } 
                }}
            </ProFormDependency>
            <ProFormSwitch  
                rules={[{ required: true, message: '请设置' }]} 
                label='是否开启在弹窗上显示关闭按钮' 
                name="outOffForbidden" 
                extra='开启后弹窗上会显示关闭弹窗按钮'
            />
            <ProFormSwitch  
                rules={[{ required: true, message: '请设置' }]} 
                label='显示状态' 
                name="switch" 
                extra='开启后弹窗才会显示'
            />
          </ProCard>
        </ProCard>
       </ProForm>
    </PageContainer>
  )
}
