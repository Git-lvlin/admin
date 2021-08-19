import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Radio, Spin } from 'antd'
import { history, useLocation } from 'umi'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import { moreTypeGmvSumYue, moreTypeSaleSumYue } from '@/services/data-board/data-board'
import { amountTransform } from '@/utils/utils'

const skipToOrder = () => {
  
}


const GMVDetail = () => {
  const [type, setType] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading ] = useState(false)
  const { query } = useLocation()

  const orderTypeChange = (e) => {
    setType(e.target.value)
  }
  
  const typeSale = () => {
    return query.isGMV === 'gmv' ? 'dayGmv' : 'daySale'
  }
  const typeOrder = () => {
    return query.isGMV === 'gmv' ? 'gmvOrderCount' : 'payCount'
  }
  const typeRadio = () => {
    return query.isGMV === 'gmv' ? 'GMV' : '销售额'
  }

  const columns = [
    {
      title: '销售额（￥/元）',
      dataIndex: typeSale(),
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '订单数',
      dataIndex: typeOrder(),
      align: 'center'
    },
    {
      title: '明细',
      dataIndex: 'option',
      align: 'center',
      render: ()=> <a onClick={()=> skipToOrder()}>查看</a>
    },
  ]
  
  useEffect(()=> {
    setLoading(true)
    if(query.isGMV === 'gmv'){
      moreTypeGmvSumYue({
        time: moment(Number(query.date)).format('YYYY-MM-DD'),
        type
      }).then(res=>{
        if(res.success){
          const obj = Array.isArray(res.data) ? res.data : [res.data]
          setData(obj)
        } else {
          setData([])
        }
      }).finally(()=> {
        setLoading(false)
      })
    } else {
      moreTypeSaleSumYue({
        time: moment(Number(query.date)).format('YYYY-MM-DD'),
        type
      }).then(res=>{
        if(res.success){
          const obj = Array.isArray(res.data) ? res.data : [res.data]
          setData(obj)
        } else {
          setData([])
        }
      }).finally(()=> {
        setLoading(false)
      })
    }
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
            label: `B端集约${typeRadio()}`,
            value: 1
          },
          {
            label: `C端集约${typeRadio()}`,
            value: 2
          },
          {
            label: `秒约${typeRadio()}`,
            value: 3
          },
          {
            label: `1688${typeRadio()}`,
            value: 4
          }
        ]}
      />
      <Spin spinning={loading}>
        <ProTable
          rowKey={ typeSale() }
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
