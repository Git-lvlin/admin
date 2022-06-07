import { useRef } from "react"
import { Drawer } from "antd"
import moment from "moment"
import ProTable from "@ant-design/pro-table"

import type{ DetailDrawerProps } from "./data"
import type{ ProColumns } from "@ant-design/pro-table"
import type{ FormInstance } from "antd"

import { operationsCommissionItemPage } from "@/services/operation-management/performance-report"
import { amountTransform } from "@/utils/utils"
import Export from "@/components/export"

const DetailDrawer = (props: DetailDrawerProps) => {
  const { visible, setVisible, type, id } = props
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    return {
      begin: moment().startOf('month').format("YYYY-MM-DD"),
      end: moment().endOf('month').format("YYYY-MM-DD"),
      ...form.current?.getFieldsValue()
    }
  }

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center'
    },
    {
      title: '订单金额(元)',
      dataIndex: 'orderAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '设备销售收益(元)',
      dataIndex: 'realAmount',
      align: 'center',
      hideInTable: type === 2,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '设备租金收益(元)',
      dataIndex: 'realAmount',
      align: 'center',
      hideInTable: type === 1,
      render: (_) => amountTransform(_, '/')
    }
  ]
  return (
    <Drawer
      title={
        type === 1 ? `设备销售收益明细  ${moment().startOf('month').format("YYYY-MM-DD")}~${moment().endOf('month').format("YYYY-MM-DD")}` :
        `设备租金收益明细  ${moment().startOf('month').format("YYYY-MM-DD")}~${moment().endOf('month').format("YYYY-MM-DD")}` 
      }
      width={800}
      visible={visible}
      onClose={()=>setVisible(false)}
    >
      <ProTable
        rowKey='orderNo'
        columns={columns}
        request={operationsCommissionItemPage}
        params={{type, operationId: id}}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={false}
        toolBarRender={() => [
          <Export 
            key='export' 
            type='financial-hydrogen-operationsCommissionItem'
            conditions={getFieldsValue}
          />
        ]}
      />
    </Drawer>
  )
}

export default DetailDrawer
