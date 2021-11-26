import React, { useEffect, useState, useRef } from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import { Button, Space, Progress, Drawer } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { amountTransform } from '@/utils/utils'
import { orderPageDetail } from "@/services/financial-management/transaction-detail-management"
import { createExportTask, findById } from "@/services/export-excel/export-template"
import styles from './styles.less'
import './styles.less'

const OrderPayDetailPopup = ({ id, visible, setVisible }) => {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState(null)
  const [payInfos, setPayInfos] = useState([]) 
  const [data, setData] = useState(null)
  const [down, setDown] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [process, setProcess] = useState(0)
  const timer = useRef()

  useEffect(()=>{
    setLoading(true)
    orderPageDetail({orderNo: id}).then(res=> {
      if(res.success) {
        setInfo(res?.data?.info)
        setPayInfos(res?.data?.payInfos)
      }
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setInfo([])
      setPayInfos([])
    }
  }, [id])

  const downTrade = (e) => {
    createExportTask({
      code: 'financial-huifu-payment-export',
      fileName: 'financial-huifu-payment-export' + +new Date() + '.xlsx',
      queryParamStr: JSON.stringify({orderNo: e.payNo})
    }).then(res => {
      setDown(true)
      setTaskId(res.data.taskId)
    })
  }

  const getData = () => {
    findById({
      id: taskId
    }).then(res => {
      setProcess(res.data.process)
      if(res.data.fileUrl) {
        setDown(false)
        setIsDown(true)
        setData(res.data)
      }
    })
  }

  useEffect(()=> {
    clearInterval(timer.current)
    if(down) {
      timer.current = setInterval(()=> {
        getData()
      }, 500)
    }
    return ()=> {
      clearInterval(timer.current)
      setData({})
    }
  }, [taskId, down])

  const fashionableType =(data, amount, fee) =>{
    switch(data){
      case 'goodsAmount':
        return (
          <>
            <span className={styles.amount}>货款: ¥{amountTransform(amount, '/')}</span>
            <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'commission':
        return (
          <>
            <span className={styles.amount}>店主收益: ¥{amountTransform(amount, '/')}</span>
            <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'platformCommission':
        return (
          <>
            <span className={styles.amount}>平台收益: ¥{amountTransform(amount, '/')}</span>
            <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'suggestCommission':
        return (
          <>
            <span className={styles.amount}>上级推荐人收益: ¥{amountTransform(amount, '/')}</span>
            <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'agentCompanyCommission':  
        return (
          <>
            <span className={styles.amount}>运营商收益: ¥{amountTransform(amount, '/')}</span>
            <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      case 'freight':
        return (
          <>
            <span className={styles.amount}>运费: ¥{amountTransform(amount, '/')}</span>
            <span>交易通道费: ¥{amountTransform(fee, '/')}</span>
          </>
        )
      default:
        return ''
    }
  }

  const DownExport = () => {
    if(isDown) {
      return <a href={data?.fileUrl}>下载</a>
    } else if(process !== 100 && down){
      return (
        <div style={{ width: 170 }}>
          <Progress percent={process} size='small'/>
        </div>
      )
    } else if(data?.state === 3 && !down){
      return (
        <Tooltip title={data?.exceptionDes}>
          <span className={styles.fail}>导出失败</span>
        </Tooltip>
      )
    } else {
      return ''
    }
  }

  const columns1 = [
    {
      title: '订单号',
      dataIndex: 'orderNo'
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        'second': '秒约',
        'commandSalesOrder': '集约批发订单',
        'dropShipping1688': '1688代发订单',
        'commandCollect': '集约销售订单',
        'blindBox': '盲盒订单',
        'signIn': '签到订单'
      }
    },
    {
      title: '买家会员类型',
      dataIndex: 'buyerType'
    },
    {
      title: (_) => _.dataIndex ? '店铺提成比例' : '',
      dataIndex: info?.storeCommissionRatio ? 'storeCommissionRatio' : '',
      render: (_) => _ ? <span>{amountTransform(_, '*')}%</span> : '',
    },
    {
      title: '买家会员信息',
      dataIndex: 'buyerMobile'
    },
    {
      title: '虚拟子账户',
      dataIndex: 'buyerSn'
    },
    {
      title: '卖家会员类型',
      dataIndex: 'sellerType'
    },
    {
      title: '',
      dataIndex: ''
    },
    {
      title: '卖家会员信息',
      dataIndex: 'sellerMobile'
    },
    {
      title: '虚拟子账户',
      dataIndex: 'sellerSn'
    }
  ]

  const columns2 = [
    {
      title: '商品名称',
      dataIndex: 'goodsName'
    },
    {
      title: '购买规格',
      dataIndex: 'skuName'
    },
    {
      title: '商品供货价',
      dataIndex: 'supplyPrice',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '实际销售价',
      dataIndex: 'salePrice',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title:(_)=> _.dataIndex === 'preCount' ? '预定数量' : '购买数量',
      dataIndex: info?.orderType === 'commandSalesOrder' ? 'preCount' : 'paidCount'
    },
    {
      title: (_) => _.dataIndex ? '实际采购数量' : '',
      dataIndex: info?.orderType === 'commandSalesOrder' ? 'paidCount' : ''
    },
    {
      title: '运费',
      dataIndex: 'freight',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '',
      dataIndex: ''
    }
  ]

  const columns3 = [
    {
      title: '支付阶段',
      dataIndex: 'stageName'
    },
    {
      title: '支付时间',
      dataIndex: 'payTime'
    },
    {
      title: '支付渠道',
      dataIndex: 'payTpyeName'
    },
    {
      title: '',
      dataIndex: ''
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      render: (_) => `¥${amountTransform(_, '/').toFixed(2)}`
    },
    {
      title: '虚拟分账计算',
      dataIndex: 'divideInfo',
      render: (_, data)=> (
        <>
          {
            data?.divideInfos?.map(item=> (
              <div key={item?.type}>
                {fashionableType(item?.type, item?.amount, item?.fee)}
              </div>
            ))
          }
        </>
      )
    },
    {
      title: '支付单号',
      dataIndex: 'payNo',
      render: (_, records) => (
        <>
          <Space size='large'>
            <span>{_}</span>
            {
              _?
              <Button 
                onClick={
                  ()=> downTrade(records)
                }
                disabled={down}
                type='primary'
              >
                {
                  down&&
                  <LoadingOutlined />
                }
                导出汇付交易单
              </Button>:
              '-'
            }
            <DownExport />
          </Space>
        </>
      )
    },
    {
      title: '资金流水号',
      dataIndex: 'transcationId'
    }
  ]

  const columns4 = [
    {
      title: '汇能虚拟户（佣金户）',
      dataIndex: 'platformAccountSn'
    },
    {
      title: '聚创虚拟户（交易费户）',
      dataIndex: 'platformFeeAccountSn'
    },
  ]
  
  const CustomList = ({data, columns}) => {
    return (
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
        dataSource={data}
      />
    )
  }

  return (
    <Drawer
      title="订单支付明细管理"
      placement="right"
      width={1400}
      onClose={() => { setVisible(false) }}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => { setVisible(false) }}>返回</Button>
          </Space>
        </div>
      }
    >
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns1}
        style={{
          background: '#fff',
          padding: 20
        }}
        bordered
        dataSource={info}
      />
      {
        info?.skus &&
        info?.skus.map(item => (
          <CustomList data={item} key={item.skuId} columns={columns2} />
        ))
      }
      {
        payInfos?.map(item => (
          <CustomList data={item} key={item.stageName} columns={columns3} />
        ))
      }
      <ProDescriptions
        loading={loading}
        column={2}
        columns={columns4}
        style={{
          background: '#fff',
          padding: 20
        }}
        bordered
        dataSource={info}
      />
    </Drawer>
  )
}

export default OrderPayDetailPopup