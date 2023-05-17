import { useState, useEffect,useRef } from "react"
import ProTable, { ActionType } from '@ant-design/pro-table'
import type { ProColumns } from '@ant-design/pro-table'
import PageContainer from "@/components/PageContainer"
import Detail from "./detail"
import { Descriptions } from 'antd'
import { detailListProps } from './data'
import { amountTransform } from '@/utils/utils'
import AddressCascader from '@/components/address-cascader'
import RangeInput from '@/components/range-input'
import RangeNumberInput from '@/components/range-number-input'
import Export from '@/components/export'
import { healthPkgOrderPm, healthPkgOrderPmStats } from '@/services/health-gift-package-activities/health-package-performance-statistics'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState()
  const [detailList,setDetailList]=useState<detailListProps>()
  const [time,setTime]=useState({})
  const ref=useRef<ActionType>()
  useEffect(() => {
    healthPkgOrderPmStats(time).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])
  const columns: ProColumns[] = [
    {
      title: '店主手机',
      dataIndex: 'memberPhone',
      align: 'center',
      fieldProps: {
        placeholder:"请输入店主手机号"
      },
      hideInTable: true,
      order:2
    },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      order: -1,
    },
    {
      title: '店铺编号',
      dataIndex: 'houseNumber',
      align: 'center',
      order:4,
      hideInTable: true,
      fieldProps: {
        placeholder:'请输入社区店编号'
      }
    },
    {
      title: '所属店主店铺编号',
      dataIndex: 'houseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备店铺所属省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect placeholder="请选择省市区" />),
      order:5
    },
    {
      title: '店主店铺所在区域',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主店铺地址',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true,
      width: '20%'
    },
    {
      title: '店铺设备数',
      dataIndex: 'deviceNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '绑定订单数',
      dataIndex: 'orderNums',
      align: 'center',
      hideInTable: true,
      renderFormItem: () => <RangeInput beforePlaceholder='最低单数' afterPlaceholder='最高单数'/>
    },
    {
      title: '礼包订单数',
      dataIndex: 'orderNums',
      align: 'center',
      hideInSearch: true,
      render: (_,data) =>{
        return <a onClick={()=>{ setVisible(true),setMsgDetail(data) }}>{_}</a>
      }
    },
    {
      title: '业绩总额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInTable: true,
      order:3,
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>
    },
    {
      title: '礼包订单总金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) =>{
        return amountTransform(_,'/').toFixed(2)
      }
    }
  ]

  const getFieldValue = (searchConfig: any) => {
    const {dateTimeRange,area,payAmount,orderNums,...rest}=searchConfig.form.getFieldsValue()
    return {
      provinceId: area&&area[0]?.value,
      cityId: area&&area[1]?.value,
      regionId: area&&area[2]?.value,
      minPayAmount: payAmount && amountTransform(payAmount?.min,'*'),
      maxPayAmount: payAmount && amountTransform(payAmount?.max,'*'),
      minOrderNums: orderNums && orderNums?.min,
      maxOrderNums: orderNums && orderNums?.max,
      ...rest,
    }
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        columns={columns}
        params={{}}
        request={healthPkgOrderPm}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        scroll={{x:'max-content'}}
        options={false}
        search={{
          labelWidth: 132,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='healthPkgOrderPm'
              conditions={()=>{getFieldValue(searchConfig)}}
            />,
          ]
        }}
        onSubmit={(val: any)=>{
          setTime(val)
        }}
        onReset={()=>{
          setTime({})
        }}
        tableExtraRender={() => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={4} layout="vertical" bordered>
            <Descriptions.Item  label="有订单店铺数量">{detailList?.storeNums} 家</Descriptions.Item>
            <Descriptions.Item  label="礼包总订单数">{detailList?.orderNums} 单</Descriptions.Item>
            <Descriptions.Item  label="礼包总订单金额">{amountTransform(detailList?.payAmount,'/').toFixed(2)} 元</Descriptions.Item>
            <Descriptions.Item  label="有订单店铺设备总数">{detailList?.deviceNum} 台</Descriptions.Item>
          </Descriptions>
        )}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
          dataSource={msgDetail}
        />
      }
    </PageContainer>
  )
}
