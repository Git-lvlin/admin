import { useState, useRef, useEffect } from "react"
import ProForm, { ProFormSelect, ProFormDependency } from "@ant-design/pro-form"
import moment from "moment"
import { Button } from "antd"

import type { FC } from "react"
import type { FormInstance } from "antd"
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions"

import PageContainer from "@/components/PageContainer"
import { hostingDataReport } from "@/services/hydrogen-atom-trusteeship/data-report"
import ProDescriptions from "@ant-design/pro-descriptions"
import { amountTransform } from "@/utils/utils"


const DataReport: FC = () => {
  const [data, setData] = useState()
  const form = useRef<FormInstance>()
  const nowMonth = new Date().getMonth() + 1
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const obj = {}
  const res = monthArr.filter(item => item <= nowMonth)
  res.forEach(item => { obj[item] = `${item}月`} )

  useEffect(()=> {
    form.current?.submit()
  }, [])

  const submit = (v: {year: string, month: string}) => {
    let startTime: string, endTime: string
    const { year, month } = v
    const y = {
      1: '2001',
      2: moment(+new Date()).format('YYYY')
    }[year]
    
    if(year === '1') {
      startTime = '2001-01-01 00:00:00'
      endTime = '2050-01-01 00:00:00'
    } else if(month === '0') {
      startTime = `${y}-01-01 00:00:00`
      endTime= `${moment(y).add({year: 1}).format('YYYY')}-01-01 00:00:00`
    } else {
      startTime = moment(y + '-' + `0${month}`.slice(-2) + '-01').format('YYYY-MM-DD 00:00:00')
      endTime = moment(startTime).add({month: 1}).format('YYYY-MM-DD 00:00:00')
    }
    
    return new Promise<void>((resolve) => {
      hostingDataReport({
        startTime,
        endTime
      }).then((res: any)=> {
        setData(res.data?.[0])
        resolve()
      })
    })
  }  

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '投资方数',
      dataIndex: 'hostingUserNum',
    },
    {
      title: '运营商数',
      dataIndex: 'operateUserNum',
    },
    {
      title: '投资人托管产品数',
      dataIndex: 'hostingDeviceNum',
    },
    {
      title: '托管单总金额',
      dataIndex: 'hostingPayAmount',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '运营产品数',
      dataIndex: 'operateDeviceNum'
    },
    {
      title: '运营商总服务费',
      dataIndex: 'operateServiceFee',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '运营产品占比',
      dataIndex: 'opereateRatio',
    },
    {
      title: '运营商用户占比',
      dataIndex: 'operateUserRatio',
    },
    {
      title: '产品总启用次数',
      dataIndex: 'startUpNum',
    },{
      title: '已激活托管产品数',
      dataIndex: 'activationDeviceNum',
    },
    {
      title: '产品总启用费金额',
      dataIndex: 'startUpAmount',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '产品总启用时长(h)',
      dataIndex: 'startUpTime',
    },
    {
      title: '管理费套餐订单数',
      dataIndex: 'leaseOrderNum',
    },
    {
      title: '管理费套餐店主数',
      dataIndex: 'leaseStoreNum',
    },
    {
      title: '管理费套餐总金额',
      dataIndex: 'leaseOrderAmount',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '管理费套餐总月数',
      dataIndex: 'leaseMonthNum',
    },
    {
      title: '投资方推广人数',
      dataIndex: 'hostingPromoteUserNum',
    },
    {
      title: '运营商推广人数',
      dataIndex: 'operatePromoteUserNum',
    },
    {
      title: '投资方总收益金额',
      dataIndex: 'hostingCommission',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '投资方推广人总收益',
      dataIndex: 'hostingPromoteCommission',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '运营商推广人总收益',
      dataIndex: 'operatePromoteCommisstion',
      render: (_)=> amountTransform(_, '/')
    },
    {
      title: '待投放设备数',
      dataIndex: 'pendingPutDeviceNum',
    },
    {
      title: '运营中设备数',
      dataIndex: 'operateIngDeviceNum',
    },
    {
      title: '运营商服务资质数',
      dataIndex: 'operateQualificationNum',
    },
  ]

  return (
    <PageContainer>
      <ProForm
        layout='inline'
        style={{
          background: '#fff',
          padding: '20px'
        }}
        formRef={form}
        submitter={{
          render: (props, doms) => {
            return [
              <Button type='primary' key="submit" onClick={() => props.form?.submit?.()}>
                查询
              </Button>,
              <Button key="rest" onClick={() => {props.form?.resetFields(); props.form?.submit?.()}}>
                重置
              </Button>
            ]
          }
        }}
        onFinish={async(v: {year: string, month: string})=> {
          await submit(v)
        }}
      >
        <ProFormSelect
          name='year'
          valueEnum={{
            1: '全部年份',
            2: `${moment(+new Date()).format('YYYY')}年`
          }}
          width='md'
          fieldProps={{
            placeholder: '请选择年份'
          }}
          initialValue={'1'}
        />
        <ProFormDependency name={['year']}>
          {
            ({year})=> {
              const data = year === '1' ? {} : { ...obj }
              return (
                <ProFormSelect
                  name='month'
                  valueEnum={{
                    0: '全部月份',
                    ...data
                  }}
                  width='md'
                  fieldProps={{
                    placeholder: '请选择月份'
                  }}
                  initialValue={'0'}
                />
              )
             }
          }
        </ProFormDependency>
      </ProForm>
      <ProDescriptions
        columns={columns}
        dataSource={data}
        column={8}
        bordered
        layout='vertical'
        style={{background: '#fff', padding: 20}}
      />
    </PageContainer>
  )
}

export default DataReport
