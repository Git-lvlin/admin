import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { 
  Divider,
  Button,
  Image 
} from 'antd'
import { history, useLocation } from 'umi'

import { 
  supplierGoodsData,
  supplierSecondSaleData,
  supplierSaleGoodsData,
  supplierWholesaleData
} from '@/services/data-board/supplier-data'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const Detail = () => {
  const { query } = useLocation()

  const dataColumns = () => {
    switch(query.type) {
      case 'amount':
      case 'sales':
        return [
          {
            title: 'spuID',
            dataIndex: 'spuId',
            hideInSearch: true
          },
          {
            title: 'skuID',
            dataIndex: 'skuId',
            hideInSearch: true
          },
          {
            title: '图片',
            dataIndex: 'imageUrl',
            render: (_) => <Image width={80} height={80} src={_}/>,
            hideInSearch: true
          },
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            hideInSearch: true,
            width: '15%'
          },
          {
            title: '可用库存',
            dataIndex: 'stockNum',
            hideInSearch: true
          },
          {
            title: '上架状态',
            dataIndex: 'goodsState',
            hideInSearch: true,
            render:(_) => {
              return _ === 1 ? '下架' : '上架'
            }
          }
        ]
      case 'second':
      case 'intensive':
        return [
          {
            title: 'spuID',
            dataIndex: 'spuId',
            hideInSearch: true
          },
          {
            title: 'skuID',
            dataIndex: 'skuId',
            hideInSearch: true
          },
          {
            title: '图片',
            dataIndex: 'imageUrl',
            render: (_) => <Image width={80} height={80} src={_}/>,
            hideInSearch: true
          },
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: '15%'
          },
          {
            title: '可用库存',
            dataIndex: 'stockNum',
            hideInSearch: true
          },
          {
            title: '订单总数（秒约）',
            dataIndex: 'orderCount',
            hideInSearch: true
          },
          {
            title: '销量（秒约）',
            dataIndex: 'saleNum',
            hideInSearch: true
          },
          {
            title: '销售总额（秒约）',
            dataIndex: 'totalAmount',
            hideInSearch: true,
            render: (_) => amountTransform(Number(_), '/')
          }
        ]
    }
  }

  const dataRequest = () => {
    switch(query.type) {
      case 'amount':
        return supplierGoodsData
      case 'sales':
        return supplierSaleGoodsData
      case 'second':
        return supplierSecondSaleData
      case 'intensive':
        return supplierWholesaleData
    }
  }

  return (
    <PageContainer title={false}>
      <div className={styles.tableDetail}> 
        <span>商家名称：{query.storeName}</span>
        <Button onClick={()=> history.goBack()}>返回</Button>
      </div>
      <Divider/>
      <ProTable
        rowKey='skuID'
        request={dataRequest()}
        params={{supplierId: query.id}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        toolBarRender={false}
        columns={dataColumns()}
        search={!(query.type !== 'second'&&query.type !== 'intensive')}
      />
    </PageContainer>
  )
}

export default Detail
