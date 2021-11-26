import React from 'react'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import Yuan from '../components/Yuan'
import { dailyDataOverview } from '@/services/data-board/summary-of-data'

const DailyDataOverview = () => {

  const columns = [
    {
      title: '日期',
      dataIndex: 'dateTimes',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '日期范围',
      dataIndex: 'dateTime',
      align: 'center',
      valueType: 'dateRange',
      initialValue: [moment(+new Date()).format('YYYY-MM-DD'), moment(+new Date()).format('YYYY-MM-DD')],
      fieldProps: {
        
      },
      hideInTable: true
    },
    {
      title: '用户数据',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: '当天新增注册用户数',
          dataIndex: 'newAddCt',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天APP DAU',
          dataIndex: 'appDau',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天店主申请数量',
          dataIndex: 'applyCommunityStoreNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天审核通过的店主数量',
          dataIndex: 'passApplyNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天未审核通过的店主数量',
          dataIndex: 'notAuditStoreNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天已注销的店主数量',
          dataIndex: 'storeCancelNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天申请注销的店主数量',
          dataIndex: 'storeCancelNumNotAudit',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        }
      ]
    },
    {
      title: '集约数据',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: '当天店主集约总额',
          dataIndex: 'bTotalPay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天店主集约总订单数',
          dataIndex: 'bOrderNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '店主已支付订单数',
          dataIndex: 'bOrderPayNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天下单店主人数',
          dataIndex: 'bOrderStoreNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '下单且已支付的店主人数',
          dataIndex: 'bPayStoreNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天集约参与率',
          dataIndex: 'wsRat',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '单个店主集约贡献成交额（元）',
          dataIndex: 'bAveragePay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: 'C端集约售卖成交额',
          dataIndex: 'cTotalPay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: 'C端支付总订单数',
          dataIndex: 'cOrderPayNum',
          align: 'center',
        },
        {
          title: 'C端总订单数',
          dataIndex: 'cOrderNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: 'C端下单人数',
          dataIndex: 'cWholesaleOrderUserNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: 'C端下单且已支付人数',
          dataIndex: 'cWholesalePayUserNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '单个店主C端贡献成交额（元）',
          dataIndex: 'cAveragePay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
      ]
    },
    {
      title: '秒约数据',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: '当天秒约成交额',
          dataIndex: 'cMiaoTotalPay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天支付订单数',
          dataIndex: 'cMiaoOrderNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天已完成且无售后的成交额',
          dataIndex: 'completedNotAfterSaleAmount',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天退货退款合计金额',
          dataIndex: 'cMiaoOrderNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天退款笔数',
          dataIndex: 'refundNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天下单并支付人数',
          dataIndex: 'cMiaoPayNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '当天下单人数',
          dataIndex: 'cMiaoUserNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '单个用户贡献成交额',
          dataIndex: 'cMiaoAveragePay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        }
      ]
    },
    {
      title: '平台',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: '总成交额',
          dataIndex: 'platformPayTotal',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        }
      ]
    }
  ]

  return (
    <ProTable
      style={{
        backgroundColor: '#fff', 
        padding: 15,
        marginTop: 20
      }}
      rowKey="dateTimes"
      request={dailyDataOverview}
      params={{}}
      headerTitle="每日数据概况"
      bordered
      columns={columns}
      toolbar={{
        settings: false
      }}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
    />
  )
}

export default DailyDataOverview
