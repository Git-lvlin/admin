import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
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
import type { GithubIssueItem, DevicesProps,CumulativeProps } from "./data"
import type { ProColumns } from "@ant-design/pro-table"
import styles from './styles.less'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import ProCard from "@ant-design/pro-card"
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

const CumulativePerformance=(props:DevicesProps) => {
  const { type,msgDetail } = props
  const [orderSum,setOrderSum]=useState()
  const [time,setTime]=useState<GithubIssueItem>()
  const ref = useRef()
  const [visit, setVisit] = useState<boolean>(false)

  const divideName=()=>{
    switch (type) {
      case 'teamHydrogen':
        return teamHydrogen
      case 'wholesaleOrder':
        return wholesaleOrder
      case 'healthyCard':
        return healthyCard
      case 'hydrogenBoot':
        return hydrogenBoot
      case 'hydrogenRent':
        return hydrogenRent
      default:
        return ''
    }
  }

  const hydrogenSum=()=>{
    switch (type) {
      case 'teamHydrogen':
        return hydrogenStats
      case 'wholesaleOrder':
        return wholesaleOrderStats
      case 'healthyCard':
        return healthyCardStats
      case 'hydrogenBoot':
        return hydrogenBootStats
      case 'hydrogenRent':
        return hydrogenRentStats
      default:
        return ''
    }
  }

  const exportCode=()=>{
    switch (type) {
      case 'teamHydrogen':
        return 'tmHydrogen'
      case 'wholesaleOrder':
        return 'tmWholesaleOrder'
      case 'healthyCard':
        return 'tmHealthyCard'
      case 'hydrogenBoot':
        return 'tmHydrogenBoot'
      case 'hydrogenRent':
        return 'tmHydrogenRent'
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
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '客户手机',
      dataIndex: 'teamPhone',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder:'请输入当前大团队长的客户手机号码'
      },
      order: -1
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
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
    // {
    //   title: '店铺编号',
    //   dataIndex: 'shopMemberAccount',
    //   align: 'center',
    // }
  ]
  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      orderSn:time?.orderSn,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      teamPhone:time?.teamPhone
    }
    var api=hydrogenSum()
    api(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data[0]?.payAmount)
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
       <ProTable<GithubIssueItem>
        rowKey="agencyId"
        columns={Columns}
        request={divideName()}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          agencyId:msgDetail?.agencyId
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
                累计金额：
                <span>￥{amountTransform(orderSum,'/').toFixed(2)}</span>
              </div>
            </div>
          </>
        }}
      />
  );
};


export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState<string>('teamHydrogen')
  return (
      <DrawerForm
        title={`${msgDetail?.managerPhone} 累计业绩 （ID:${msgDetail?.agencyId}）`}
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
        {...formItemLayout}
        className={styles.store_information}
      >
       <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="teamHydrogen" tab="氢原子全款销售">
          {
            activeKey=='teamHydrogen'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="wholesaleOrder" tab="新集约商品批发订单">
          {
            activeKey=='wholesaleOrder'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="healthyCard" tab="健康套餐订单">
          {
            activeKey=='healthyCard'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="hydrogenBoot" tab="启动费">
          {
            activeKey=='hydrogenBoot'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="hydrogenRent" tab="缴纳租赁管理费">
          {
            activeKey=='hydrogenRent'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </DrawerForm >
  )
}

