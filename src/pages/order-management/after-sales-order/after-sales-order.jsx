import TimeSelect from '@/components/time-select'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@/components/pro-table'
import React, { useState } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { history } from 'umi'

import { refundOrder } from '@/services/order-management/after-sales-order'
import { amountTransform, getPageQuery } from '@/utils/utils'
import DrawerDetail from './detail'


const sourceType = {
  1: '待审核',
  2: '处理中',
  3: '已拒绝申请',
  4: '已拒绝退款',
  5: '已完成',
  6: '已关闭'
}

const afterSalesOrder = () => {
  const [visit, setVisit] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState()

  const columns = [
    {
      title: '售后编号',
      dataIndex: 'orderSn',
      align: 'center',
      order: 9,
      width: '10%',
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
      width: '10%',
      order: 8
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      align: 'center',
      order: -1,
      width: '5%',
      initialValue: getPageQuery()?.supplierId
    },
    {
      title: '商品编号',
      dataIndex: 'supplierSpuId',
      align: 'center',
      width: '5%'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      width: '7%',
      align: 'center'
    },
    {
      title: '平台ID',
      dataIndex: 'skuId',
      align: 'center',
      width: '7%',
      hideInSearch: true,
      render: (_, r) => (
        <>
          <div>skuid：{_}</div>
          <div>spuid：{r.spuId}</div>
        </>
      )
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      hideInTable: true
    },
    {
      title: '规格',
      dataIndex: 'goodsSpec',
      align: 'center',
      width: '10%',
      hideInSearch: true,
      render: (_)=> {
        if(_ && _ !== '-') {
          const res = JSON.parse(_)
          return res.map((item, idx)=> <div key={idx}>{item.key}：{item.value}</div>)
        } else {
          return _
        }
      }
    },
    {
      title: '数量',
      dataIndex: 'returnNum',
      align: 'center',
      width: '5%',
      hideInSearch: true
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      renderFormItem: () => <TimeSelect />,
      align: 'center',
      width: '7%',
      order: 5,
      render: (_, recodes) => moment(recodes?.applyTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '买家昵称',
      dataIndex: 'buyerNickname',
      align: 'center',
      width: '5%',
      order: 4
    },
    {
      title: '买家手机号',
      dataIndex: 'buyerPhone',
      align: 'center',
      order: 3
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      align: 'center'
    },
    {
      title: '商家名称',
      dataIndex: 'storeName',
      align: 'center',
      width: '5%',
      order: 2,
    },
    {
      title: '商家手机号',
      dataIndex: 'storePhone',
      align: 'center',
      width: "5%",
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
      width: '5%',
      order: 7
    },
    {
      title: '退款总金额（元）',
      dataIndex: 'returnAmount',
      align: 'center',
      width: '5%',
      hideInSearch: true,
      render: _ => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '退款状态',
      dataIndex: 'status',
      valueEnum: sourceType,
      valueType: 'select',
      align: 'center',
      width: '5%',
      order: 6
    },
    {
      title: '操作',
      dataIndex: 'operation',
      valueType: 'option',
      align: 'center',
      width: '5%',
      fixed: 'right',
      render: (_, record) => <a onClick={ ()=> {setVisible(true); setId(record.id)} }>查看详情</a>
    }
  ]
  
  return (
    <PageContainer title={false}>
      <ProTable 
        rowKey="orderSn"
        options={false}
        params={{}}
        request={refundOrder}
        scroll={{ x: 'max-content' , scrollToFirstRowOnChange: true, }}
        search={{
          defaultCollapsed: true,
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
            </Button>
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
      {
        visible&&
        <DrawerDetail
          visible={visible}
          setVisible={setVisible}
          id={id}
        />
      }
    </PageContainer>
  )
}

export default afterSalesOrder
