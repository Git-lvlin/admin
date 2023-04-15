import { useState, useRef, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { trainServerSum, trainServerPage } from "@/services/product-performance-management/AED-program-performance"
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'

const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()
  
  const getData = async () => {
    await trainServerSum({
      ...form
    }).then(res => {
      setData(res.data)
    })
  }
  
  useEffect(()=> {
    getData()
  }, [form])

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总业绩金额',
      dataIndex: 'totalAmount',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '总下单用户数量',
      dataIndex: 'totalUsers',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '总销售订单数',
      dataIndex: 'totalOrder',
      render: _ => `${_ ? _ : 0}单`
    },
    {
      title: '销量数量',
      dataIndex: 'totalCount',
      render: _ => `${_ ? _ : 0}台`
    },
    {
      title: '团长人数',
      dataIndex: 'totalTeamLeaders',
      render: _ => `${_ ? _ : 0}人`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={5}
      bordered
      dataSource={data}
    />
  )
}

const TrainServicePackage: FC = () => {
  const form = useRef<FormInstance>()
  const [searchConfig, setSearchConfig] = useState<FormInstance>()

  const getFieldsValue = () => {
    const {payTime, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'buyerMobile',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    }, 
    {
      title: '关联保证金订单状态',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '关联保证金订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        1: '未关联保证金订单',
        2: '已关联保证金订单'
      },
      hideInTable: true
    },
    {
      title: '关联保证金订单签合同状态',
      dataIndex: 'contractId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime', 
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '子公司名称',
      dataIndex: 'subCompanyName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: 'purchaseCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'memberMobile',
      align: 'center'
    },
    {
      title: '团长手机号',
      dataIndex: 'teamLeaderMobile',
      align: 'center',
    },
    {
      title: '子公司类型',
      dataIndex: 'teamLeaderTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司类型',
      dataIndex: 'teamLeaderType',
      valueType: 'select',
      valueEnum: {
        1: '子公司',
        2: '非子公司'
      },
      hideInTable: true
    }
  ]

  return (
    <ProTable
      columns={columns}
      request={trainServerPage}
      formRef={form}   
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      onSubmit={()=>{
        setSearchConfig(form.current?.getFieldsValue())
      }}
      onReset={()=> {
        setSearchConfig(undefined)
      }}
      headerTitle={<Aggregate form={searchConfig}/>}
      options={false}
      search={{
        labelWidth: 160,
        optionRender: (searchConfig, props, dom) => [
          ...dom.reverse(),
          <Export 
            key='export'
            type='exportAEDTrainServerCommissionList'
            conditions={getFieldsValue}
          />
        ]
      }}
    />
  )
}

export default TrainServicePackage
