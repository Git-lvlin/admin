import { useState, useRef, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'
import { Image } from 'antd'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { trainServerSum, trainServerPage } from "@/services/product-performance-management/AED-program-performance"
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'

const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()
  
  const getData = async () => {
    await trainServerSum({
      ...form
    }).then(res => {
      setData(res.data)
    })
  }
  
  useEffect(()=> {
    getData()
  }, [form])

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总业绩金额',
      dataIndex: 'totalAmount',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '总下单用户数量',
      dataIndex: 'totalUsers',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '总销售订单数',
      dataIndex: 'totalOrder',
      render: _ => `${_ ? _ : 0}单`
    },
    {
      title: '销量数量',
      dataIndex: 'totalCount',
      render: _ => `${_ ? _ : 0}台`
    },
    {
      title: '团长人数',
      dataIndex: 'totalTeamLeaders',
      render: _ => `${_ ? _ : 0}人`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      labelStyle={{width: '10%'}}
      column={{ xl: 3, xxl: 5 }}
      bordered
      dataSource={data}
    />
  )
}

const TrainServicePackage: FC = () => {
  const form = useRef<FormInstance>()
  const [searchConfig, setSearchConfig] = useState<FormInstance>()
  const [normalOrderVisible, setNormalOrderVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>()

  const getFieldsValue = () => {
    const {payTime, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'buyerMobile',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center'
    }, 
    {
      title: '商品主图',
      dataIndex: 'goodsUrl',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> <Image src={r.goodsUrl} width={50} height={50}/>
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '收货人姓名',
      dataIndex: 'consignee',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '关联保证金订单状态',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.orderId){
          return <a onClick={()=> {setNormalOrderVisible(true); setId(r.orderId)}}>{_}</a> 
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '关联保证金订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        1: '未关联保证金订单',
        2: '已关联保证金订单'
      },
      hideInTable: true
    },
    {
      title: '关联保证金订单签合同状态',
      dataIndex: 'contractId',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.contractUrl) {
          return <a href={r.contractUrl} target='_blank'>{_}</a> 
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '支付时间',
      dataIndex: 'payTime', 
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '子公司名称',
      dataIndex: 'subCompanyName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: 'purchaseCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'memberMobile',
      align: 'center'
    },
    {
      title: '团长手机号',
      dataIndex: 'teamLeaderMobile',
      align: 'center',
    },
    {
      title: '子公司类型',
      dataIndex: 'teamLeaderTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司类型',
      dataIndex: 'teamLeaderType',
      valueType: 'select',
      valueEnum: {
        1: '子公司',
        2: '非子公司'
      },
      hideInTable: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '未签订',
        1: '已签订'
      }
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '未学习',
        1: '已学习'
      }
    },
    {
      title: '考试状态',
      dataIndex: 'examStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '未考试',
        1: '已通过',
        2: '未通过'
      }
    },
    {
      title: '线下培训状态',
      dataIndex: 'trainStatusDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '线下培训状态',
      dataIndex: 'trainStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '未录入',
        1: '已培训',
        2: '未培训'
      }
    },
    {
      title: '所属大健康省代',
      dataIndex: 'hyProvinceAgent',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属氢原子市代',
      dataIndex: 'hyCityAgent',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '业绩结算状态',
      dataIndex: 'auditStatusDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'auditStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '未解冻',
        2: '未到期',
        3: '待申请',
        4: '待审核',
        5: '待汇款',
        6: '已结算',
        7: '审核不通过',
        8: '已失效',
        9: '已线下结算'
      }
    },
  ]

  return (
    <>
      <ProTable
        columns={columns}
        request={trainServerPage}
        formRef={form}   
        scroll={{x: 'max-content'}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        headerTitle={<Aggregate form={searchConfig}/>}
        options={false}
        search={{
          labelWidth: 160,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='exportAEDTrainServerCommissionList'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        normalOrderVisible &&
        <NormalOrderDetail
          id={id}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
        />
      }
    </>
  )
}

export default TrainServicePackage
