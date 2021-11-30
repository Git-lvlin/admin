import React, { useState } from 'react'
import ProTable from '@ant-design/pro-table'
import ProForm from '@ant-design/pro-form'

import styles from './style.less'
import Yuan from '../components/Yuan'
import { operationDailySummaryData } from '@/services/data-board/summary-of-data'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { Space } from 'antd'

const DataOverview = () => {
  const [visit, setVisit] = useState(false)

  const columns = [
    {
      title: '用户数据',
      align: 'center',
      children: [
        {
          title: '注册用户总数',
          dataIndex: 'registeredUsersNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        }
      ]
    },
    {
      title: '店主数据',
      align: 'center',
      children: [
        {
          title: '店主申请总数',
          dataIndex: 'applyCommunityStoreNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '审核通过的店主总数',
          dataIndex: 'passApplyNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '未审核通过的店主总数',
          dataIndex: 'notAuditStoreNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '已注销的店主总数',
          dataIndex: 'storeCancelNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '申请注销的店主总数',
          dataIndex: 'storeCancelNumNotAudit',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        }
      ]
    },
    {
      title: '集约数据',
      align: 'center',
      children: [
        {
          title: '店主集约总成交额',
          dataIndex: 'bTotalPay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '店主集约总订单数',
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
          title: '下单店主人数',
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
          title: '集约参与率',
          dataIndex: 'wsRat',
          align: 'center'
        },
        {
          title: '单个店主集约贡献成交额（元）',
          dataIndex: 'bAveragePay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: 'C端集约售卖总成交额',
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
        }
      ]
    },
    {
      title: '秒约数据',
      align: 'center',
      children: [
        {
          title: '秒约总成交额',
          dataIndex: 'cMiaoTotalPay',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '支付总订单数',
          dataIndex: 'cMiaoOrderNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '已完成且无售后的成交额',
          dataIndex: 'completedNotAfterSaleAmount',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '退货退款合计金额',
          dataIndex: 'refundsAmount',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '退款笔数',
          dataIndex: 'refundNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '下单并支付人数',
          dataIndex: 'cMiaoPayNum',
          align: 'center',
          render: (_)=><Yuan>{_}</Yuan>
        },
        {
          title: '下单人数',
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
    <div
      style={{
        backgroundColor: '#fff', 
        padding: 15,
        marginTop: 20
      }}
    >
      <ProForm
        style={{
          marginBottom: 20
        }}
        submitter={{
          render: () => {
            return (
              <Space size="small">
                <Export
                  change={(e)=> {setVisit(e)}}
                  key="export" 
                  type="data-board-operationDaily-SummaryData"
                  conditions={{
                    type:"export"
                  }}
                />
                <ExportHistory 
                  key="export-history" 
                  show={visit} setShow={setVisit}
                  type="data-board-operationDaily-SummaryData"
                />
              </Space>
            )
          }
        }}
        layout="inline"
      >
        <h3 className={styles.dataOverview}>数据总览</h3>
      </ProForm>
      <ProTable
        rowKey="registeredUsersNum"
        request={operationDailySummaryData}
        bordered
        columns={columns}
        search={false}
        toolBarRender={false}
        pagination={false}
      />
    </div>
  )
}

export default DataOverview
