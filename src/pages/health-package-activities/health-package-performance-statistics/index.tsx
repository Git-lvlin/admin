import { useState, useEffect,useRef } from "react"
import ProTable from '@ant-design/pro-table'
import type { ProColumns } from '@ant-design/pro-table'
import PageContainer from "@/components/PageContainer"
import Detail from "./detail"
import { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';
import { amountTransform } from '@/utils/utils'
import AddressCascader from '@/components/address-cascader'
import RangeInput from '@/components/range-input'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { cardCityAgencyOrderPm,cardCityAgencyOrderPmStats } from '@/services/health-package-activities/health-package-performance-statistics'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<boolean>(false)
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const [visit, setVisit] = useState<boolean>(false)
  const ref=useRef()
  useEffect(() => {
    cardCityAgencyOrderPmStats(time).then(res=>{
      if(res.code==0){
        setDetailList(res.data[0])
      }
    })

  }, [time])
  const columns: ProColumns<TableProps>[] = [
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
      hideInSearch: true
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
      title: '套餐订单数',
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
      renderFormItem: () => <RangeInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>
    },
    {
      title: '套餐订单总金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) =>{
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '套餐总吸氢服务次数',
      dataIndex: 'serviceNums',
      align: 'center',
      hideInSearch: true
    }
  ]

  const getFieldValue = (searchConfig) => {
    const {dateTimeRange,area,payAmount,orderNums,...rest}=searchConfig.form.getFieldsValue()
    return {
      provinceId: area&&area[0]?.value,
      cityId: area&&area[1]?.value,
      districtId: area&&area[2]?.value,
      minPayAmount: payAmount&& amountTransform(payAmount?.min,'*'),
      maxPayAmount: payAmount&& amountTransform(payAmount?.max,'*'),
      minOrderNums: orderNums&&orderNums?.min,
      maxOrderNums: orderNums&&orderNums?.max,
      ...rest,
    }
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        columns={columns}
        params={{}}
        request={cardCityAgencyOrderPm}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 132,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e) => { setVisit(e) }}
            type={'cardCityAgencyOrderPm'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'cardCityAgencyOrderPm'}/>,
          ]
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        onReset={()=>{
          setTime()
        }}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
            <Descriptions.Item  label="绑定套餐的店铺数量">{detailList?.storeNums} 家</Descriptions.Item>
            <Descriptions.Item  label="套餐总订单数">{detailList?.orderNums} 单</Descriptions.Item>
            <Descriptions.Item  label="套餐总订单金额">{amountTransform(detailList?.payAmount,'/').toFixed(2)} 元</Descriptions.Item>
            <Descriptions.Item  label="所有套餐总吸氢服务">{detailList?.serviceNums} 次</Descriptions.Item>
            <Descriptions.Item  label="可用吸氢服务的设备总数">{detailList?.deviceNum} 台</Descriptions.Item>
          </Descriptions>
        )}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          onClose={()=>{ ref.current.reload();setMsgDetail(null) }}
        />
      }
    </PageContainer>
  )
}
