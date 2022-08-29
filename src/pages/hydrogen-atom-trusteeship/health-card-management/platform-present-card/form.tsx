import { useRef, useEffect, useState } from 'react';
import { message, Form, Button, InputNumber } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { platformCardEdit } from "@/services/hydrogen-atom-trusteeship/health-card-management"
import { EditableProTable } from '@ant-design/pro-table';
import { amountTransform } from '@/utils/utils'
import type { ProColumns } from "@ant-design/pro-table"
import type { TableItem, SubmitItem, PropsDevices } from "./data"



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


export default (props:PropsDevices) => {
  const { detailData, setVisible, onClose, visible,callback } = props;
  const formRef = useRef();
  const [form] = Form.useForm()
  const [dataSource,setDataSource] = useState<TableItem>()
  const [editableKeys,setEditableKeys] = useState()
  const FromWrap = ({ value, onChange, content, right }) => (
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
    </div>
  )

  const onsubmit =async (values:SubmitItem) => {
    const { cardTimeType,usefulDay, ...res } = values
    const params={
      firstMonthCard:dataSource&&dataSource[0]?.MonthCard,
      firstMonthNum:dataSource&&dataSource[0]?.MonthNum,
      nextMonthCard:dataSource&&dataSource[1]?.MonthCard,
      nextMonthNum:dataSource&&dataSource[1]?.MonthNum,
      cardTimeType,
      usefulDay:cardTimeType==2?parseInt(usefulDay):0,
      ...res
    }
    platformCardEdit(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback()
        message.success('编辑成功')
      }
    })
  };

  useEffect(() => {
    if(detailData){
      form.setFieldsValue({
        ...detailData,
        amount:amountTransform(detailData?.amount,'/'),
      })
      const data=[
        {
          id: 1,
          title: '首页',
          time: '当月下单日',
          MonthCard: detailData?.firstMonthCard,
          MonthNum: detailData?.firstMonthNum
        },
        {
          id: 2,
          title: '次月起',
          time: '当月1号',
          MonthCard: detailData?.nextMonthCard,
          MonthNum: detailData?.nextMonthNum,
        }
      ]
      setEditableKeys(data?.map(ele=>ele.id))
      setDataSource(data)
    }
  }, [])
  const columns: ProColumns<TableItem>[]= [
    {
      title: '发放月份',
      dataIndex: 'title',
      editable:false,
    },
    {
      title: '发放日期',
      dataIndex: 'time',
      editable:false,
    },
    {
      title: '发放赠卡（张）',
      dataIndex: 'MonthCard',
      valueType: 'text',
      renderFormItem: (_,r) => {
        return  <InputNumber/>
        },
    }, 
    {
      title: '次数',
      dataIndex: 'MonthNum',
      valueType: 'text',
      renderFormItem: (_,r) => {
        return  <InputNumber/>
        },
    } 
  ];
  return (
    <DrawerForm
      title='编辑'
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      width={1000}
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
      onFinish={async (values) => {
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
      <ProFormSelect
        width="md"
        name="type"
        label="触发事件"
        options={[
          {
              value: 1,
              label: '投资商首次下单支付',
          },
          {
              value: 2,
              label: '运营商首次下单支付',
          },
        ]}
        placeholder="请选择"
      />
      <ProFormText 
        label="发放规则"
        readonly
        fieldProps={{
          value:' '
        }}
      />
      <ProFormText 
        width="md"
        name="totalMonth"
        label="合计发放"
        placeholder="请输入"
        rules={[
          { required: true, message: '请输入' },
          { validator: checkConfirm2}
        ]}
        fieldProps={{
          addonAfter: '个月'
        }}
      />
      <EditableProTable
          rowKey="id"
          value={dataSource}
          recordCreatorProps={false}
          columns={columns}
          editable={{
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
              setDataSource(recordList)
            }
          }}
      />
      <ProFormText 
        width="md"
        name="amount"
        label="单次价值"
        placeholder="请输入"
        rules={[
          { required: true, message: '请输入' },
          { validator: checkConfirm}
        ]}
        fieldProps={{
          addonAfter: '元'
        }}
      />
      <ProFormRadio.Group
        name="cardTimeType"
        label="有效期"
        layout="vertical"
        rules={[{ required: true, message: '请设置有效期!' }]}
        options={[
          {
            label: '发放起，当月可用',
            value: 1,
          },
          {
            label: <ProForm.Group style={{display:'inline-block'}}>
                    发放起， 
                    <ProFormText 
                      width={100}
                      name="usefulDay"
                      placeholder="请输入"
                      rules={[
                        { validator: checkConfirm2}
                      ]}
                    /> 
                    天内可用
                  </ProForm.Group>,
            value: 2,
          },
        ]}
        initialValue={1}
      />
      <ProFormText 
        name="id"
        hidden
      />
    </DrawerForm>
  );
};
