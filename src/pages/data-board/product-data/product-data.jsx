import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import ProCard from '@ant-design/pro-card'
import moment from 'moment'

import PieChart from './pie-chart'
import TableSearch from './table-search'
import { getTimeDistance } from '@/utils/utils'
import styles from './styles.less'
import GcCascader from '@/components/gc-cascader'
import { timeGoodType } from '@/services/data-board/product-data'

const ProductData = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('yesterday'))
  const [goodsClass, setGoodsClass] = useState([])
  const [pieData, setPieData] = useState([])

  useEffect(()=> {
    timeGoodType({
      startTime: moment(rangePickerValue?.[0]).format("YYYY-MM-DD"),
      endTime: moment(rangePickerValue?.[1]).format("YYYY-MM-DD")
    }).then(res=> {
      setGoodsClass(res?.data?.detailList)
      setPieData(res?.data?.payRateList)
    })
    return ()=> {
      setGoodsClass([])
      setPieData([])
    }
  }, [rangePickerValue])

  const isActive = (type) => {
    if (!rangePickerValue) {
      return ''
    }

    const value = getTimeDistance(type);

    if (!value) {
      return ''
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return ''
    }

    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate
    }

    return ''
  }

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value)
  }

  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type))
  }

  const goodsCategory = [
    {
      title: '分类名称',
      dataIndex: 'gcName',
      align: 'center'
    },
    {
      title: '支付商品数量',
      dataIndex: 'payCount',
      align: 'center'
    },
    {
      title: '支付商品金额',
      dataIndex: 'payAmount',
      align: 'center'
    },
    {
      title: '退款商品数量',
      dataIndex: 'returnNum',
      align: 'center'
    },
    {
      title: '退款商品金额',
      dataIndex: 'returnAmount',
      align: 'center'
    },
    {
      title: '退款率',
      dataIndex: 'refundRate',
      align: 'center'
    }
  ]

  const goodsDetail = [
    {
      title: '商品编码',
      dataIndex: 'a',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'd',
      align: 'center'
    },
    {
      title: '规格',
      dataIndex: 'f',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品复购率',
      dataIndex: 'g',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付商品数',
      dataIndex: 'h',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品支付总金额',
      dataIndex: 'j',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付用户数',
      dataIndex: 'k',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品退款数',
      dataIndex: 'v',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品退款总金额',
      dataIndex: 'x',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品退款率',
      dataIndex: 'z',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品类型',
      dataIndex: 'l',
      valueType: 'select',
      valueEnum: {
        0: '秒约商品',
        1: '集约商品',
        2: '代发商品'
      },
      align: 'center',
      hideInTable: true
    },
    {
      title: '统计时间范围',
      dataIndex: 'i',
      valueType: 'dateTimeRange',
      align: 'center',
      hideInTable: true
    },
    {
      title: '商品分类',
      dataIndex: 'e',
      renderFormItem: () => (<GcCascader />),
      align: 'center',
      hideInTable: true
    }
  ]

  return (
    <PageContainer title={false}>
      <TableSearch 
        rangePickerValue={rangePickerValue}
        isActive={isActive}
        handleRangePickerChange={handleRangePickerChange}
        selectDate={selectDate}
      />
      <ProCard split="vertical">
        <ProCard colSpan="70%" ghost>
          <ProTable
            rowKey="gcName"
            columns={goodsCategory}
            dataSource={goodsClass}
            pagination={false}
            search={false}
            toolBarRender={false}
          />
        </ProCard>
        <ProCard
          bordered
        >
          <PieChart data={pieData}/>
        </ProCard>
      </ProCard>
      <ProTable
        rowKey=""
        columns={goodsDetail}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 120
        }}
        headerTitle="商品明细数据"
        toolbar={{
          settings: false
        }}
      />
    </PageContainer>
  )
}

export default ProductData
