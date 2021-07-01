import React from 'react'
import ProTable from '@ant-design/pro-table'
import { amountTransform } from '@/utils/utils'
import { Image } from 'antd'

import styles from './styles.less'

const tableRow = props => {
  const imageArr = () => {
    const imgUrl = props[0]?.proofImageUrl?.split(',')
    return imgUrl?.map(url => {
      if(url) {
        return(
          <Image
            key={url}
            width={80}
            height={80}
            src={url}
          />
        )
      }
    })
  }
  return (
    <ProTable.Summary.Row>
      <ProTable.Summary.Cell colSpan={6}>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            退货原因：
            <span className={styles.summaryItemText}>{props[0]?.reason}</span>
          </div>
          <div className={styles.summaryItem}>
            退货描述：
            <span className={styles.summaryItemText}>{props[0]?.description}</span>
          </div>
          <div className={styles.summaryImg}>
            <div className={styles.summaryItemTxt}>退货凭证：</div>
            <div className={styles.summaryItemPic}>
              <Image.PreviewGroup>
                { imageArr() }
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
      </ProTable.Summary.Cell>
    </ProTable.Summary.Row>
  )
}

const ReturnGoods = ({data}) => {
  const dataSource = Array.isArray(data) ? [] : [data]
  const columns = [
    {
      title: '商品信息',
      dataIndex: 'goodsInfo',
      align: 'center',
      width: 450,
      render: (_, records) => (
        <div className={styles.goodsInfo}>
          <Image
            width={80}
            height={80}
            src={records?.goodsImageUrl}
          />
          <div className={styles.goodsContent}>
            <div className={styles.goodsName}>{records?.goodsName}</div>
            <div className={styles.skuName}>{records?.skuName}</div>
          </div>
        </div>
      )
    },
    {
      title: '单价',
      dataIndex: 'skuSalePrice',
      align: 'center',
      render: (_) => `¥${amountTransform(Number(_), '/').toFixed(2)}`
    },
    { 
      title: '退货数量',
      dataIndex: 'returnNum',
      align: 'center' 
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      align: 'center',
      render: (_, records) => `¥${amountTransform((records?.skuSalePrice * records?.returnNum), '/').toFixed(2)}`
    },
    {
      title: '实付金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_) => `¥${amountTransform(Number(_), '/').toFixed(2)}`
    },
    {
      title: '应退金额',
      dataIndex: 'returnAmount',
      align: 'center',
      render: (_) => `¥${amountTransform(Number(_), '/').toFixed(2)}`
    }
  ]

  return (
    <ProTable
      rowKey="orderItemId"
      pagination={false}
      columns={columns}
      bordered
      options={false}
      headerTitle="退货商品"
      search={false}
      dataSource={dataSource}
      summary={tableRow}
    />
  )
}

export default ReturnGoods
