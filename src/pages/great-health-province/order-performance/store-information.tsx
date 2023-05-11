import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { cityItemOrderListPage,cityItemOrderSum } from "@/services/city-office-management/city-office-achievements"
import { amountTransform } from '@/utils/utils'
import type { GithubIssueItem, CumulativeProps, TableProps } from "./data"
import type { ProColumns } from "@ant-design/pro-table"
import styles from './styles.less'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState<TableProps>()
  const ref = useRef()
  const [visit, setVisit] = useState<boolean>(false)

  const divideName=()=>{
    switch (type) {
      case 1:
        return '累计业绩'
      case 2:
        return '健康礼包提成'
      case 3:
        return '健康套餐订单提成'
      case 4:
        return '启动费提成'
      case 5:
        return '租赁管理费提成'
      default:
        return ''
    }
  }
  const doAway=()=>{
    switch(type) {
      case 3: 
       return true
      case 4:
       return true
      case 5:
       return true
    }
  }

  const Columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '订单日期',
      dataIndex: 'orderTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单日期',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '下单人手机号',
      dataIndex: 'buyerMobile',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        'hydrogen': '氢原子销售',
        'hydrogenAgent': '氢原子托管',
        'operatorEquipment': '运营设备服务费',
        'hydrogenAgentRent': '氢原子租金',
        'hydrogenBoot': '氢原子启动',
        'hydrogenBootForBuy': '氢原子购买启动',
        'hydrogenRent': '租赁管理费'
      },
      hideInTable: true
    },
    {
      title: '订单类型',
      dataIndex: 'orderTypeDesc',
      hideInSearch: true
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return _
        }
      },
      hideInSearch: true,
    },
    {
      title: '收益',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(parseFloat(_)){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return _
        }
      },
    }
  ]
  useEffect(()=>{
    const params={
      type:type,
      cityBusinessDeptId:msgDetail?.cityBusinessDeptId,
      orderType:time?.orderType,
      orderNo:time?.orderNo,
      begin:time?.dateRange?.[0],
      end:time?.dateRange?.[1],
      hasTeamLeader:parseInt(time?.hasTeamLeader)
    }
    cityItemOrderSum(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.total)
      }
    })
  },[time])

  const getFieldValue = (searchConfig) => {
    const {dateRange,hasTeamLeader,...rest}=searchConfig.form.getFieldsValue()
    return {
      cityBusinessDeptId:msgDetail?.cityBusinessDeptId,
      type:type,
      begin:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      end:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      hasTeamLeader:parseInt(hasTeamLeader),
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.cityBusinessDeptName} ${divideName()} （ID:${msgDetail?.cityBusinessDeptId}）`}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={1300}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render:()=>{
            return []
        }
      }}
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
      className={styles.store_information}
    >
       <ProTable<GithubIssueItem>
        rowKey="date"
        columns={Columns}
        request={cityItemOrderListPage}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          type:type,
          cityBusinessDeptId:msgDetail?.cityBusinessDeptId,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        onReset={()=>{
          setTime()
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={'exportCityItemOrderList'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'exportCityItemOrderList'}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计{type==1?'金额':'收益'}：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  );
};
