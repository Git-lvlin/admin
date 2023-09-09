import { useState, useRef } from 'react'
import { Button } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import { getOrderTypeListByParams } from '@/services/resource'
import Edit from './edit'

const AddOrderType: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: '子订单code',
      dataIndex: 'subCode',
      align: 'center',
      width: '40%'
    },
    {
      title: '子订单名称',
      dataIndex: 'subMsg',
      align: 'center',
      width: '40%'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: '20%',
      render: (_, r) => <a onClick={() => { setVisible(true); setId(r) }}>编辑</a>
    }
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        bordered
        request={getOrderTypeListByParams}
        params={{}}
        search={false}
        options={false}
        actionRef={actRef}
        toolBarRender= {()=> [
          <Button 
            key='add' 
            type='primary'
            onClick={()=> {setVisible(true); setId(undefined)}}
          >
            新建
          </Button>
        ]}
        paginationProps={false}
      />
      {
        visible &&
        <Edit 
          visible={visible}
          setVisible={setVisible}
          callback={()=> actRef.current?.reload()}
          id={id}
        />
      }
    </PageContainer>
  )
}

export default AddOrderType