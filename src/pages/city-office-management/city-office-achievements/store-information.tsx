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
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

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
  const [visit, setVisit] = useState<boolean>(false)

  const divideName=()=>{
    switch (type) {
      case 1:
        return '累计业绩'
      case 2:
        return '销售提成'
      case 3:
        return '管理费提成'
      case 4:
        return '托管推广提成'
      case 5:
        return '运营推广提成'
      case 6:
        return '启动费提成'
      case 7:
        return '门店营业额提成'
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
      hideInSearch: type!=1,
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
      title: '佣金比例',
      dataIndex: 'commissionDesc',
      align: 'center',
      hideInTable: type!=7
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

  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }
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
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={'financial-businessDept-commission-page'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'financial-businessDept-commission-page'}/>
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
