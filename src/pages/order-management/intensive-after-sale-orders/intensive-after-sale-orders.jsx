import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import React, { useRef } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { refundOrder } from '@/services/order-management/intensive-after-sale-orders'
import './styles.less'

const columns = [
  {
    title: '售后编号',
    dataIndex: 'refundId',
    align: 'center',
    order: 9
  },
  {
    title: '订单编号',
    dataIndex: 'orderId',
    align: 'center',
    order: 8,
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
    dataIndex: 'buyerNickname',
    align: 'center',
    order: 4,
  },
  {
    title: '买家手机号',
    dataIndex: 'buyerPhone',
    align: 'center',
    order: 3
  },
  {
    title: '商家名称',
    dataIndex: 'businessName',
    align: 'center',
    order: 2
  },
  {
    title: '商家手机号',
    dataIndex: 'businessPhone',
    align: 'center',
    order: 1
  },
  {
    title: '售后类型',
    dataIndex: 'refundType',
    align: 'center',
    order: 7,
    valueType: 'select',
    valueEnum: {
      1: '退款',
      2: '退货退款'
    }
  },
  {
    title: '退款总金额（元）',
    dataIndex: 'refundTotalMoney',
    align: 'center',
    hideInSearch: true,
    render: (_) => amountTransform(_, '/').toFixed(2)
  },
  {
    title: '退款状态',
    dataIndex: 'refundStatus',
    align: 'center',
    order: 6,
    valueType: 'select',
    valueEnum: {
      1: '待审核,',
      2: '拒绝审核',
      3: '待退货',
      4: '待退款',
      5: '拒绝退款',
      6: '退款中',
      7: '已完成',
      8: '已关闭'
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    valueType: 'option',
    align: 'center',
    render: (_, record) => <a onClick={ () => {history.push(`/order-management/intensive-after-sale-orders/detail/${record?.refundId}`)} }>查看详情</a>
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
        rowKey="refundId"
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
          hideOnSinglePage: true,
          pageSize: 10
        }}
      />
    </PageContainer>
  )
}

export default afterSalesOrder
