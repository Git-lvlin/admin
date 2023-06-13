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
import { sum, cityOffice,  } from "@/services/city-office-management/finger-doctors-achievement"
import styles from "./styles.less"
import Export from "@/components/export"
import Detail from "./detail"
import CommissionDetail from '../components/commission-detail'

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


const FingerDoctorsAchievement = () => {
  const [searchConfig, setSearchConfig] = useState()
  const [visible, setVisible] = useState<boolean>(false)
  const [agencyId, setAgencyId] = useState<string>()
  const [commissionVisible, setCommissionVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [name, setName] = useState<string>()
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    const { payTime, ...rest } = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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
      title: '累计业绩（元）',
      dataIndex: 'totalAmount',
      hideInSearch: true,
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
                setName(`${r.cityOfficeName} 累计业绩`)
              }}
            >
              {amountTransform(_, '/')}
            </a>
          )
        }
      }
    },
    {
      title: '交易时间',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '累计提成（元）',
      dataIndex: 'totalCommission',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => {
        if(r.commission === 0) {
          return _
        } else {
          return (
            <a 
              onClick={()=> { 
                setCommissionVisible(true)
                setAgencyId(r.cityOfficeId)
                setType(7)
                setName(`${r.cityOfficeName} 提成明细`)
              }}
            >
              {amountTransform(_, '/')}
            </a>
          )
        }
      },
    },
    {
      title: '累计订单数（单）',
      dataIndex: 'totalOrder',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProTable
        rowKey='cityOfficeId'
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
        request={cityOffice}
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
              type="doctorBootCityOfficeList"
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
          title={name}
        />
      }
      {
        commissionVisible &&
        <CommissionDetail
          id={agencyId}
          visible={commissionVisible}
          setVisible={setCommissionVisible}
          title={name}
          type={type}
        />
      }
    </PageContainer>
  )
}

export default FingerDoctorsAchievement