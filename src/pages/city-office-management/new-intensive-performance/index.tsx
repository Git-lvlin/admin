import TimeSelect from '@/components/time-select'
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
import { newWholesaleCityAgencyPm, newWholesaleCityAgencyPmStats } from "@/services/city-office-management/new-intensive-performance"
import styles from "./styles.less"
import Export from "@/components/export"
import Detail from "./detail"

const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()

  const getData = () => {
    newWholesaleCityAgencyPmStats({
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
      dataIndex: 'agencyNum',
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

const NewIntensivePerformance: FC = () => {
  const [searchConfig, setSearchConfig] = useState()
  const [agencyId, setAgencyId] = useState<string>()
  const [visible, setVisible] = useState<boolean>(false)
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
      dataIndex: 'agencyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '办事处名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '业绩类型',
      dataIndex: 'teamLeader',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩类型',
      dataIndex: 'teamLeader',
      valueType: 'select',
      valueEnum: {
        1: '有大团队长',
        0: '没有大团队长'
      },
      hideInTable: true
    },
    {
      title: '交易时间',
      dataIndex: 'time',
      renderFormItem: () => <TimeSelect showTime={false}/>,
      hideInTable: true
    },
    {
      title: '累计业绩（元）',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(_ === 0) {
          return _
        } else {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setAgencyId(r.agencyId)
                setAmount(r.payAmount)
                setName(`${r.name} 累计业绩`)
              }}
            >
              {amountTransform(_, '/')}
            </a>
          )
        }
      }
    },
    {
      title: '累计提成（元）',
      dataIndex: 'commission',
      align: 'center',
      render: _ => amountTransform(_, '/'),
      hideInSearch: true
    },
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
        request={newWholesaleCityAgencyPm}
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
              type="newWholesaleCityAgencyPm"
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

export default NewIntensivePerformance
