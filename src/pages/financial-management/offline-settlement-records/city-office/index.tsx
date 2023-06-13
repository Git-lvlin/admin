import { Space } from 'antd'

import PageContainer from '@/components/PageContainer'
import Export from '@/components/export'
import ImportFile from '@/components/ImportFile'

const CityOffice = () => {
  return (
    <PageContainer>
      <Space size={20} style={{background: '#fff', padding: '20px'}}>
        <Export
          type='financeOfflineSettle'
          text='财务导出业绩明细记录'
        />
        <ImportFile
          code='financeOfflineImpSettle'
          title='财务导入业绩明细结算记录'
        />
      </Space>
    </PageContainer>
  )
}

export default CityOffice