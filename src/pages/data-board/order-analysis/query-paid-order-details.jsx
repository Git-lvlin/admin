import { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import { payOrderDetailQuery, wholeSaleOrderSubCompany } from '@/services/data-board/order-analysis'
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'

const QueryPaidOrderDetails = () => {
  const [company, setCompany] = useState()
  const formRef = useRef()

  useEffect(()=> {
    wholeSaleOrderSubCompany({}).then(res=>{
      if(res.code==0){
        const obj={}
        res.data.map(ele=>{
          obj[ele.operationsSubCompanyName]=ele.operationsSubCompanyName
        })
        setCompany(obj)
      }
    })
  },[])

  const columns = [
    {
      title: '订单类型',
      dataIndex: 'orders',
      align: 'center',
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
        30: 'B端新集约订单',
        91: 'B端普适品',
        92: 'B端精品生鲜',
        93: 'B端散装生鲜'
      }
    },
    {
      title: '订单支付时间',
      dataIndex: 'orderPaytime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单支付时间',
      dataIndex: 'orderPaytime',
      align: 'center',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '订单ID',
      dataIndex: 'orderID',
      align: 'center',
      hideInSearch: true
    },{
      title: '商品SKU',
      dataIndex: 'goodsSku',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      width: '10%'
    },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '购买数量',
      dataIndex: 'wholesaleNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '买家（会员昵称/社区店名称）',
      dataIndex: 'communityStoreName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '关联的运营中心',
      dataIndex: 'orderOperationsName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单区域',
      dataIndex: 'orderOreaName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInTable: true
    }, 
    {
      title: '运营中心名称',
      dataIndex: 'orderOperationsName',
      align: 'center',
      hideInTable: true
    }, 
    {
      title: '关联集约活动编号',
      dataIndex: 'wsID',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '集约活动编号',
      dataIndex: 'wsID',
      align: 'center',
      hideInTable: true
    },
    {
      title: '集约活动名称',
      dataIndex: 'wsName',
      align: 'center'
    },
    {
      title: '运营中心归属子公司',
      dataIndex: 'operationsSubCompanyName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '归属子公司',
      dataIndex: 'operationsSubCompanyName',
      align: 'center',
      valueType:'select',
      valueEnum: company,
      hideInTable:true,
    },

  ]

  const getFieldsValue = () => {
    const {orderPaytime, ...rest} = formRef.current?.getFieldsValue()
    return {
      startTime: orderPaytime?.[0].format("YYYY-MM-DD HH:mm:ss"),
      endTime: orderPaytime?.[1].format("YYYY-MM-DD HH:mm:ss"),
      ...rest
    }
  }

  return (
    <ProTable
      style={{marginTop: '20px'}}
      columns={columns}
      params={{}}
      formRef={formRef}
      scroll={{x: 'max-content'}}
      request={payOrderDetailQuery}
      revalidateOnFocus={false}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      headerTitle="已支付订单明细查询"
      search={{
        labelWidth: 100,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse(),
          <Export
            key="export"
            type="paydOrderDetail"
            conditions={getFieldsValue}
          />
        ]
      }}
    />
  )
}

export default QueryPaidOrderDetails
