import { useEffect, useState } from 'react'
import { Descriptions } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import { hpaScreen, hpaScreenStats } from '@/services/great-health-province/early-screening-order-performance'
import TimeSelect from '@/components/time-select'
import { amountTransform } from '@/utils/utils'
import Detail from './detail'

const EarlyScreeningOrderPerformance: React.FC = () => {
  const [data, setData] = useState<any>()
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState()

  useEffect(()=> {
    hpaScreenStats().then(res=> {
      if(res.code === 0) {
        setData(res.data)
      }
    })
  }, [])

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '大健康省代名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: 'AED早筛订单业绩',
      dataIndex: 'totalPayAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'time',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: 'AED早筛订单提成',
      dataIndex: 'totalCommissionDesc',
      render: (_, r) => <a onClick={()=> {setVisible(true); setId(r)}}>{_}</a>,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '业绩范围',
      dataIndex: 'scopeDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer>
      <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff', padding: '20px'}} column={3} layout="vertical" bordered>
        <Descriptions.Item  label="大健康省代数量">{data?.totalNum ?? 0}</Descriptions.Item>
        <Descriptions.Item  label="AED早筛订单业绩">{amountTransform(data?.payAmount, '/').toFixed(2)}</Descriptions.Item>
        <Descriptions.Item  label="AED早筛订单提成">{amountTransform(data?.commission, '/').toFixed(2)}</Descriptions.Item>
      </Descriptions>
      <ProTable
        rowKey='agencyId'
        columns={columns}
        options={false}
        search={{
          labelWidth: 110,
          optionRender: (search, props, dom) => [
            ...dom.reverse()
          ]
        }}
        params={{}}
        request={hpaScreen}
      />
      {
        visible &&
        <Detail
          setVisible={setVisible}
          visible={visible}
          msgDetail={id}
        />
      }
    </PageContainer>
  )
}

export default EarlyScreeningOrderPerformance