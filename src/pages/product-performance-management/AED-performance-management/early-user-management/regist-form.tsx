import { useState, useEffect } from 'react'
import { Drawer, Button, Descriptions, Table, Image} from 'antd'

import type { registFormProps } from './data'

import { getSignInfo } from '@/services/product-performance-management/early-user-management'

const RegistForm:React.FC<registFormProps> = ({id, visible, setVisible, phone, time}) => {
  const [data, setData] = useState<any>()

  useEffect(()=> {
    getSignInfo({
      subOrderSn: id
    }).then(res => {
      if(res.code === 0) {
        setData(res.data)
      }
    })
  }, [id])

  const columns: any = [
    {
      dataIndex: 'index',
      align: 'center',
      width: '10%'
    },
    {
      dataIndex: 'title',
      align: 'center',
      width: '75%'
    },
    {
      dataIndex: 'select',
      align: 'center',
      width: '15%'
    }
  ]

  return (
    <Drawer
      title={`报名用户手机号：${phone} 报名填表时间：${time}`}
      width={1200}
      visible={visible}
      onClose={()=> setVisible(false)}
      footer={
        <Button type='primary' onClick={()=> setVisible(false)}>返回</Button>
      }
      destroyOnClose
    >
      <Descriptions
        bordered
        column={{ xxl: 3, xl: 2 }}
      >
        <Descriptions.Item label="姓名">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{data?.senderDesc}</Descriptions.Item>
        <Descriptions.Item label="身份证号码">{data?.cardNo}</Descriptions.Item>
        <Descriptions.Item label="年龄">{data?.age}</Descriptions.Item>
        <Descriptions.Item label=" ">{}</Descriptions.Item>
        <Descriptions.Item label=" ">{}</Descriptions.Item> 
      </Descriptions>
      <Table
        showHeader={false}
        columns={columns}
        bordered
        pagination={false}
        dataSource={data?.agreeRemark && JSON.parse(data?.agreeRemark)}
        style={{margin: '20px 0'}}
      />
      <Image
        width='100%'
        height={80}
        src={data?.signUrl}
      />
    </Drawer>
  )
}

export default RegistForm