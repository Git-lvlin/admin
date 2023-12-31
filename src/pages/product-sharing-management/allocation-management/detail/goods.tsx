import { useEffect, useState } from 'react'
import { Button } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import SelectProductModal from './select-product-modal'
import ProTable from '@/components/pro-table'
import { amountTransform } from '@/utils/utils'

type DataSourceType = {
  id: React.Key
  spuId?: string
  skuId?: string
}

const Goods: React.FC<{callback: (e: any)=> void, data: any}> = ({callback, data}) => {
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [formVisible, setFormVisible] = useState<boolean>(false)

  useEffect(()=> {
    if(data) {
      setDataSource(data)
      callback(data)
    }
  }, [data])

  const columns: ProColumns[] = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center'
    },
    {
      title: ()=> (
        <div>
          <div>skuID</div>
          <div>最低售价的sku</div>
        </div>
      ),
      dataIndex: 'skuId',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center'
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      align: 'center'
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '售价',
      dataIndex: 'salePrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '零售商家结算价',
      dataIndex: 'retailSupplyPrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '批发商家结算价',
      dataIndex: 'wholesaleSupplyPrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <a 
          onClick={()=> {
            const arr = dataSource.filter((item) => item.skuId !== r.skuId)
            setDataSource(arr)
            callback(arr)
          }}
        >
          删除
        </a>
      )
    }
  ]

  return (
    <>
      <ProTable
        rowKey='skuId'
        headerTitle='分成商品'
        search={false}
        options={false}
        columns={columns}
        scroll={{x: 'max-content'}}
        dataSource={dataSource}
      />
      <div>
        <Button 
          type='dashed' 
          style={{width: '100%'}}
          onClick={()=> {setFormVisible(true)}}
        >
          + 新增
        </Button>
      </div>
      {
        formVisible &&
        <SelectProductModal
          visible={formVisible}
          setVisible={setFormVisible}
          callback={(v: any) => {
            callback(v)
            setDataSource(v.map((item: any) => {
              return item
            }))
          }}
          skuData={dataSource}
        />
      }
    </>
  )
}

export default Goods