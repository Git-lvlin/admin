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
      title: '供应商ID',
      dataIndex: 'supplierId',
      render: (_, records)=> records?.business?.businessId
    }
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
