import React from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import ProCard from '@ant-design/pro-card'

const Detail = () => {

  const columns = [
    {
      title: '提现会员信息',
      dataIndex: ''
    },
    {
      title: '充值时间',
      dataIndex: ''
    },
    {
      title: '提现虚拟账户',
      dataIndex: ''
    },
    {
      title: '可提现余额',
      dataIndex: ''
    }
  ]
  return (
    <ProCard>
      <ProCard
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <ProCard title="左侧详情" colSpan="50%">
          <div style={{ height: 360 }}>左侧内容</div>
        </ProCard>
        <ProCard title="流量占用情况">
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>
    </ProCard>
  )
}

export default Detail
