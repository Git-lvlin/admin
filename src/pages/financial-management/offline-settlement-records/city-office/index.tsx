import { useState } from 'react'
import { Space } from 'antd'
import ProCard from '@ant-design/pro-card'
import { Moment } from 'moment'

import PageContainer from '@/components/PageContainer'
import Export from '@/components/export'
import ImportFile from '@/components/ImportFile'
import TimeSelect from '@/components/time-select'

const CityOffice = () => {
  const [date, setDate] = useState<Moment[]>([])

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key='1' tab='新集约批发单业绩'>
          <div>
            业绩时段：
            <TimeSelect value={date} onChange={setDate}/>
          </div>
          <Space size={20} style={{background: '#fff', padding: '20px'}}>
            <Export
              type='financeOfflineSettle'
              text='财务导出指定时段业绩明细记录'
              conditions={{
                orderType: 'newCommandSalesOrder', 
                tradeType: 'cityOfficeCommission',
                startTime: date && date[0].format("YYYY-MM-DD HH:mm:ss"),
                endTime: date && date[1].format("YYYY-MM-DD HH:mm:ss")
              }}
            />
            <ImportFile
              code='financeOfflineImpSettle'
              title='财务导入业绩明细结算记录'
            />
          </Space>
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default CityOffice