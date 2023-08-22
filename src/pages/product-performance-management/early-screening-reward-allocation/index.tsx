import { useState, useEffect } from 'react'
import { Button, Radio } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'

const EarlyScreeningRewardAllocation: React.FC = () => {

  const data = [
    {
      type: '实物',
      name: '《你来我网》书籍',
      num: '1 本 /销售人',
      option: (
        <Radio.Group 
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

  const submit = () => {

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
        <Button type='primary' onClick={()=> submit}>保存</Button>
      </div>
    </PageContainer>
  )
}

export default EarlyScreeningRewardAllocation