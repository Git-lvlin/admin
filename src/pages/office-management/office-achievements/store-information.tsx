import { useRef } from "react"
import { Form,List,Divider } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
import ProTable from "@ant-design/pro-table"
import { findItemPage } from "@/services/office-management/office-achievements"
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
  const ref = useRef<FormInstance>()
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
      dataIndex: 'businessDeptId',
      align: 'center',
    },
    {
      title: '订单类型',
      dataIndex: 'dateRange',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        1: '氢原子组金'
      },
      hideInTable: true,
    },
    {
      title: '订单类型',
      dataIndex: 'dateRange',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'businessDeptName',
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
      dataIndex: 'totalCommission',
      align: 'center',
      render: (_,data)=>{
        if(parseFloat(_)){
          return <p>{divideName()}：￥{amountTransform(_,'/').toFixed(2)}</p>
        }else{
          return _
        }
      },
      hideInSearch: true
    }
  ]
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
      {
        type==3&&<><p>总业绩：{amountTransform(msgDetail?.totalOrderAmount,'/').toFixed(2)}元，总缴费：{msgDetail?.totalCount}单（销售{msgDetail?.totalSaleCount}单，交管理费{msgDetail?.totalRentCount}单）</p><Divider /></>
      }
       <ProTable<GithubIssueItem>
        rowKey="date"
        columns={Columns}
        request={findItemPage}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                累计：
                <span>￥280958.05</span>
              </div>
            </div>
          </>
        }}
      />
      {/* <ProList<GithubIssueItem>
        search={false}
        rowKey="name"
        request={findItemPage}
        params={{
          businessDeptId:msgDetail?.businessDeptId,
          userName:msgDetail?.userName,
          type:type
        }}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        split={true}
        metas={{
          title: {
            dataIndex: 'date',
          },
          // description: {
          //   dataIndex: 'totalCount',
          //   render:(_,data)=>{
          //     if(type==3){
          //       return <p>{data?.totalCount}台(销售{data?.totalSaleCount}台，租赁{data?.totalRentCount}台)</p>
          //     }
          //   }
          // },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}>{divide(row)}元</p><br/>
              <p style={{color:'#999999',float:'right'}}>{type==3?`${row?.totalCount}单（其中管理费${row?.totalRentCount}单）`:`业绩金额：${amountTransform(row?.totalOrderAmount,'/').toFixed(2)}元`}</p>
            </div> 
            )
          }
        }}
      /> */}
    </DrawerForm >
  );
};