import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import ProCard from '@ant-design/pro-card'
import moment from 'moment'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'

import PieChart from './pie-chart'
import TableSearch from './table-search'
import { getTimeDistance } from '@/utils/utils'
import styles from './styles.less'
import GcCascader from '@/components/gc-cascader'
import { timeGoodType, goodDetail } from '@/services/data-board/product-data'
import { amountTransform } from '@/utils/utils'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const ProductData = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('yesterday'))
  const [goodsData, setGoodsData] = useState([])
  const [pieData, setPieData] = useState([])
  const [payRate, setPayRate] = useState(0)
  const [orderType, setOrderType] = useState("15")
  const [loading, setLoading] = useState(false)
  const [visit, setVisit] = useState(false)
  const [state, setState] = useState(0)
  const form = useRef()

  const type = form.current?.getFieldsValue().orderType === '15'?'data-board-goods-detail-bc-export': 'data-board-goods-detail-c-export'

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
      title: ()=>(
        <Space>
          <span>支付商品数量</span>
          <Tooltip title="当前分类下有成交过的商品SKU数量">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'payCount',
      align: 'center'
    },
    {
      title: ()=>(
        <Space>
          <span>商品成交总数量</span>
          <Tooltip title="所有已支付订单中成交的商品件数总和">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'goodsSumNum',
      align: 'center'
    },
    {
      title: ()=> (
        <Space>
          <span>支付商品金额</span>
          <Tooltip title="当前分类下的商品，已支付商品金额总和">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
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
      title: ()=>(
        <Space>
          <span>商品复购率</span>
          <Tooltip title="当前商品有没有人重复购买复购率=重复下单的人数/下单的总人数">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'exportRepeatRatio',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType === "15",
      hideInSearch: true
    },
    {
      title: '商品成交总数量',
      dataIndex: 'goodsSumNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType === "15",
      hideInSearch: true
    },
    {
      title: '商品支付总金额',
      dataIndex: 'exportPayAmount',
      align: 'center',
      hideInSearch: true,
      hideInTable: form.current?.getFieldsValue().orderType === "15",
    },
    {
      title: '支付订单数',
      dataIndex: 'payNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType === "15",
      hideInSearch: true
    },
    {
      title: '支付用户数',
      dataIndex: 'payMemberNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType === "15",
      hideInSearch: true
    },
    {
      title: '商品退款数',
      dataIndex: 'refundNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType === "15",
      hideInSearch: true
    },
    {
      title: '商品退款总金额',
      dataIndex: 'exportRefundAmount',
      align: 'center',
      hideInSearch: true,
      hideInTable: form.current?.getFieldsValue().orderType === "15",
    },
    {
      title: '商品退款率',
      dataIndex: 'exportRefundRatio',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType === "15",
      hideInSearch: true
    },
    {
      title: '店主集采下单人数',
      dataIndex: 'bPayMemberNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: '店主集采订单数',
      dataIndex: 'bPayNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: '店主集采总金额',
      dataIndex: 'bExportPayAmount',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: '店主复购率',
      dataIndex: 'bExportRepeatRatio',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: 'C端下单支付人数',
      dataIndex: 'cPayMemberNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: 'C端支付订单数',
      dataIndex: 'cPayNum',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: 'C端支付总金额',
      dataIndex: 'cExportPayAmount',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: 'C端复购率',
      dataIndex: 'cExportRepeatRatio',
      align: 'center',
      hideInTable: form.current?.getFieldsValue().orderType !== "15",
      hideInSearch: true
    },
    {
      title: '商品类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        "2": '秒约商品',
        "15": '集约商品',
        "11": '1688商品'
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

  const getFieldValue = () => {
    const { date, gcId, ...rest } = form.current.getFieldsValue()
    return {
      startTime: date?.[0]?.format('YYYY-MM-DD'),
      endTime: date?.[1]?.format('YYYY-MM-DD'),
      gcId1: gcId?.[0],
      gcId2: gcId?.[1],
      ...rest
    }
  }

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
        <ProCard colSpan="30%">
          <PieChart data={pieData} payRate={payRate}/>
        </ProCard>
      </ProCard>
      <div className={styles.goodsTable}>
        <ProTable
          rowKey="id"
          columns={goodsDetail}
          formRef={form}
          params={{}}
          postData={ v => v?.map((item, idx) => ({id: idx, ...item})) }
          request={goodDetail}
          pagination={{
            showQuickJumper: true,
            pageSize: 10
          }}
          onSubmit= {()=>setState(state+1)}
          onReset={()=>setState(state+1)}
          search={{
            labelWidth: 120,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Export
                change={(e)=> {setVisit(e)}}
                key="export" 
                type={type}
                conditions={getFieldValue}
              />,
              <ExportHistory 
                key="export-history" 
                show={visit} setShow={setVisit}
                type={type}
              />
            ]
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
