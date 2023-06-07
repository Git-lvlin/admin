import TimeSelect from '@/components/time-select'
import { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@/components/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import { Button, FormInstance } from 'antd'

import { pushReportList } from '@/services/finger-doctor/health-detection-condition-push'
import Detail from '../health-detection-record-management/detail'
import PushGoods from './push-goods'
import ConditionSchemeNotificationConfig from './condition-scheme-notification-config'

const HealthDetectionConditionPush = () => {
  const [url, setUrl] = useState<string>()
  const [id, setId] = useState<string>()
  const [visible, setVisible] = useState<boolean>(false)
  const [goodsVisible, setGoodsVisible] = useState<boolean>(false)
  const [notificationConfigVisible, setNotificationConfigVisible] = useState<boolean>(false)
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '报告编号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=> {setUrl(r.reportUrl); setVisible(true)}}>{_}</a>
    },
    {
      title: '检测设备号',
      dataIndex: 'imei',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'imei',
      fieldProps: {
        placeholder: '请输入检测设备号'
      },
      hideInTable: true
    },
    {
      title: '设备所属人手机号',
      dataIndex: 'storePhone',
      align: 'center',
      hideInSearch: true
    },  
    {
      dataIndex: 'storePhone',
      fieldProps: {
        placeholder: '请输入设备所属人手机号'
      },
      hideInTable: true
    },  
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'name',
      fieldProps: {
        placeholder: '请输入用户姓名'
      },
      hideInTable: true
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'phone',
      fieldProps: {
        placeholder: '请输入用户手机号'
      },
      hideInTable: true
    },
    {
      title: '性别',
      dataIndex: 'genderDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'gender',
      fieldProps: {
        placeholder: '请选择性别'
      },
      valueType: 'select',
      valueEnum: {
        'men': '男',
        'women': '女'
      },
      hideInTable: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '身高(厘米)',
      dataIndex: 'height',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '体重(公斤)',
      dataIndex: 'weight',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐名称',
      dataIndex: 'packageName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报告时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'createTime',
      renderFormItem: () => <TimeSelect showTime={false}/>,
      hideInTable: true
    },
    {
      title: '检测评估结果',
      dataIndex: 'checkResult',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '测量值',
      dataIndex: 'checkVal',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '调理商品（款）',
      dataIndex: 'goodsNums',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.goodsNums !== 0) {
          return (
            <a onClick={()=>{setGoodsVisible(true); setId(r.id); setData(r)}}>{_}</a>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        params={{}}
        request={pushReportList}
        columns={columns}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Button
              key='btn' 
              onClick={()=>{setNotificationConfigVisible(true)}}
              type='primary'
            >
              调理通知配置
            </Button>
          ]
        }}
      />
      {
        visible&&
        <Detail
          url={url}
          visible={visible}
          setVisible={setVisible}
        />
      }
      {
        goodsVisible&&
        <PushGoods
          id={id}
          visible={goodsVisible}
          setVisible={setGoodsVisible}
          title={data}
        />
      }
      {
        notificationConfigVisible&&
        <ConditionSchemeNotificationConfig
          visible={notificationConfigVisible}
          setVisible={setNotificationConfigVisible}
          callback={()=> setNotificationConfigVisible(false)}
        />
      }
    </PageContainer>
  )
}

export default HealthDetectionConditionPush