import React, { useState, useEffect } from 'react'
import { ModalForm } from '@ant-design/pro-form'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import type{ symptomListProps } from './data'

import { symptom } from '@/services/finger-doctor/health-detection-condition'

const SymptomList: FC<symptomListProps> = ({visible, setVisible, gender, skuData, callback}) => {
  const [selectItems, setSelectItems] = useState<{name: string, id: number}[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [goodsData, setGoodsData] = useState<string[]>([])

  useEffect(()=> {
    setSelectItems(skuData)
    setSelectedRowKeys(skuData.map(item => item.id))
  }, [])

  const columns: ProColumns[] = [
    {
      dataIndex: 'name',
      fieldProps: {
        placeholder: '请输入总检或健康风险关键字'
      },
      hideInTable: true,
      render: (_)=> <span style={{fontSize: "12px"}}>{_}</span>
    },
    {
      title: '检测项',
      dataIndex: 'checkItem',
      align: 'center',
      hideInSearch: true,
      width: '10%',
      render: (_)=> <span style={{fontSize: "12px"}}>{_}</span>
    },
    {
      title: '总检',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true,
      width: '10%',
      render: (_)=> <span style={{fontSize: "12px"}}>{_}</span>
    },
    {
      title: '健康风险',
      dataIndex: 'risk',
      align: 'center',
      hideInSearch: true,
      render:(_) => <pre style={{fontSize: "12px"}}>{_}</pre>
    },
    {
      title: '健康建议',
      dataIndex: 'suggest',
      align: 'center',
      hideInSearch: true,
      render:(_) => <pre style={{fontSize: "12px"}}>{_}</pre>
    }
  ]

  return (
    <ModalForm
      title='请勾选要调理的症状：'
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      onFinish={async() => {
        callback(selectItems)
        return true
      }}
    >
      <ProTable
        rowKey='id'
        options={false}
        columns={columns}
        scroll={{y: 430}}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ]
        }}
        postData={(v: string[]) => {
          const arr: string[] = [...goodsData]
          arr.push(...v)
          setGoodsData(arr)
          return v
        }}
        pagination={{
          pageSize: 10
        }}
        params={{gender}}
        request={symptom}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            const arr: {name: string, id: number}[] = []
            _.forEach(item => {
              const obj: any = [...skuData, ...goodsData].find((ele: any) => {
                return ele.id === item
              })
              obj && arr.push(obj)
            })
            setSelectItems(arr || [])
            setSelectedRowKeys(_)
          }
        }}
      />
    </ModalForm>
  )
}

export default SymptomList