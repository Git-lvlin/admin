import { useState, useRef, useEffect } from "react"
import ProTable  from "@ant-design/pro-table"
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from "moment"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { amountTransform } from "@/utils/utils"
import { cardCityAgencyPm, cardCityAgencyPmStats } from "@/services/city-office-management/health-package-performance"
import styles from "./styles.less"
import Export from "@/components/export"

const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()

  const getData = () => {
    cardCityAgencyPmStats({
      ...form
    }).then(res=> {
      if(res.success) {
        setData(res.data)
      }
    })
  }

  useEffect(()=> {
    getData()
  }, [form])
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总业绩金额',
      dataIndex: 'payAmount',
      render: _ => `${amountTransform(_, '/')}元`
    },
    {
      title: '总提成',
      dataIndex: 'commission',
      render: _ => `${amountTransform(_, '/')}元`
    },
    {
      title: '有业绩市办事处数量',
      dataIndex: 'agencyNums',
      render: _ => `${_ ? _ : 0}家`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={3}
      bordered
      dataSource={data}
    />
  )
}

const HealthGiftPackagePerformance: FC = () => {
  const [searchConfig, setSearchConfig] = useState()
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    const { time, ...rest } = form.current?.getFieldsValue()
    return {
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
      ...rest
    }

  }

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '办事处名称',
      dataIndex: 'agencyName',
      align: 'center'
    },
    {
      title: '社区店数量',
      dataIndex: 'storeNums',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '销售健康礼包订单数',
      dataIndex: 'orderNums',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '累计提成（元）',
      dataIndex: 'commission',
      align: 'center',
      render: _ => amountTransform(_, '/'),
      hideInSearch: true
    }
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProTable
        rowKey='agencyId'
        columns={columns}
        headerTitle={<Aggregate form={searchConfig}/>}
        params={{}}
        options={false}
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        request={cardCityAgencyPm}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="cardCityAgencyPm"
              conditions={getFieldValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default HealthGiftPackagePerformance
