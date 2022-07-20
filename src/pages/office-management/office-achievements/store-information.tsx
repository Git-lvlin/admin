import { useRef,useEffect, useState } from "react"
import { Form,List,Divider } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { findItemOrderPage,itemOrderSum } from "@/services/office-management/office-achievements"
import { amountTransform } from '@/utils/utils'
import type { GithubIssueItem } from "./data"
import type { ProColumns } from "@ant-design/pro-table"
import styles from './styles.less'

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

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState({})
  const ref = useRef()
  const divide=(item)=>{
    switch (type) {
      case 0:
        return amountTransform(item?.totalCommission,'/').toFixed(2)
      case 1:
        return amountTransform(item?.totalSaleCommission,'/').toFixed(2)
      case 2:
        return amountTransform(item?.totalRentCommission,'/').toFixed(2)
      case 3:
        return amountTransform(item?.totalOrderAmount,'/').toFixed(2)
      default:
        return ''
    }
  }

  const divideName=()=>{
    switch (type) {
      case 0:
        return '累计分成'
      case 1:
        return '销售分成'
      case 2:
        return '管理费分成'
      case 3:
        return '累计业绩'
      default:
        return ''
    }
  }
  const Columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '订单日期',
      dataIndex: 'date',
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
        0: '总分成',
        1: '销售分成',
        2: '管理分成',
        3: '累计业绩'
      },
      hideInTable: true,
    },
    {
      title: '订单类型',
      dataIndex: 'orderTypeDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <p>￥{amountTransform(_,'/').toFixed(2)}</p>
        }else{
          return _
        }
      },
      hideInSearch: true,
    },
    {
      title: '收益',
      dataIndex: 'commissionDesc',
      align: 'center',
      hideInSearch: true
    }
  ]
  // const OrderSum=async ()=>{
  //  let sum=await itemOrderSum({})
  //  console.log('sum',sum)
  //  return sum?.data?.total
  // }
  useEffect(()=>{
    const params={
      type:type,
      businessDeptId:msgDetail?.businessDeptId,
      orderType:time?.orderType,
      orderNo:time?.orderNo,
      begin:time?.dateRange?.[0]||msgDetail?.begin,
      end:time?.dateRange?.[1]||msgDetail?.end
    }
    itemOrderSum(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.total)
      }
    })
  },[time])
  return (
    <DrawerForm
      title={`${msgDetail?.businessDeptName} ${divideName()} （ID:${msgDetail?.businessDeptId}）`}
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
        request={findItemOrderPage}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          type:type,
          businessDeptId:msgDetail?.businessDeptId,
          begin:msgDetail?.begin,
          end:msgDetail?.end
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        options={false}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  );
};