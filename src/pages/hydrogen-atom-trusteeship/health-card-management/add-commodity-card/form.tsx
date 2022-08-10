import { useRef, useEffect } from 'react';
import { message, Form, Button } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormDateTimePicker,
  ProFormTextArea,
  ProFormCheckbox
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { cardSub, cardEdit } from "@/services/hydrogen-atom-trusteeship/health-card-management"
import moment from 'moment';
import { amountTransform } from '@/utils/utils'
import type { SubmitItem, PropsDevices } from "./data"



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


export default (props:PropsDevices) => {
  const { detailData, setVisible, onClose, visible,callback } = props;
  const formRef = useRef();
  const [form] = Form.useForm()
  const FromWrap = ({ value, onChange, content, right }) => (
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
    </div>
  )

  const onsubmit =async (values:SubmitItem) => {
    const { hotType,cardTimeType,usefulDay,cartEndTime,...res } = values
    const params={
      ...res,
      cardTimeType,
      hotType:hotType[0],
      usefulDay:cardTimeType==2?usefulDay:0,
      cartEndTime:cardTimeType==3?cartEndTime:null
    }
    const sub=detailData?.id?cardEdit:cardSub
    sub(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback()
        message.success(detailData?.id?'编辑成功':'添加成功！')
      }
    })
  };

  useEffect(() => {
    if(detailData){
      const { cartEndTime,salePrice,marketPrice,hotType,...res } = detailData
      form.setFieldsValue({
        ...res,
        cartEndTime:cartEndTime?moment(cartEndTime*1000).format('YYYY-MM-DD HH:mm:ss'):null,
        salePrice:amountTransform(salePrice,'/'),
        marketPrice:amountTransform(marketPrice,'/'),
        hotType:[hotType]
      })
    }
  }, [])

  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
        if(value&&!/^[0-9]+(.[0-9]{0,2})?$/.test(value)){
            await reject('只能输入数字，最多输入两位小数点')
        } else {
        await resolve()
    }
    })
  }

  const checkConfirm2=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    } else {
        await resolve()
    }
    })
  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }

  return (
    <DrawerForm
      title={detailData?.id ?'编辑商品卡' : '添加商品卡'}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      width={1200}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => {
                props.form?.submit?.()
              }}>
                确定
              </Button>,
              <Button type="default" onClick={() => setVisible(false)}>
                取消
              </Button>
            ];
          }
        }
      }
      onFinish={async (values:SubmitItem) => {
        try {
          await onsubmit(values);
        } catch (error) {
          console.log('error',error)
        }
      }}
      {...formItemLayout}
    >
      <ProFormText 
        width="md"
        name="cardName"
        label="卡名称"
        placeholder="请输入"
        rules={[
          { required: true, message: '请输入名称' },
        ]}
      />
      <ProFormText 
        width="md"
        name="subTitle"
        label="副标题"
        placeholder="0/30"
        rules={[
          { required: true, message: '请输入副标题' },
        ]}
        fieldProps={{
          maxLength: 30,
        }}
      /> 
       <Form.Item
          label="商品图"
          name="cardImage"
          rules={[{ required: true, message: '请上传图片!' }]}
        >
          <FromWrap
            content={(value, onChange) => <Upload multiple value={value} onChange={onChange} proportion={{width: 800,height: 800,}}   maxCount={1} accept="image/*"/>}
            right={(value) => {
              return (
                <dl>
                  <dt>建议尺寸：800*800像素，只传1张</dt>
                </dl>
              )
            }}
          />
        </Form.Item>
      <ProForm.Group style={{marginLeft:'80px'}}>
        <ProFormText 
          width="md"
          name="marketPrice"
          label="市场价"
          placeholder="请输入价格"
          rules={[
            { required: true, message: '请输入价格' },
            { validator: checkConfirm}
          ]}
          fieldProps={{
            addonAfter: '元'
          }}
          labelCol={5}
        />
        <ProFormText 
          width="md"
          name="salePrice"
          label="实际售价"
          placeholder="请输入价格"
          rules={[
            { required: true, message: '请输入价格' },
            { validator: checkConfirm}
          ]}
          fieldProps={{
            addonAfter: '元'
          }}
          labelCol={5}
        />
      </ProForm.Group>
      <ProFormRadio.Group
        name="cardType"
        label="卡类别"
        rules={[{ required: true, message: '请设置卡类别!' }]}
        options={[
          {
            label: '标准卡',
            value: 1,
          },
          {
            label: '新人专享卡',
            value: 2,
          },
        ]}
        initialValue={1}
      />

      <ProFormRadio.Group
        name="equipmentType"
        label="适用设备"
        rules={[{ required: true, message: '请设置适用设备!' }]}
        options={[
          {
            label: '托管设备',
            value: 1,
          },
        ]}
        initialValue={1}
      />
      <ProFormText 
        width="md"
        name="num"
        label="卡总次数"
        placeholder="请输入可用次数"
        rules={[
          { required: true, message: '请输入可用次数' },
          { validator: checkConfirm2}
        ]}
        fieldProps={{
          addonAfter: '次'
        }}
      />
      <ProFormRadio.Group
        name="cardTimeType"
        label="有效期"
        layout="vertical"
        rules={[{ required: true, message: '请设置有效期!' }]}
        options={[
          {
            label: '购卡付款起，长期可用（永久）',
            value: 1,
          },
          {
            label: 
              <ProForm.Group style={{display:'inline-block'}}>
                购卡付款起 
                <ProFormText 
                  width={100}
                  name="usefulDay"
                  placeholder="请输入"
                  rules={[
                    { validator: checkConfirm2}
                  ]}
                /> 
                天内可用
              </ProForm.Group>
             ,
            value: 2,
          },
          {
            label: <ProForm.Group style={{display:'inline-block'}}>
                    购卡付款起 
                    <ProFormDateTimePicker
                      name="cartEndTime"
                      fieldProps={{
                        disabledDate:(current)=>disabledDate(current),
                      }}
                    />
                    起天内可用
                  </ProForm.Group>,
            value: 3,
          },
        ]}
        initialValue={1}
        extra='（更改有效期仅对新付款订单有效）'
      />
     <ProFormCheckbox.Group
        name="hotType"
        label="是否加入人气推荐"
        options={[
          {
            label: '是',
            value: 1,
          }
        ]}
      />
      <ProFormTextArea
        width="md"
        name="cardRule"
        label="规则说明"
        placeholder="0/300"
        rules={[
          { required: true, message: '请输入规则' },
        ]}
        fieldProps={{
          maxLength:300,
        }}
      />
      <ProFormText 
        name="id"
        hidden
      />
    </DrawerForm>
  );
};
