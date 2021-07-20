import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import React, { useRef, useEffect, useState} from 'react'
import XLSX from 'xlsx'
import { Button } from 'antd'
import moment from 'moment'
import { history } from 'umi'

import { refundOrder } from '@/services/order-management/after-sales-order'
import { amountTransform } from '@/utils/utils'
import './styles.less'


const sourceType = {
  1: '待审核',
  2: '处理中',
  3: '已拒绝申请',
  4: '已拒绝退款',
  5: '已完成',
  6: '已关闭'
}

const columns = [
  {
    title: '售后编号',
    dataIndex: 'orderSn',
    align: 'center',
    order: 9,
    render: (_, records) => {
      return(
        <>
          <div>{ records?.orderSn }</div>
          <div>
            { 
              records?.platformInvolved === 1&& 
              <span 
                style={{
                  background: 'rgba(250, 205, 145, 1)', 
                  fontSize: 12,
                  padding: 4,
                  borderRadius: 5
                }}
              >
                平台已介入
              </span> 
            }
          </div>
        </>
      )
    }
  },
  {
    title: '订单编号',
    dataIndex: 'subOrderSn',
    align: 'center',
    order: 8
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    valueType: 'dateTimeRange',
    align: 'center',
    order: 5,
    render: (_, recodes) => moment(recodes?.applyTime).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '买家昵称',
    dataIndex: 'userNickname',
    align: 'center',
    order: 4
  },
  {
    title: '买家手机号',
    dataIndex: 'buyerPhone',
    align: 'center',
    order: 3
  },
  {
    title: '商家名称',
    dataIndex: 'storeName',
    align: 'center',
    order: 2,
  },
  {
    title: '商家手机号',
    dataIndex: 'storePhone',
    align: 'center',
    order: 1,
  },
  {
    title: '售后类型',
    dataIndex: 'afterSalesType',
    valueType: 'select',
    valueEnum: {
      1: '仅退款',
      2: '退款退货'
    },
    align: 'center',
    order: 7
  },
  {
    title: '退款总金额（元）',
    dataIndex: 'returnAmount',
    align: 'center',
    hideInSearch: true,
    render: (_) => amountTransform(_, '/').toFixed(2)
  },
  {
    title: '退款状态',
    dataIndex: 'status',
    valueEnum: sourceType,
    valueType: 'select',
    align: 'center',
    order: 6
  },
  {
    title: '操作',
    dataIndex: 'operation',
    valueType: 'option',
    align: 'center',
    render: (_, record) => <a onClick={ () => {history.push(`/order-management/after-sales-order/detail/${record?.id}`)} }>查看详情</a>
  }
]
// function saleType(val) {
//   switch(val) {
//     case 1: 
//       return  '仅退款';
//     case 2:
//       return '退款退货'
//   }
// }
// function saleStatus(val) {
//   switch(val) {
//     case 1: 
//       return '待审核';
//     case 2:
//       return '处理中';
//     case 3:
//       return '已拒绝申请';
//     case 4:
//       return '已拒绝退款';
//     case 5:
//       return '已完成';
//     case 6:
//       return '已关闭';
//   }
// }

// const exportExcel = val => {
//   const data = val.map(data=> {
//     return {
//       orderSn: data.orderSn,
//       subOrderSn: data.subOrderSn,
//       applyTime: moment(data.applyTime).format('YYYY-MM-DD HH:mm:ss'),
//       userNickname: data.userNickname,
//       buyerPhone: data.buyerPhone,
//       storeName: data.storeName,
//       storePhone: data.storePhone,
//       afterSalesType: saleType(data.afterSalesType),
//       returnAmount: amountTransform(data.returnAmount, '/'),
//       status: saleStatus(data.status)
//     }
//   })
//   const ws = XLSX.utils.json_to_sheet(
//     [
//       {
//         orderSn: '售后编号',
//         subOrderSn: '订单编号',
//         applyTime: '申请时间',
//         userNickname: '买家昵称',
//         buyerPhone: '买家手机号',
//         storeName: '商家名称',
//         storePhone: '商家手机号',
//         afterSalesType: '售后类型',
//         returnAmount: '退款总金额（元）',
//         status: '退款状态'
//       },
//       ...data
//     ],
//     {
//       header: [
//         'orderSn',
//         'subOrderSn',
//         'applyTime',
//         'userNickname',
//         'buyerPhone',
//         'storeName',
//         'storePhone',
//         'afterSalesType',
//         'returnAmount',
//         'status'
//       ],
//       skipHeader: true
//     }
//   )
//   const wb = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(wb, ws, "file")
//   XLSX.writeFile(wb, `售后订单${+new Date()}.xlsx`)
// }
const afterSalesOrder = () => {
  const actionRef = useRef()
  // const [data, setData] = useState([])
  // useEffect(()=> {
  //   refundOrder({size: 9999999999}).then(res=> {
  //     if(res.success) {
  //       setData(res.data)
  //     }
  //   })
  //   return ()=> {
  //     setData([])
  //   }
  // }, [])

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="orderSn"
        options={false}
        params={{}}
        request={refundOrder}
        actionRef={actionRef}
        search={{
          optionRender: ({searchText, resetText}, {form}) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
            // <Button key="out" onClick={()=> {exportExcel(data)}}>导出</Button>
          ],
        }}
        headerTitle="数据列表"
        columns={columns}
        pagination={{
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
      />
    </PageContainer>
  )
}

export default afterSalesOrder
