import ProForm, { ProFormRadio } from '@ant-design/pro-form'

import PageContainer from '@/components/PageContainer'

const AdvertConfig = () => {
  return (
    <PageContainer>
      <ProForm
        style={{
          background: '#fff',
          padding: '20px'
        }}
        layout='horizontal'
        onFinish={async()=> {

        }}
        submitter={{
          searchConfig: {
            resetText: false
          }
        }}
      >
        <ProFormRadio.Group
          label='广告是否展示'
          name=''
          options={[
            {label: '展示', value: ''},
            {label: '不展示', value: ''},
          ]}
        />
      </ProForm>
    </PageContainer>
  )
}

export default AdvertConfig