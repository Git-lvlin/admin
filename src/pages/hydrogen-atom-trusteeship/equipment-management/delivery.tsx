import { useRef } from 'react'
import ProForm, { ModalForm } from '@ant-design/pro-form'
import { 
  Space,
  Typography
} from "antd"

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { DeliveryProps } from './data'

import { confirmHosting } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const { Title, Paragraph } = Typography


const Delivery: FC<DeliveryProps> = (props: DeliveryProps) => {
  const { visible, setVisible, data, callback } = props
  const formRef = useRef<FormInstance>()

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      confirmHosting({orderId: data?.orderId}).then(res => {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      title='确认投放设备给运营中心'
      width={500}
      visible={visible}
      formRef={formRef}
      onFinish={async () => {
        await submit()
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
      labelCol={{span: 10}}
    >
      <Title level={4}>确认要托管订单设备商品投放到运营中心？</Title>
      <ProForm.Item
        label='当前订单号'
      >
        {data?.hostingOrderId}
      </ProForm.Item>
      <ProForm.Item
        label='被投放运营中心店主手机号'
      >
        {data?.storePhone}
      </ProForm.Item>
      <ProForm.Item
        label='被投放运营中心店铺名称'
      >
        {data?.storeName}（编号：{data?.storeHouseNumber}）
      </ProForm.Item>
      <ProForm.Item
        label='被投放运营中心店信息'
      >
        <Space direction='vertical' align='start'>
          <div>{data?.storeUserName}</div>
          <div>{data?.storeAddress}</div>
        </Space>
      </ProForm.Item>
      <Typography>
        <Title level={5}>确认投放后系统将实现：</Title>
        <Paragraph>
          <ol>
            <li>根据托管订单生成新的运营订单；</li>
            <li>将确认投放时间作为新运营订单的下单时间；</li>
            <li>根据托管订单单号生成新运营订单单号；</li>
            <li>将投放的运营中心社区店提货点设为运营订单的收货地址；</li>
            <li>将运营订单推送给设备供应商，以便其发货；</li>
          </ol>
        </Paragraph>
      </Typography>
    </ModalForm>
  )
}

export default Delivery
