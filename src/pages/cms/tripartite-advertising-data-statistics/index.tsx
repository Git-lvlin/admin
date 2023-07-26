import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { positionStats } from "@/services/cms/tripartite-advertising-data-statistics"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"
import { amountTransform } from '@/utils/utils'
import { Tooltip, Image } from 'antd'
import { history } from 'umi'

export default function TransactionData () {
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const getFieldValue = (searchConfig: any) => {
    const { dateRange = [], ...rest }=searchConfig.form.getFieldsValue()
    return {
      startTime: dateRange[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }

  const tableColumns: ProColumns[] = [
    {
      title: '广告ID',
      dataIndex:'id',
      hideInSearch: true
    },
    {
      title: '前端位置',
      dataIndex: 'title',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <Tooltip 
          placement="right"
          title={
            <Image src={r.thumb}/>
          }
        >
          <a>{_}</a>
        </Tooltip>
      )
    },
    {
      title: '展示时段',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '广告类型',
      dataIndex: 'adType',
      align: 'center',
      valueEnum: {
        'SplashAd': '开屏广告',
        'BannerAd': '横幅广告',
        'InterstitialAd': '插屏广告',
        'RewardVideoAd': '激励视频广告',
        'KUAISHOU': '快手短视频广告',
        'DrawVideoAd': 'Draw视频广告',
        'NativeExpressAd': '原生广告'
      },
      fieldProps: {
        placeholder: '请选择广告类型'
      },
      hideInTable: true
    },
    {
      title: '广告类型',
      dataIndex: 'adTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '曝光量',
      dataIndex: 'exposureNums',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '人均曝光量',
      dataIndex: 'avgExposure',
      hideInSearch: true
    },
    {
      title: '人均点击量',
      dataIndex: 'avgClick',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取红包数量',
      dataIndex: 'redPacketNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取红包面额',
      dataIndex: 'redPacketAmount',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        if(data.redPacketNum){
          return <a onClick={()=>{ history.push(`/cms/coupon-management/coupon-list?redPacketId=${data.redPacketId}`) }}>红包详情</a>
        }
      }
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={positionStats}
        columnEmptyText={false}
        actionRef={form}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'advPositionStats'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'advPositionStats'}/>
          ],
        }}
      />
    </PageContainer>
  )
}