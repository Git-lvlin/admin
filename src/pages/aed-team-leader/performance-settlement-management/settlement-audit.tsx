import { useRef,useEffect, useState } from "react"
import { Form, Image, Divider, Button, Space,Checkbox } from 'antd';
import {
  DrawerForm,
  ProFormCheckbox
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { AEDOrder, AEDOrderStats, AEDTrainingsService, AEDTrainingsServiceStats } from "@/services/aed-team-leader/order-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps, DrtailItem } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import styles from './styles.less'
import ForbiddenModel from './forbidden-model'
import RejectModel from './reject-model'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [orderSum,setOrderSum]=useState<number>(0)
  const [time,setTime]=useState<DrtailItem>({})
  const [dataStatus,setDataStatus]=useState([])
  const ref = useRef<ActionType>()
  const [selectedRows, setSelectedRows] = useState([]);
  const [forbiddenVisible, setForbiddenVisible] = useState<boolean>(false)
  const [rejectVisible, setRejectVisible] = useState<boolean>(false)

  const Columns: ProColumns[] = [
    {
      title: '审核本页业绩',
      dataIndex: 'check',
      align: 'left',
      render: (_, data) => {
        return '选中';
      },
      width:70,
      fixed: 'left',
      hideInSearch:true
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '下单用户ID',
      dataIndex: 'buyerId',
      valueType: 'text',
      hideInSearch: true
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
        if(_&&_>0){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '提成金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_,data)=>{
        if(_&&_>0){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '团长手机号',
      dataIndex: 'teamLeaderPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入团长手机号'
      },
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
    },
    {
      title: '收货人姓名',
      dataIndex: 'consignee',
      valueType: 'text',
    },
    {
      title: '订单时间',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true,
      fieldProps:{
        placeholder:['开始时间', '结束时间']
      }
    },
    {
      title: '订单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算状态',
      dataIndex: 'depositOrderStatus',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '已审核',
        2: '待审核',
      }
    },
    {
      title: '结算状态',
      dataIndex: 'depositOrderStatus',
      align: 'center',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        1: '已审核',
        2: '待审核',
      }
    },
  ]

  const handleSelectRows = (rows) => {
    console.log('rows',rows)
    setSelectedRows(rows);
    setDataStatus([])
  };

  const handleCheckAll = (val) => {
    setDataStatus(val)
    if (val[0]) {
      AEDOrder({ agencyId:msgDetail?.agencyId, pageSize:999 }).then(res=>{
        if(res.code==0){
          setSelectedRows(res.data.map(ele=>ele.orderSn));
        }
      })
     
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(()=>{
    const params={
      agencyId:msgDetail?.agencyId,
      orderSn:time?.orderSn,
      startTime:time?.dateRange?.[0],
      endTime:time?.dateRange?.[1],
      teamPhone:time?.teamPhone,
      orderType:time?.orderType,
      contractStatus:time?.contractStatus,
      learnStatus:time?.learnStatus,
      examStatus:time?.examStatus,
      teamLeaderPhone:time?.teamLeaderPhone,
      offTrainStatus:time?.offTrainStatus
    }
    const api=AEDOrderStats
    api(params).then(res=>{
      if(res.code==0){
        type==1? setOrderSum(res?.data?.[0]?.totalPayAmount):setOrderSum(res?.data?.[0]?.totalCommission)
      }
    })
  },[time])

  return (
    <DrawerForm
      layout="horizontal"
      title={<>
        <strong>结算审核</strong>
        <p style={{ color:'#8D8D8D' }}>子公司ID：26    子公司名称：{msgDetail?.name}    结算单号：2038388893    结算状态：待审核    订单类型：AED培训服务套餐订单   申请时间：2023-04-26 18:05:27</p>
      </>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={1400}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: ({ form }) => {
          return (
            <div>
              <Space>
                <span style={{ fontWeight:'bolder', marginRight:'100px' }}>审核通过后，请尽快为用户汇款！</span>
                <Button
                  type="primary"
                  disabled={!selectedRows.length}
                  style={{ backgroundColor:selectedRows.length?'#1890FF':'#A7A7A8', color:'#fff' }}
                  onClick={() => {
                    // form?.submit()
                    setForbiddenVisible(true)
                  }}
                >
                  {selectedRows.length?dataStatus.length?'全部审核通过':'部分审核通过':'审核通过'}
                </Button>
                <Button
                  style={{ backgroundColor:'red', color:'#fff' }}
                  onClick={() => {
                    // form?.resetFields()
                    setRejectVisible(true)
                  }}
                >
                  审核拒绝
                </Button>
              </Space>
            </div>
          )
        }
      }}
      {...formItemLayout}
      className={styles.settlement_performance}
    >
      <div className={styles.hed}>
        <div>
          <p>申请信息</p>
           <div>
            <p>申请备注：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <p>申请附件：<Image /></p>
           </div>
        </div>
        <ProFormCheckbox.Group
          name="checkbox"
          width={300}
          options={[
            {
              label: <strong>审核所有待审核的订单业绩</strong>,
              value: 1,
            }
          ]}
          fieldProps={{
            onChange:handleCheckAll,
            value:dataStatus
          }}
        />
      </div>
      <Divider />
      <ProTable
        rowKey="orderSn"
        columns={Columns}
        request={AEDOrder}
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
          setOrderSum(0)
          setTime(val)
        }}
        onReset={()=>{
          setTime({})
        }}
        // postData={(data)=>{
        //   setDataSource(data)
        //   return data
        // }}
        options={false}
        search={{
          labelWidth:120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: handleSelectRows,
          selectedRowKeys: selectedRows,
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <div>
                <p>AED子公司：{msgDetail?.name}，业绩结算汇款金额 ：<span style={{ color:'red' }}>1000</span> 元（ 2 单）</p>
              </div>
            </div>
          </>
        }}
      />
      {
        forbiddenVisible&&
        <ForbiddenModel
          visible={forbiddenVisible}
          setVisible={setForbiddenVisible}
          msgDetail={selectedRows}
          callback={()=>{ setVisible(false) }}
          onClose={()=>{}}
        />
      }
       {
        rejectVisible&&
        <RejectModel
          visible={rejectVisible}
          setVisible={setRejectVisible}
          msgDetail={selectedRows}
          callback={()=>{ setVisible(false) }}
          onClose={()=>{}}
        />
      }
    </DrawerForm >
  )
}
