import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { DrtailItem } from "./data"

import { aedUnfreezeSwitch } from "@/services/aed-team-leader/aed-settlement-configuration"

export default function TransactionData () {
  const form = useRef<ActionType>()
  const [detailMsg, setDetailMsg] = useState<DrtailItem>('')

  useEffect(()=>{
    aedUnfreezeSwitch({}).then(res=>{
      if(res.code==0){
        setDetailMsg(res.data)
      }
    })
  },[])

  const tableData = [
    {
      id: 1,
      agencyId: '交易订单支付完成',
      name: `下保证金订单 状态：${{'on': '已开启', 'off': '已关闭'}[detailMsg?.order10000Siwtch]}`,
      dateRange: '非当月订单',
      totalPayAmount: '已通过结算申请审核',
      totalCommission: '已确认线下打款'
    },
    {
      id: 2,
      agencyId: '',
      name: `签订法大大合同 状态：${{'on': '已开启', 'off': '已关闭'}[detailMsg?.connectedSiwtch]}`,
      dateRange: '',
      totalPayAmount: '',
      totalCommission: ''
    },
    {
      id: 3,
      agencyId: '',
      name: `完成视频学习 状态：${{'on': '已开启', 'off': '已关闭'}[detailMsg?.learnedSiwtch]}`,
      dateRange: '',
      totalPayAmount: '',
      totalCommission: ''
    },
    {
      id: 4,
      agencyId: '',
      name: `AED课程考试通过 状态：${{'on': '已开启', 'off': '已关闭'}[detailMsg?.examSiwtch]}`,
      dateRange: '',
      totalPayAmount: '',
      totalCommission: ''
    },
    {
      id: 5,
      agencyId: '',
      name: `线下培训状态 状态：${{'on': '已开启', 'off': '已关闭'}[detailMsg?.trainingOfflineSiwtch]}`,
      dateRange: '',
      totalPayAmount: '',
      totalCommission: ''
    },
  ];
  

  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '1、分账条件',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '2、解冻条件（技术可开关）',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '3、结算申请条件',
      dataIndex: 'dateRange',
    },
    {
      title: '4、汇款条件',
      dataIndex: 'totalPayAmount',
      align: 'center',
    },
    {
      title: '5、结款条件',
      dataIndex: 'totalCommission',
      align: 'center',
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="id"
        headerTitle='AED子公司的4300课程培训服务套餐交易业绩结算规则配置'
        columns={tableColumns}
        dataSource={tableData}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={false}
      />
    </PageContainer>
  )
}
