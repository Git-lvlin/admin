import { useState } from 'react'
import { ModalForm } from '@ant-design/pro-form'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type{ symptomListProps } from './data'

import { symptom } from '@/services/finger-doctor/health-detection-condition'

const SymptomList: FC<symptomListProps> = ({visible, setVisible}) => {
  // const [selectItems, setSelectItems] = useState([])

  return (
    <ModalForm
      title='请勾选要调理的症状：'
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      onFinish={async() => {
        // callback(selectItems)
        return true
      }}
    >
      <ProTable
        rowKey=''
        options={false}
        scroll={{y: 400}}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ]
        }}
        pagination={{
          pageSize: 10
        }}
        params={{}}
        request={symptom}
      />
    </ModalForm>
  )
}

export default SymptomList