import { useState, useEffect } from "react"
import { Modal } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ServiceProps } from './data'
import type { ProColumns } from '@ant-design/pro-table'


const ServiceDetail: FC<ServiceProps> = ({visible, setVisible, data}) => {

  const [totalNum, setTotalNum] = useState<number>(0)

  useEffect(()=> {
    let total = 0
    data?.map(res => {
      total += res.cardNum
    })
    setTotalNum(total)
  }, [data])
  
  const columns: ProColumns[] = [
    {
      title: '吸氢服务号',
      dataIndex: 'cardNo',
      align: 'center',
      render: (_, r) => r.cardNo ? <a href={`/health-package-activities/store-health-card-management?cardNo=${r.cardNo}`} target="_blank">{_}</a> : '-'
    },
    {
      title: '吸氢次数（次）',
      dataIndex: 'cardNum',
      align: 'center'
    }
  ]

  return (
    <Modal
      visible={visible}
      onCancel={()=>{setVisible(false)}}
      title='健康套餐订单内健康服务明细'
    >
      <ProTable
        headerTitle={`吸氢服务共${totalNum}次`}
        columns={columns}
        pagination={false}
        options={false}
        search={false}
        dataSource={data}
      />
    </Modal>
  )
}

export default ServiceDetail
