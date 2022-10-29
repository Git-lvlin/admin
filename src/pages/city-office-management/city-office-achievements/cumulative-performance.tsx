import { useRef,useEffect, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { cityTotalTradeItemListPage,cityTotalTradeItemSum } from "@/services/city-office-management/city-office-achievements"
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
  const [time,setTime]=useState({})
  const ref = useRef()
  const [visit, setVisit] = useState<boolean>(false)

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
      title: '下单人手机号',
      dataIndex: 'buyerMobile',
      align: 'center',
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
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
    }
  ]
  useEffect(()=>{
    const params={
      cityBusinessDeptId:msgDetail?.cityBusinessDeptId,
      orderType:type,
      orderNo:time?.orderNo,
      begin:time?.dateRange?.[0],

      
      end:time?.dateRange?.[1]
    }
    cityTotalTradeItemSum(params).then(res=>{
      if(res.code==0){
        setOrderSum(res?.data?.totalAmount)
      }
    })
  },[time])

  const getFieldValue = (searchConfig) => {
    const {dateRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      cityBusinessDeptId:msgDetail?.cityBusinessDeptId,
      orderType:type,
      begin:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      end:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
  return (
       <ProTable<GithubIssueItem>
        rowKey="date"
        columns={Columns}
        request={cityTotalTradeItemListPage}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          orderType:type,
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
              type={'exportCityTotalTradeItemList'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'exportCityTotalTradeItemList'}/>
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
  const [activeKey, setActiveKey] = useState<string>('hydrogenAgent')
  return (
      <DrawerForm
        title={`${msgDetail?.cityBusinessDeptName} 累计业绩 （ID:${msgDetail?.cityBusinessDeptId}）`}
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
        <ProCard.TabPane key="hydrogenAgent" tab="托管购买订单">
          {
            activeKey=='hydrogenAgent'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="operatorEquipment" tab="缴纳培训服务费">
          {
            activeKey=='operatorEquipment'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="hydrogenAgentRent" tab="缴纳租赁管理费">
          {
            activeKey=='hydrogenAgentRent'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="hydrogen" tab="全款购买订单">
          {
            activeKey=='hydrogen'&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="hydrogenBoot " tab="启动费">
          {
            activeKey=='hydrogenBoot '&&<CumulativePerformance type={activeKey} msgDetail={msgDetail}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </DrawerForm >
  )
}

