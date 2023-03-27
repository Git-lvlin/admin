import { useState, useRef, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { storeLifePm, storeLifePmStats } from "@/services/product-performance-management/brand-authorization-fee"
import { amountTransform } from '@/utils/utils'
import styles from "../styles.less"
import Export from '@/components/export'

const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()
  
  const getData = async () => {
    await storeLifePmStats({
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
      dataIndex: '',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '总下单用户数量',
      dataIndex: '',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '总销售订单数',
      dataIndex: '',
      render: _ => `${_ ? _ : 0}单`
    },
    {
      title: '销量数量',
      dataIndex: '',
      render: _ => `${_ ? _ : 0}台`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={4}
      bordered
      dataSource={data}
    />
  )
}

const AEDProgramPerformance: FC = () => {
  const form = useRef<FormInstance>()
  const [searchConfig, setSearchConfig] = useState<FormInstance>()

  const getFieldsValue = () => {
    const {payTime, area, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
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
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '订单状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'storeMemberPhone',
      align: 'center'
    },
    {
      title: '子公司手机',
      dataIndex: '',
      align: 'center',
    },
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProTable
        rowKey='id'
        columns={columns}
        // request={storeLifePm}
        formRef={form}   
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
              type=''
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default AEDProgramPerformance
