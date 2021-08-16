import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Radio, Spin } from 'antd'
import { history, useLocation } from 'umi'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import { findMoreYueGmv } from '@/services/data-board/data-board'

const skipToOrder = (e) => {
  console.log(e);
}

const columns = [
  {
    title: '销售额（￥/元）',
    dataIndex: 'daySale',
    align: 'center'
  },
  {
    title: '订单数',
    dataIndex: 'gmvOrderCount',
    align: 'center'
  },
  {
    title: '明细',
    dataIndex: 'option',
    align: 'center',
    render: (_, records)=> <a onClick={()=> skipToOrder(records)}>查看</a>
  },
]

const GMVDetail = () => {
  const [type, setType] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading ] = useState(false)
  const orderTypeChange = (e) => {
    setType(e.target.value)
  }
  const { query } = useLocation()
  useEffect(()=> {
    setLoading(true)
    findMoreYueGmv({
      startTime: moment(Number(query.date)).format('YYYY-MM-DD'),
      endTime: moment(+new Date()).format('YYYY-MM-DD'),
      type
    }).then(res=>{
      if(res.success){
        setData(res.data)
      } else {
        setData([])
      }
    }).finally(()=> {
      setLoading(false)
    })
    return ()=> {
      setData([])
    }
  }, [type])
  return (
    <PageContainer title={false}>
      <Radio.Group
        buttonStyle="solid"
        optionType="button"
        size="large"
        value={type}
        onChange={orderTypeChange}
        options={[
          {
            label: 'B端集约GMV',
            value: 1
          },
          {
            label: 'C端集约GMV',
            value: 2
          },
          {
            label: '秒约GMV',
            value: 3
          },
          {
            label: '1688GMV',
            value: 4
          }
        ]}
      />
      <Spin spinning={loading}>
        <ProTable
          rowKey='daySale'
          search={false}
          toolBarRender={false}
          toolbar={false}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </Spin>
      <Button 
        type="primary"
        onClick={()=>history.goBack()}
      >
        返回
      </Button>
    </PageContainer>
  )
}

export default GMVDetail
