import { useRef } from "react"
import ProTable from '@/components/pro-table'
import moment from "moment"

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance  } from "antd"

import { deviceStartUpList } from "@/services/hydrogen-atom-trusteeship/direcffons"
import { amountTransform } from '@/utils/utils'
import Export from "@/components/export"

const NotCardStartDetails = () => {
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { useTime, ...rest } = form.current?.getFieldsValue()
    return {
      useStartTime: useTime && moment(useTime?.[0]).format('YYYY-MM-DD'),
      useEndTime: useTime && moment(useTime?.[1]).format('YYYY-MM-DD'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id', 
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备ID',
      dataIndex: 'imei', 
      align: 'center'
    },
    {
      title: '使用者手机号',
      dataIndex: 'userPhone', 
      align: 'center'
    },
    {
      title: '使用时间',
      dataIndex: 'useTime', 
      align: 'center',
      hideInSearch: true
    },
    {
      title: '使用时间',
      dataIndex: 'useTime', 
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '启动费金额',
      dataIndex: 'amount', 
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '启动费支付单号',
      dataIndex: 'orderSn', 
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营商手机号',
      dataIndex: 'storePhone', 
      align: 'center'
    },
    {
      title: '投资人手机号',
      dataIndex: 'hostingMemberPhone', 
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      options={false}
      params={{}}
      formRef={form}
      request={deviceStartUpList}
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse(),
          <Export 
            key='export'
            type='healthyDeviceStartUp'
            conditions={getFieldsValue}
          />
        ]
      }}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
    />
  )
}

export default NotCardStartDetails
