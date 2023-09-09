import { useState, useEffect } from 'react'
import { EditableProTable } from '@ant-design/pro-table'
import Big from 'big.js'

import type { ProColumns } from '@ant-design/pro-table'

import styles from './styles.less'
import { RATIO } from '@/constants'

type props = {
  columns: ProColumns[]
  dataSource: any[]
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>
  meta: any
}

const CountyServiceProvider: React.FC<props> = ({ columns, dataSource, setDataSource, meta}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([1, 2])
  Big.RM = 3

  const col: ProColumns[] = columns.map((item: any) => {
    if(item.dataIndex === 'billVal') {
      return {
        ...item,
        title: '分成金额(元)',
        renderFormItem: (_, { record })=> record.billVal
      }
    } else {
      return item
    }
  })

  const val = new Big(meta?.actPriceStr ?? 0).minus(meta?.retailSupplyPriceStr ?? 0)

  const price = val.minus(val.times(RATIO)).toFixed(2)

  const arr: any[] = dataSource.map(res => {
    if(res.roleCode === 'platform') {
      return {
        ...res,
        billVal: `${price}`
      }
    } if(res.roleCode === 'goodsAmount') {
      return {
        ...res,
        billVal: `${meta?.retailSupplyPriceStr ?? 0}（零售供货价）`
      }
    } else {
      return res
    }
  })

  useEffect(()=> {
    setDataSource(arr)
  }, [])
  

  return (
    <EditableProTable
      rowKey='id'
      bordered  
      columns={col}
      value={arr}
      search={false}
      options={false}
      headerTitle='区县服务商店铺交易-分成明细'
      className={styles.editDesc}
      pagination={false}
      editable={{
        type: 'multiple',
        editableKeys,
        onChange: setEditableRowKeys
      }}
      recordCreatorProps={false}
      scroll={{x: 'max-content'}}
      controlled
    />
  )
}

export default CountyServiceProvider