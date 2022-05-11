import { useEffect, useState } from "react"
import { 
  DrawerForm,
} from '@ant-design/pro-form'
import { Button } from 'antd';
import moment from 'moment'
import { amountTransform } from '@/utils/utils'
import ProTable,{ ProColumns } from '@ant-design/pro-table';
import type{ FC } from "react"
import type { ModalFormProps, OptProps, InfoProps,SubsidyOrderItem } from "./data"
import { opt, findStartPage } from '@/services/hydrogen-atom-management/equipment-management'


const formItemLayout = {
    labelCol: { span: 7 },
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

const ShareTheSubsidyOrder: FC<ModalFormProps> = (props) => {
  const { visible, setVisible, id, type, refs, phone, onClose } = props
  const [info, setInfo] = useState<InfoProps>()

  useEffect(()=> {
    findStartPage({
      imei: id
    }).then(res => {
      setInfo(res.data)
    })
    return ()=> {
      setInfo({})
    }
  }, [])
  
  const submit = (v: OptProps) => {
    new Promise((resolve, reject) => {
      opt({
        imei: id,
        type,
        phone,
        remark: v.remark
      },
      {
        showSuccess: true,
        showError: true
      }
      ).then(res => {
        if(res.success) {
          refs.current?.reload()
          resolve('')
        }else {
          reject()
        }
      })
    })
  }

  const columns:ProColumns<SubsidyOrderItem>[]= [
    {
      title: '订单编号',
      dataIndex: 'memberPhone',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入订单编号'
      }, 
      order:6,
      render:(_)=>{
        return <a onClick={()=>{}}>{_}</a>
      }
    },
    {
      title: '商品名称',
      dataIndex: 'memberPhone',
      valueType: 'text',
      order:4,
      render:(_)=>{
          return <a onClick={()=>{}}>{_}</a>
      }
    },
    {
      title: '商品spuID',
      dataIndex: 'isShopkeeper',
      valueType: 'select',
      hideInSearch : true,
      render:(_)=>{
        return <a onClick={()=>{setOrderVisible(true);setSubOrderId()}}>{_}</a>
      }
    },
    {
      title: 'skuID',
      dataIndex: 'skuID',
      valueType: 'text',
      hideInTable :true,
      fieldProps:{
        placeholder:'请输入商品skuID'
      },
      order:5
    },
    {
      title: '商品skuID',
      dataIndex: 'isShopkeeper',
      valueType: 'select',
      hideInSearch: true,
       render:(_)=>{
        return <a onClick={()=>{setOrderVisible(true);setSubOrderId()}}>{_}</a>
      }
    },
    {
      title: '商品数量',
      dataIndex: 'storeNo',
      valueType: 'text',
      hideInSearch : true,
    },
    {
      title: '订单金额',
      dataIndex: 'storeName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '下单手机号',
      dataIndex: 'text',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入会员手机号'
      }, 
      hideInTable: true,
      order:1
    },
    {
      title: '买家手机号',
      dataIndex: 'text',
      valueType: 'text',
      hideInSearch: true,
      render:(_)=>{
        return <a onClick={()=>{}}>{_}</a>
      }
    },
    {
      title: '下单时间',
      dataIndex: 'dateTimeRange',
      valueType: 'dateTimeRange',
      order:2
    },
    {
      title: '补贴状态',
      dataIndex: 'deviceUseTime',
      valueType: 'text',
      hideInTable: true,
      valueEnum:{
          0: '全部',
          1: '待结算',
          2: '已结算',
          3: '失效'
      },
      order:3
    },
    {
      title: '补贴状态',
      dataIndex: 'deviceUseTime',
      valueType: 'text',
      hideInSearch: true,
      valueEnum:{
        1: '待结算',
        2: '已结算',
        3: <>
            <p>失效</p>
            <span style={{color:'#F0924F'}}>买家已退款</span>
            </>
      },
    },
    {
      title: '补贴金额',
      dataIndex: 'deviceUseTime',
      valueType: 'text',
      hideInSearch: true,
      render:(_)=>{
          return amountTransform(_,'/')
      }
    },
    {
      title: '支付时间',
      dataIndex: 'dateTimeRange',
      valueType: 'dateTimeRange',
      hideInSearch: true
    }
  ];

  return (
    <DrawerForm
      visible={visible}
      onFinish={async (values) => {
        submit(values)
        return true
      }}
      layout='horizontal'
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      title={<p>中粮创芯店   总补贴3618.63元（分享订单：78单   分享订单金额：702318.62元   分享用户：53名）</p>}
      {...formItemLayout}
      width={1000}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="default" onClick={() => {setVisible(false);onClose()}}>
                返回
              </Button>
            ];
          }
        }
      }
    >
        <ProTable<SubsidyOrderItem>
          rowKey="id"
          options={false}
        //   request={consumerOrderPage}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
    </DrawerForm>
  )
}

export default ShareTheSubsidyOrder