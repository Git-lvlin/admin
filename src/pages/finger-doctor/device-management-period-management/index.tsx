import {  useRef, useState } from "react"
import ProTable from '@/components/pro-table'

import type { FC } from "react"
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type {  Record } from './data'

import PageContainer from "@/components/PageContainer"
import { findDeviceDoctorPage } from "@/services/finger-doctor/device-management-period-management"
import Export from "@/components/export"
import { amountTransform } from "@/utils/utils"
import HistoricalManagement from './historical-management'
import StartingChargeConfiguration from './starting-charge-configuration'
import CheckReportConfiguration from './check-report-configuration'
import GiftEnabledTimes from './gift-enabled-times'
import ComplimentaryServiceRecord from './complimentary-service-record'
import PaymentModal from './payment-modal'



const DeviceManagementPeriodManagement: FC = ()=>  {
    const form = useRef<FormInstance>()
    const ref= useRef<ActionType>()
    const [historyVisible, setHistoryVisible] = useState<boolean>(false);
    const [startVisible, setStartVisible] = useState<boolean>(false);
    const [detectionVisible, setDetectionVisible] = useState<boolean>(false);
    const [presentedVisible, setPresentedVisible] = useState<boolean>(false);
    const [recordVisible, setRecordVisible] = useState<boolean>(false);
    const [paymentVisible, setPaymentVisible] = useState<boolean>(false);
    const [datailMsg, setDatailMsg] = useState<Record>();
    const getFieldValue = () => {
      const { ...rest } = form.current?.getFieldsValue()
      return {
        ...rest
      }
  
    }

    const columns: ProColumns[] = [
        {
          dataIndex: 'imei',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入设备编号'
          }
        },
        {
          title: '设备编号',
          dataIndex: 'imei',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '门店合作商编号',
          dataIndex: 'areaStoreNo',
          align: 'center',
          hideInSearch: true,
          hideInTable: false
        },
        {
          title: '区县服务商编号',
          dataIndex: 'areaProviderNo',
          align: 'center',
          hideInSearch: true,
          hideInTable: false
        },
        {
          title: '设备状态',
          dataIndex: 'status',
          align: 'center',
          hideInSearch: true,
          valueEnum: {
            0: '待绑定',
            1: '待激活',
            2: '正常',
            3: '已停用',
            4: '已解绑'
          }
        },
        {
          dataIndex: 'memberPhone',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入设备所属人手机号'
          }
        },
        {
          title: '所属人手机号',
          dataIndex: 'memberPhone',
          align: 'center',
          hideInSearch: true,
        },
        {
          dataIndex: 'leaseStatus',
          align: 'center',
          hideInTable: true,
          valueType: 'select',
          valueEnum: {
            0: '无租期',
            1: '免租期',
            2: '管理中',
            3: '已逾期'
          },
          fieldProps: {
            placeholder: '请选择管理期状态'
          }
        },
        {
          dataIndex: 'areaType',
          align: 'center',
          hideInTable: true,
          valueEnum: {
            2: '区县服务商店铺',
            4: '门店合作商店铺',
            0: '其他来源',
          },
          fieldProps: {
            placeholder: '请选择订单来源'
          }
        },
        {
          title: '当前管理期类型',
          dataIndex: 'manageType',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '当前管理期状态',
          dataIndex: 'leaseStatusStr',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '管理开始日期',
          dataIndex: 'activatedTime',
          align: 'center',
          hideInSearch  : true,
        },
        {
          title: '管理结束日期',
          dataIndex: 'leaseDeadline',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '剩余管理期(天)',
          dataIndex: 'remainManageDayStr',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '累计设备管理费(元)',
          dataIndex: 'manageFee',
          align: 'center',
          hideInSearch: true,
          render: (_) => {
            if(_){
              return amountTransform(_,'/').toFixed(2)
            }else{
              return '-'
            }
          }
        },
        {
          title: '启动费金额(元)',
          dataIndex: 'startFee',
          align: 'center',
          hideInSearch: true,
          render: (_) => {
            if(_){
              return amountTransform(_,'/').toFixed(2)
            }else{
              return '-'
            }
          }
        },
        {
          title: '累计赠送启用次数(次)',
          dataIndex: 'totalGivenTimes',
          align: 'center',
          hideInSearch: true,
          render: (_,data) => {
            if(typeof _ === 'string' && /^\d+$/.test(_)){
              return <a onClick={()=>{ setRecordVisible(true); setDatailMsg(data) }}>{_}</a>
            }else{
              return '-'
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'remark',
          align: 'center',
          hideInSearch: true,
          render: (_,data) => {
            return [
              <a key="history" onClick={()=> { setHistoryVisible(true); setDatailMsg(data) }}>历史交管理费&nbsp;</a>,
              <a key="start" onClick={()=> { setStartVisible(true); setDatailMsg(data) }}>启动费配置<br/></a>,
              <a key="payment" style={{ display:data?.limitPayLease == 1? 'block': 'none' }} onClick={()=> { setPaymentVisible(true); setDatailMsg(data) }}>开启缴费<br/></a>,
              <a key="detection" onClick={()=> { setDetectionVisible(true); setDatailMsg(data) }}>检测报告封面配置&nbsp;</a>,
              <a key="presented" onClick={()=> { setPresentedVisible(true); setDatailMsg(data) }}>赠送启用次数</a>
            ]
          }
        },
      ]
    return (
      <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        request={findDeviceDoctorPage}
        formRef={form}
        actionRef={ref}
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
              type="iot-export-member-device-doctor"
              conditions={getFieldValue}
            />
          ]
        }}
      />
      {historyVisible &&
        <HistoricalManagement
          datailMsg={datailMsg}
          visible={historyVisible}
          setVisible={setHistoryVisible}
          onClose={()=>{ref.current?.reload();setDatailMsg(undefined)}}
          callback={()=>{}}
        />
      }
      {startVisible &&
        <StartingChargeConfiguration
          datailMsg={datailMsg}
          visible={startVisible}
          setVisible={setStartVisible}
          onClose={()=>{ref.current?.reload();setDatailMsg(undefined)}}
          callback={()=>{ref.current?.reload();setDatailMsg(undefined)}}
        />
      }
      {detectionVisible &&
        <CheckReportConfiguration
          datailMsg={datailMsg}
          visible={detectionVisible}
          setVisible={setDetectionVisible}
          onClose={()=>{ref.current?.reload();setDatailMsg(undefined)}}
          callback={()=>{ref.current?.reload();setDatailMsg(undefined)}}
        />
      }
      {presentedVisible &&
        <GiftEnabledTimes
          datailMsg={datailMsg}
          visible={presentedVisible}
          setVisible={setPresentedVisible}
          onClose={()=>{ref.current?.reload();setDatailMsg(undefined)}}
          callback={()=>{ref.current?.reload();setDatailMsg(undefined)}}
        />
      }
      {recordVisible &&
        <ComplimentaryServiceRecord
          datailMsg={datailMsg}
          visible={recordVisible}
          setVisible={setRecordVisible}
          onClose={()=>{ref.current?.reload();setDatailMsg(undefined)}}
          callback={()=>{ }}
        />
      }
       {paymentVisible &&
        <PaymentModal
          datailMsg={datailMsg}
          visible={paymentVisible}
          setVisible={setPaymentVisible}
          onClose={()=>{ref.current?.reload();setDatailMsg(undefined)}}
          callback={()=>{ref.current?.reload();setDatailMsg(undefined)}}
        />
      }
      </PageContainer>
    )
  }
  
  export default DeviceManagementPeriodManagement
