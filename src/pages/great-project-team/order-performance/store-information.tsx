import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { 
  teamHydrogen,
  hydrogenStats,
  wholesaleOrder,
  wholesaleOrderStats,
  healthyCard,
  healthyCardStats,
  hydrogenBoot,
  hydrogenBootStats,
  hydrogenRent,
  hydrogenRentStats
 } from "@/services/great-project-team/order-performance"
import { amountTransform } from '@/utils/utils'
import type { GithubIssueItem } from "./data"
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
        return '氢原子全款销售提成'
      case 2:
        return '新集约批发业绩提成'
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
  const exportCode=()=>{
    switch (type) {
      case 1:
        return 'tmHydrogen'
      case 2:
        return 'tmWholesaleOrder'
      case 3:
        return 'tmHealthyCard'
      case 4:
        return 'tmHydrogenBoot'
      case 5:
        return 'tmHydrogenRent'
      default:
        return ''
    }
  }

  const requestApi=()=>{
    switch (type) {
      case 1:
        return teamHydrogen
      case 2:
        return wholesaleOrder
      case 3:
        return healthyCard
      case 4:
        return hydrogenBoot
      case 5:
        return hydrogenRent
      default:
        return ''
    }
  }

  const hydrogenSum=()=>{
    switch (type) {
      case 1:
        return hydrogenStats
      case 2:
        return wholesaleOrderStats
      case 3:
        return healthyCardStats
      case 4:
        return hydrogenBootStats
      case 5:
        return hydrogenRentStats
      default:
        return ''
    }
  }

  const Columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '订单日期',
      dataIndex: 'createTime',
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
      title: '客户手机',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder:'请输入当前大团队长的客户手机号码'
      }
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
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
      dataIndex: 'payAmount',
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
      dataIndex: 'commission',
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
      agencyId:msgDetail?.agencyId,
      teamPhone:time?.teamPhone,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1]
    }
    const api=hydrogenSum()
    api(params).then(res=>{
      if(res.code==0){
        console.log('res',res?.data)
        setOrderSum(res?.data[0]?.commission)
      }
    })
  },[time])

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      agencyId:msgDetail?.agencyId,
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.managerPhone} ${divideName()} （ID:${msgDetail?.agencyId}）`}
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
        rowKey="agencyId"
        columns={Columns}
        request={requestApi()}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          agencyId:msgDetail?.agencyId,
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
              type={exportCode()}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={exportCode()}/>
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                收益：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
    </DrawerForm >
  );
};
