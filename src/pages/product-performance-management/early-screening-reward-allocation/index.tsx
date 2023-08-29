import { useState, useEffect } from 'react'
import { Button, Radio, Spin } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import { getIpoConfig, setIpoConfig } from '@/services/product-performance-management/early-screening-reward-allocation'

const EarlyScreeningRewardAllocation: React.FC = () => {
  const [book, setBook] = useState()
  const [wine, setWine] = useState()
  const [vip, setVip] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    setLoading(true)
    getIpoConfig().then(res=> {
      if(res?.code === 0) {
        setBook(res.data?.book)
        setWine(res.data?.wine)
        setVip(res.data?.vip)
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [])

  const data = [
    {
      type: '实物',
      name: '《你来我网》书籍',
      num: '1 本 /销售人',
      option: (
        <Radio.Group 
          value={book}
          onChange={(e)=> {setBook(e.target.value)}}
          options={[
            {label: '每月满足条件，每月都给销售人奖励', value: 1},
            {label: '多月满足条件，销售人仅限领取1次', value: 2}
          ]}
        />
      )
    },
    {
      type: '实物',
      name: '红酒',
      num: '1 箱 /销售人',
      option: (
        <Radio.Group 
          value={wine}
          onChange={(e)=> {setWine(e.target.value)}}
          options={[
            {label: '每月满足条件，每月都给销售人奖励', value: 1},
            {label: '多月满足条件，销售人仅限领取1次', value: 2}
          ]}
        />
      )
    },
    {
      type: '服务',
      name: 'VIP权益',
      num: '1 年 /销售人',
      option: (
        <Radio.Group 
          value={vip}
          onChange={(e)=> {setVip(e.target.value)}}
          options={[
            {label: '每月满足条件，每月都给销售人奖励', value: 1},
            {label: '多月满足条件，销售人仅限领取1次', value: 2}
          ]}
        />
      )
    },
    {
      type: '权益',
      name: 'IPO股权',
      num: '200元 /单',
      option: '每月都可以领取'
    },
  ]

  const submit = async () => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      setIpoConfig({
        book, wine, vip
      }, {showSuccess: true}).then(res => {
        if(res?.code === 0) {
          resolve()
        } else {
          reject('设置失败，请重新设置')
        }
      })
    }).finally(()=> {
      setLoading(false)
    })
  }

  const column: ProColumns[] = [
    {
      title: '产品类型',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '产品数量/金额',
      dataIndex: 'num',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      width: '30%',
    }
  ]

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <ProTable
          bordered
          rowKey='name'
          columns={column}
          paginationProps={false}
          search={false}
          options={false}
          dataSource={data}
        />
        <div style={{textAlign: 'center', background: '#fff', paddingBottom: '10px'}}>
          <Button type='primary' onClick={async()=> await submit()}>保存</Button>
        </div>
      </Spin>
    </PageContainer>
  )
}

export default EarlyScreeningRewardAllocation