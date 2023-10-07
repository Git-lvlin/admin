import { useEffect, useState } from 'react'
import { EditableProTable } from '@ant-design/pro-table'
import { Tooltip } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import styles from './styles.less'

type props = {
  columns: ProColumns[]
  dataSource: any[]
  setDataSource: React.Dispatch<React.SetStateAction<any[]>>
  info: any,
  setMinPrice: React.Dispatch<React.SetStateAction<any>>
  computedValue: any
  type: number
  val: number
}

const Store: React.FC<props> = ({columns, dataSource, setDataSource, info, setMinPrice, computedValue, type, val}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])

  useEffect(()=> {
    if(dataSource.length > 0) {
      setEditableRowKeys(dataSource?.map(item => item.id))
    }
  }, [dataSource])

  return (
    <EditableProTable
      rowKey='id'
      bordered
      columns={columns}
      value={dataSource}
      search={false}
      options={false}
      headerTitle='门店合作商店铺交易-分成明细'
      className={styles.editDesc}
      toolBarRender={
        ()=> [
          <div>
            <Tooltip 
              title='价差 = 门店价 - 零售供货价'
            >
              商品skuID
            </Tooltip>：
            {info?.skuId ?? '/'}，
            交易金额（门店价）：<span>{info?.actPriceStr ?? 0}</span>元，
            平台结余金额：{+val ?? 0}元（剔除通道费后）
          </div>
        ]
      }
      pagination={false}
      editable={{
        type: 'multiple',
        editableKeys,
        onValuesChange: (record, recordList) => {
          setDataSource(recordList)
          setMinPrice(computedValue(info, recordList, type))
        },
        onChange: setEditableRowKeys
      }}
      recordCreatorProps={false}
      scroll={{x: 'max-content'}}
      controlled
    />
  )
}

export default Store