import { useRef, useState } from 'react'
import moment from 'moment'
import { Space } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import Export from '@/components/export'
import PageContainer from '@/components/PageContainer'
import TimeSelect from '@/components/time-select'
import { subCompanyUser } from '@/services/product-performance-management/early-user-management'
import RegistForm from './regist-form'
import CancelRegister from './cancel-register'

const AEDEarlyUserManagement: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [cancelRegisterVisible, setCancelRegisterVisible] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>()
  const [data, setData] = useState()
  const [time, setTime] = useState<string>()
  const [id, setId] = useState<string>()
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '编号',
      dataIndex: 'subOrderSn',
      align: 'center'
    },
    {
      title: '订单号',
      dataIndex: 'sumOrderId',
      align: 'center'
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '下单人用户ID', 
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '订单金额',
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单时间',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '采样码',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报名人姓名',
      dataIndex: 'signUser',
      align: 'center'
    },
    {
      title: '报名人手机号',
      dataIndex: 'signMemberPhone',
      align: 'center',
    },
    {
      title: '报名时间',
      dataIndex: 'signTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '报名成功时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '出报告时间',
      dataIndex: 'reportTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '出报告时间',
      dataIndex: 'reportTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '样品编号',
      dataIndex: 'detectionNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '物流单号',
      dataIndex: 'shippingCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报名人身份证号码',
      dataIndex: 'idcard',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'senderDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '送检单位',
      dataIndex: 'company',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <>
          <div>{_}</div>
          {
            r.processDesc === '待采样' &&
            (
              r.isNoticeDesc === '待通知' ?
              <div style={{color: '#FF6600'}}>{r.isNoticeDesc}</div> :
              <div style={{color: '#1FCA66'}}>{r.isNoticeDesc}</div>
            )
          }
        </>
      )
    },
    {
      title: '通知状态',
      dataIndex: 'isNotice',
      valueType: 'select',
      valueEnum: {
        0: '待通知',
        1: '已通知'
      },
      hideInTable: true
    },
    {
      title: '状态',
      dataIndex: 'process',
      valueType: 'select',
      valueEnum: {
        0: '待报名',
        1: '待采样',
        5: '检测中',
        10: '已完成',
        14: '退款中',
        15: '已退款',
        20: '已失效',
      },
      hideInTable: true
    },
    {
      title: '预约采样日期',
      dataIndex: 'noticeTime',
      valueType: 'date',
      hideInTable: true
    },
    {
      title: '预约采样日期',
      dataIndex: 'noticeTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '查看',
      valueType: 'option',
      align: 'center',
      render: (_, r) => {
        if(r.processDesc === '检测中' || r.processDesc === '待采样' || r.processDesc === '退款成功') {
          return (
            <a
              onClick={()=> {
                setVisible(true)
                setPhone(r.signMemberPhone)
                setId(r.subOrderSn)
                setTime(r.signTime)
              }}
            >
              报名表
            </a>
          )
        } else if(r.processDesc === '已完成') {
          return (
            <Space size='small'>
              <a
                onClick={()=> {
                  setVisible(true)
                  setPhone(r.signMemberPhone)
                  setId(r.subOrderSn)
                  setTime(r.signTime)
                }}
              >
                报名表
              </a>
              <a>
                体检报告
              </a>
            </Space>
          )
        } else {
          return
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => {
        if(r.processDesc === '待采样' || r.processDesc === '检测中') {
          return (
            <Space size='small'>
              <a href={`/financial-management/transaction-detail-management/order-pay-detail-management?id=${r.sumOrderId}`} target='blank'>申请退款</a>
              <a onClick={()=> {setCancelRegisterVisible(false); setData(r)}}>取消报名</a>
            </Space>
          )
        } else {
          return
        }
      }
    }
  ]
  
  const getFieldsValue = () => {
    const { reportTime, signTime, payTime, ...rest } = form.current?.getFieldsValue()
    return { 
      orderStartTime: payTime && moment(payTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      orderEndTime: payTime && moment(payTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      signStartTime: signTime && moment(signTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      reportStartTime: reportTime && moment(reportTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      reportEndTime: reportTime && moment(reportTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }

  return (
    <PageContainer>
      <ProTable
        rowKey='subOrderSn'
        columns={columns}
        params={{}}
        formRef={form}
        request={subCompanyUser}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='scrAdmCompanyUser'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible &&
        <RegistForm
          visible={visible}
          setVisible={setVisible}
          id={id}
          phone={phone}
          time={time}
        />
      }
      {
        cancelRegisterVisible &&
        <CancelRegister
          visible={cancelRegisterVisible}
          setVisible={setCancelRegisterVisible}
          data={data}
        />
      }
    </PageContainer>
  )
}

export default AEDEarlyUserManagement