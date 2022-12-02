import { useState, useEffect } from "react"
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

export default () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [time,setTime]=useState()
  const [visit, setVisit] = useState<boolean>(false)
  useEffect(() => {
    const params={
      agentId:time?.agentId,
      agentName:time?.agentName,
      startTime:time?.createTime&&time?.createTime[0],
      endTime:time?.createTime&&time?.createTime[1]
    }
    // cityAgentManageStats(params).then(res=>{
    //   if(res.code==0){
    //     setDetailList(res.data[0])
    //   }
    // })

  }, [time])
  const columns: ProColumns<TableProps>[] = [
    {
      title: '店主手机',
      dataIndex: '',
      align: 'center',
      fieldProps: {
        placeholder:"请输入店主手机号"
      },
      hideInTable: true,
      order:2
    },
    {
      title: '店主手机号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: '',
      align: 'center',
      order:4,
      hideInTable: true,
      fieldProps: {
        placeholder:'请输入社区店编号'
      }
    },
    {
      title: '所属店主店铺编号',
      dataIndex: '',
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
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主店铺地址',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺设备数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '绑定订单数',
      dataIndex: '',
      align: 'center',
      hideInTable: true,
      renderFormItem: () => <RangeInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>
    },
    {
      title: '套餐订单数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩总额',
      dataIndex: '',
      align: 'center',
      hideInTable: true,
      order:3,
      renderFormItem: () => <RangeInput beforePlaceholder='最低单数' afterPlaceholder='最高单数'/>
    },
    {
      title: '套餐订单总金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
      render: (_) =>{
        return amountTransform(_,'/')
      }
    },
    {
      title: '套餐总吸氢服务次数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }
  ]

  const getFieldValue = (searchConfig) => {
    const {dateTimeRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
      ...rest,
    }
  }

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        params={{}}
        // request={}
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
            type={'bind-box-use-detail-export'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'bind-box-use-detail-export'}/>,
          ]
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
            <Descriptions.Item  label="绑定套餐的店铺数量">{detailList?.agentNum}  </Descriptions.Item>
            <Descriptions.Item  label="套餐总订单数">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="套餐总订单金额">{amountTransform(detailList?.hydrogenCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="所有套餐总吸氢服务">{amountTransform(detailList?.wholesaleCommission,'/').toFixed(2)}  </Descriptions.Item>
            <Descriptions.Item  label="可用吸氢服务的设备总数">{amountTransform(detailList?.hydrogenLeaseCommission,'/').toFixed(2)}  </Descriptions.Item>
          </Descriptions>
        )}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
        />
      }
    </PageContainer>
  )
}