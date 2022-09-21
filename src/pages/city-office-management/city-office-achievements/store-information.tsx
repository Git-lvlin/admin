import { useRef,useEffect, useState } from "react"
import { Form,List,Divider } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { cityItemOrderListPage,cityItemOrderSum } from "@/services/city-office-management/city-office-achievements"
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
        return '累计业绩'
      case 2:
        return '销售提成'
      case 3:
        return '托管推广提成'
      case 4:
        return '运营推广提成'
      case 5:
        return '托管租赁管理费提成'
      default:
        return ''
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
        'hydrogenAgentRent': '氢原子租金'
      },
      hideInTable: true
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
        'hydrogenAgentRent': '氢原子租金'
      },
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
      end:time?.dateRange?.[1]
    }
    cityItemOrderSum(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.total)
      }
    })
  },[time])

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      cityBusinessDeptId:msgDetail?.cityBusinessDeptId,
      type:type,
      begin:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      end:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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
