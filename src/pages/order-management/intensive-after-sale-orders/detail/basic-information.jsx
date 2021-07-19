import React from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import styles from './styles.less'
import './styles.less'

const BasicInformation = ({data}) => {
  const columns = [
    {
      title: '买家ID',
      dataIndex: 'userId',
      render: (_, records)=> records?.buyer?.storeNo
    },
    {
      title: '买家昵称',
      dataIndex: 'userNickname',
      render: (_, records)=> records?.buyer?.storeName
    },
    {
      title: '买家手机号',
      dataIndex: 'buyerPhone',
      render: (_, records)=> records?.buyer?.storePhone
    },
    {
      title: '商家ID',
      dataIndex: 'storeNo',
      render: (_, records)=> records?.business?.businessId
    },
    {
      title: '商家名称',
      dataIndex: 'businessName',
      render: (_, records)=> records?.business?.businessName
    },
    {
      title: '商家手机号',
      dataIndex: 'storePhone',
      render: (_, records)=> records?.business?.businessPhone
    },
  ]
  return (
    <ProDescriptions
      rowKey='orderNumber'
      className={styles.description}
      layout='horizontal'
      bordered
      title='买卖方基本信息'
      column={1}
      dataSource={data}
      columns={columns}
    />
  )
}

export default BasicInformation
