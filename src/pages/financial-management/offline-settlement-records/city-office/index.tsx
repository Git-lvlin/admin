import { Space } from 'antd'
import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
import Export from '@/components/export'
import ImportFile from '@/components/ImportFile'

const CityOffice = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key='1' tab='新集约批发单业绩'>
          <Space size={20} style={{background: '#fff', padding: '20px'}}>
            <Export
              type='financeOfflineSettle'
              text='财务导出业绩明细记录'
              conditions={{orderType: 'newCommandSalesOrder', tradeType: 'cityOfficeCommission'}}
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