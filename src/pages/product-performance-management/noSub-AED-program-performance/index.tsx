import { useRef } from 'react'
import ProTable from '@/components/pro-table'
import moment from 'moment'
import { PageContainer } from '@ant-design/pro-layout'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import { aednoSubOrder } from "@/services/product-performance-management/noSub-AED-program-performance"
import Export from '@/components/export'

const NoSubAEDProgramPerformance = () => {
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { payTime, ...rest } = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '下单人用户ID',
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '下单用户手机号',
      dataIndex: 'phoneNumber',
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
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: 'AED和保证金订单',
        2: '培训服务套餐订单',
        3: '3800订单',
        4: 'AED区县订单'
      }
    },
    {
      title: '收货人姓名',
      dataIndex: 'consignee',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: 'buyerNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
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
      title: '关联保证金单号',
      dataIndex: 'depositOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'rePhoneNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司ID',
      dataIndex: 'subId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属AED团长ID',
      dataIndex: 'teamId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      valueType: 'select',
      valueEnum: {
        1: '已学习',
        2: '未学习'
      },
      hideInTable: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      valueType: 'select',
      valueEnum: {
        1: '已通过',
        0: '未通过',
      },
      hideInTable: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '已签订',
        2: '未签订'
      },
      hideInTable: true
    },
    {
      title: '线下培训状态',
      dataIndex: 'offTrainStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '线下培训',
      dataIndex: 'offTrainStatus',
      valueType: 'select',
      valueEnum: {
        0: '未录入',
        1: '已培训',
        2: '未培训'
      },
      hideInTable: true
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable 
        columns={columns}
        params={{}}
        request={aednoSubOrder}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='aedNoSubOrder'
              conditions={getFieldsValue}
            />
          ]
        }}
        scroll={{x: 'max-content'}}
      />
    </PageContainer>
  )
}

export default NoSubAEDProgramPerformance