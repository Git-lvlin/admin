import React, { useState, useEffect } from 'react'
import ProTable from "@ant-design/pro-table"
import { Tooltip, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { orderAnalysis } from '@/services/data-board/order-analysis'

const OrderTransactionData = ({timeSelect, time, status}) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if(status !== 2 && time?.[1].diff(time?.[0], 'days') >= 7) {
      return false
    } else {
      orderAnalysis({
        startTime: time[0]?.format('YYYY-MM-DD HH:mm:ss'), 
        endTime: time[1]?.format('YYYY-MM-DD HH:mm:ss')
      }).then(res => {
        if(res.success) setTableData(res.data)
      })
    }
    return () => {
      setTableData([])
    }
  }, [status, time])

  const columns = [
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        1: '普通订单',
        2: '秒约订单',
        3: '拼团订单',
        11: '1688订单',
        15: 'C端集约订单',
        17: '盲盒订单',
        18: '签到订单',
        22: '样品订单',
        91: 'B端普适品',
        92: 'B端精品生鲜',
        93: 'B端散装生鲜',
        100: '合计'
      },
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>总交易额</span>
          <Tooltip title="包含未支付订单，不含售后订单">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalAmount',
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>总成交额</span>
          <Tooltip title="不含未支付订单，只统计已支付的">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalPay',
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>总订单数</span>
          <Tooltip title="包含未支付订单，不含售后订单">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalOrdersNum',
      align: 'center'
    },   
    {
      title: '已支付订单数',
      dataIndex: 'payOrdersNum',
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>下单总人数</span>
          <Tooltip title="含未支付订单">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'orderUserNum',
      align: 'center'
    },
    {
      title: '下单且支付总人数',
      dataIndex: 'orderPayUserNum',
      align: 'center'
    },
    {
      title: '退款笔数',
      dataIndex: 'refundNum',
      align: 'center'
    },
    {
      title: '退款总额',
      dataIndex: 'refundAmount',
      align: 'center'
    }
  ]

  return (
    <ProTable
      rowKey="orderType"
      columns={columns}
      dataSource={tableData}
      bordered
      search={false}
      pagination={false}
      toolbar={{
        title: '订单交易数据',
        settings: false,
        subTitle: timeSelect
      }}
    />
  )
}

export default OrderTransactionData