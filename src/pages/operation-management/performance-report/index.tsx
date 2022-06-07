import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { ProColumns } from "@ant-design/pro-table"
import type{ FormInstance } from "antd"
import type{ TableProps } from "./data"

import { operationsCommissionPage } from "@/services/operation-management/performance-report"
import { amountTransform } from "@/utils/utils"
import DetailDrawer from "./detail-drawer"
import Export from "@/components/export"


function PerformanceReport () {
  const [ detailVisible, setDetailVisible ] = useState<boolean>(false)
  const [ type, setType ] = useState<number>(1)
  const [ id, setId ] = useState<string>()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const {time, ...rest} = form.current?.getFieldsValue()
    return {
      begin: time && moment(time?.[0]).format("YYYY-MM-DD HH:mm:ss"),
      end: time && moment(time?.[1]).format("YYYY-MM-DD HH:mm:ss"),
      ...rest
    }
  }

  const columns: ProColumns<TableProps>[] = [
    {
      title: '运营商ID',
      dataIndex: 'operationId',
      align: 'center'
    },
    {
      title: '运营商名称',
      dataIndex: 'operationName',
      align: 'center'
    },
    {
      title: '统计时间',
      dataIndex: 'time',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '总收益（元）',
      dataIndex: 'totalCommission',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '设备销售收益（元）',
      dataIndex: 'totalSaleCommission',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.totalSaleCommission > 0) {
          return <a onClick={()=> {setDetailVisible(true); setType(1); setId(r.operationId)}}>{amountTransform(_, '/')}</a>
        } else {
          return <span>{_}</span>
        }
      },
    },
    {
      title: '设备租金收益（元）',
      dataIndex: 'totalRentCommission',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.totalRentCommission > 0) {
          return <a onClick={()=>{setDetailVisible(true); setType(2);}}>{amountTransform(_, '/')}</a>
        } else {
          return <span>{_}</span>
        }
      },
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="operationId"
        columns={columns}
        params={{}}
        request={operationsCommissionPage}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        formRef={form}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export' 
              type='financial-hydrogen-operationsCommission'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        detailVisible&&
        <DetailDrawer
          visible={detailVisible}
          setVisible={setDetailVisible}
          type={type}
          id={id}
          time={form.current?.getFieldsValue().time}
        />
      }
    </PageContainer>
  )
}

export default PerformanceReport
