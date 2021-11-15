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
import { timeGoodType, goodDetail } from '@/services/data-board/product-data'
import { amountTransform } from '@/utils/utils'

const ProductData = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('yesterday'))
  const [goodsData, setGoodsData] = useState([])
  const [pieData, setPieData] = useState([])
  const [payRate, setPayRate] = useState(0)
  const [orderType, setOrderType] = useState("15")
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    setLoading(true)
    timeGoodType({
      startTime: moment(rangePickerValue?.[0]).format("YYYY-MM-DD"),
      endTime: moment(rangePickerValue?.[1]).format("YYYY-MM-DD"),
      orderType
    }).then(res=> {
      setPieData(res?.data?.payRateList)
      setGoodsData(res?.data?.detailList)
      setPayRate(Number(res?.data?.payRateList?.reduce((acc, cur) => acc + cur.payCount, 0)))
    }).finally(()=> {
      setLoading(false)
    })
    return ()=> {
      setGoodsData([])
      setPieData([])
    }
  }, [rangePickerValue, orderType])

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
      align: 'center',
      render: (_) => amountTransform(Number(_), '/')
    },
    {
      title: '退款商品数量',
      dataIndex: 'returnNum',
      align: 'center'
    },
    {
      title: '退款商品金额',
      dataIndex: 'returnAmount',
      render: (_) => amountTransform(Number(_), '/'),
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
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '商品编码',
      dataIndex: 'spuId',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      width: '15%'
    },
    {
      title: '规格',
      dataIndex: 'skuName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品复购率',
      dataIndex: 'repeatRatio',
      align: 'center',
      render: (_) => `${amountTransform(_, '*')}%`,
      hideInSearch: true
    },
    {
      title: '支付商品数',
      dataIndex: 'payNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品支付总金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => `￥${amountTransform(Number(_), '/')}`
    },
    {
      title: '支付用户数',
      dataIndex: 'payMemberNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品退款数',
      dataIndex: 'refundNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品退款总金额',
      dataIndex: 'refundAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => `￥${amountTransform(Number(_), '/')}`
    },
    {
      title: '商品退款率',
      dataIndex: 'refundRatio',
      align: 'center',
      render: (_) => `${amountTransform(_, '*')}%`,
      hideInSearch: true
    },
    {
      title: '商品类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        "2": '秒约商品',
        "15": '集约商品',
        "11": '代发商品'
      },
      align: 'center',
      initialValue: "2",
      fieldProps:{
        allowClear: false
      },
      hideInTable: true
    },
    {
      title: '统计时间范围',
      dataIndex: 'date',
      valueType: 'dateRange',
      align: 'center',
      initialValue: getTimeDistance("week"),
      hideInTable: true
    },
    {
      title: '商品分类',
      dataIndex: 'gcId',
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
        selectType={setOrderType}
      />
      <ProCard split="vertical" loading={loading}>
        <ProCard colSpan="70%" ghost>
          <ProTable
            rowKey="gcName"
            columns={goodsCategory}
            dataSource={goodsData}
            pagination={false}
            search={false}
            toolBarRender={false}
          />
        </ProCard>
        <ProCard>
          <PieChart data={pieData} payRate={payRate}/>
        </ProCard>
      </ProCard>
      <div className={styles.goodsTable}>
        <ProTable
          rowKey="id"
          columns={goodsDetail}
          params={{}}
          postData={ v => v?.map((item, idx) => ({id: idx, ...item})) }
          request={goodDetail}
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
      </div>
    </PageContainer>
  )
}

export default ProductData
