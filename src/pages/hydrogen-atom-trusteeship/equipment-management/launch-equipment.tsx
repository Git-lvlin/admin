import { useState, useEffect } from 'react'
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form'
import { AutoComplete, Descriptions, Typography } from "antd"

import type { FC } from 'react'
import { LaunchEquipmentProps, ListProps } from './data'

const { Option } = AutoComplete
const { Title, Paragraph } = Typography


const LaunchEquipment: FC<LaunchEquipmentProps> = (props: LaunchEquipmentProps) => {
  const { title, visible, setVisible, callback } = props
  const [result, setResult] = useState<ListProps[]>([])

  useEffect(()=> {
    setResult([{id: 0, store: '1', phone: '1', address: '1'}, {id: 1, store: '2', phone: '2', address: '2'}])
  }, [])

  const submit = (v: any) => {
    new Promise<void>((resolve, reject) => {
      
    })
  }

  return (
    <ModalForm
      title={title}
      width={500}
      visible={visible}
      onFinish={async (v)=> {
        await submit(v)
        return true
        
      }}
      onVisibleChange={setVisible}
      submitter={{
        searchConfig: {
          submitText: '确认投放',
          resetText: '取消投放'
        }
      }}
      layout='horizontal'
      wrapperCol={{span: 14}}
      labelCol={{span: 6}}
    >
      <ProForm.Item
        label='选择约购店'
        name='store'
      >
        <AutoComplete
          placeholder='请输入店主姓名、手机号或店铺提货点搜索'
          style={{
            width: 300
          }}
          // onSearch={}
        >
          {result.map((value: ListProps) => (
            <Option key={value.id}>
              <Descriptions
                bordered
                column={1}
                labelStyle={{
                  width: 20
                }}
              >
                <Descriptions.Item label="店主">{value.store}</Descriptions.Item>
                <Descriptions.Item label="手机">{value.phone}</Descriptions.Item>
                <Descriptions.Item label="地址">{value.address}</Descriptions.Item>
              </Descriptions>
            </Option>
          ))}
        </AutoComplete>
      </ProForm.Item>
      <ProFormText
        label='社区店名称'
        name=''
        width='md'
        readonly
      />
       <ProFormText
        label='店主姓名'
        name=''
        width='md'
        readonly
      />
       <ProFormText
        label='店主手机'
        name=''
        width='md'
        readonly
      />
       <ProFormText
        label='店铺地址'
        name=''
        width='md'
        readonly
      />
      <Typography>
        <Title level={5}>确认投放后系统将实现：</Title>
        <Paragraph>
          <ol>
            <li>根据托管订单生成新的运营订单；</li>
            <li>将确认投放时间作为新运营订单的下单时间；</li>
            <li>根据托管订单单号生成新运营订单单号；</li>
            <li>将投放的运营商社区店提货点设为运营订单的收货地址；</li>
            <li>将运营订单推送给设备供应商，以便其发货；</li>
          </ol>
        </Paragraph>
      </Typography>
    </ModalForm>
  )
}

export default LaunchEquipment
