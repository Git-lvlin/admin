import ProForm, { ProFormDigit } from '@ant-design/pro-form'
import { Row, Col, Button } from 'antd'

import PageContainer from '@/components/PageContainer'

const IntensivePurchaseSetting = () => {
  return (
    <PageContainer>
      <ProForm
        onFinish={async(v)=>{
          console.log(v);
          
        }}
        style={{
          background: '#FFF',
          padding: 20
        }}
        submitter={{
          render: (props, doms) => (
            <Row>
              <Col span={14} offset={5}>
                <Button
                  key='ok'
                  type='primary'
                  onClick={()=>{
                    props?.submit()
                  }}
                >
                  保存
                </Button>
              </Col>
            </Row>
          )
        }}
        layout='horizontal'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        
      >
        <ProFormDigit
          label="最低采购量"
          name="a"
          fieldProps={{
            addonAfter: '款',
            placeholder: '请输入最低采购量'
          }}
          validateFirst
          rules={[
            () => ({
              validator(_, value) {
                const reg = /^((0)|([1-9][0-9]*))$/
                if (!reg.test(value)) {
                  return Promise.reject(new Error('请输入整数'))
                }
                return Promise.resolve()
              },
            }),
            {required: true}
          ]}
          width="md"
        />
        <ProFormDigit
          label="最低采购金额"
          name="b"
          width="md"
          fieldProps={{
            addonAfter: '元',
            placeholder: '请输入最低采购金额'
          }}
          rules={[{required: true}]}
        />
      </ProForm>
    </PageContainer>
  )
}

export default IntensivePurchaseSetting
