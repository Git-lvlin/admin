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
import { sum, listPage } from "@/services/city-office-management/health-gift-package-performance"
import styles from "./styles.less"
import Export from "@/components/export"
import Detail from "./detail"

const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()

  const getData = () => {
    sum({
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
      dataIndex: 'totalAmount',
      render: _ => `${amountTransform(_, '/')}元`
    },
    {
      title: '总提成',
      dataIndex: 'totalCommission',
      render: _ => `${amountTransform(_, '/')}元`
    },
    {
      title: '有业绩市办事处数量',
      dataIndex: 'totalCityOffice',
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
  const [visible, setVisible] = useState<boolean>(false)
  const [agencyId, setAgencyId] = useState<string>()
  const [amount, setAmount] = useState<number>(0)
  const [name, setName] = useState<string>()
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
      dataIndex: 'cityOfficeId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '办事处名称',
      dataIndex: 'cityOfficeName',
      align: 'center'
    },
    {
      title: '社区店数量',
      dataIndex: 'totalStore',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '销售健康礼包订单数',
      dataIndex: 'totalOrder',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (_, r) => {
        if(_ === 0) {
          return _
        } else {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setAgencyId(r.cityOfficeId)
                setAmount(r.totalAmount)
                setName(`${r.cityOfficeName} 累计业绩`)
              }}
            >
              {amountTransform(_, '/')}
            </a>
          )
        }
      },
      hideInSearch: true
    },
    {
      title: '累计提成（元）',
      dataIndex: 'totalCommission',
      align: 'center',
      render: _ => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true
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
        request={listPage}
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
              type="exportHealthyGiftCityOfficeList"
              conditions={getFieldValue}
            />
          ]
        }}
      />
      {
        visible &&
        <Detail
          id={agencyId}
          visible={visible}
          setVisible={setVisible}
          totalAmount={amount}
          title={name}
        />
      }
    </PageContainer>
  )
}

export default HealthGiftPackagePerformance
