import { Drawer } from "antd"
import moment from "moment"
import ProTable from "@ant-design/pro-table"

import type{ DetailDrawerProps } from "./data"
import type{ ProColumns } from "@ant-design/pro-table"

import { operationsCommissionItemPage } from "@/services/operation-management/performance-report"
import { amountTransform } from "@/utils/utils"

const DetailDrawer = (props: DetailDrawerProps) => {
  const { visible, setVisible, type, id } = props

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
        search={false}
        request={operationsCommissionItemPage}
        params={{type, operationId: id}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
      />
    </Drawer>
  )
}

export default DetailDrawer
