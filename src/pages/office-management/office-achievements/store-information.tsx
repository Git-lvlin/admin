import { useEffect, useState } from 'react';
import { Form,List,Divider } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import { findItemPage } from "@/services/office-management/office-achievements"
import { amountTransform } from '@/utils/utils'

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
  const { visible, setVisible, callback,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [detailList,setDetailList]=useState()
  useEffect(()=>{
    findItemPage({businessDeptId:msgDetail?.businessDeptId,userName:msgDetail?.userName}).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  },[])

  const divide=(item)=>{
    switch (type) {
      case 1:
        return amountTransform(item?.totalCommission,'/').toFixed(2)
      case 2:
        return amountTransform(item?.totalSaleCommission,'/').toFixed(2)
      case 3:
        return amountTransform(item?.totalRentCommission,'/').toFixed(2)
      case 4:
        return amountTransform(item?.totalOrderAmount,'/').toFixed(2)
      default:
        return ''
    }
  }

  const divideName=()=>{
    switch (type) {
      case 1:
        return '累计分成'
      case 2:
        return '销售分成'
      case 3:
        return '管理费分成'
      case 4:
        return '累计业绩'
      default:
        return ''
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.businessDeptName} ${divideName()} （ID:${msgDetail?.businessDeptId}）`}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
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
      onFinish={async (values) => {
        setVisible(false)
        callback(true)
      }}
      {...formItemLayout}
    >
      {
        type==4&&<><p>总业绩：{amountTransform(msgDetail?.totalOrderAmount,'/').toFixed(2)}元，总机器：{msgDetail?.totalCount}台（销售{msgDetail?.totalSaleCount}台，租赁{msgDetail?.totalRentCount}台）</p><Divider /></>
      }
       <List
        itemLayout="horizontal"
        dataSource={detailList}
        renderItem={item => (
        <List.Item>
            <List.Item.Meta
            title={<p>{item?.date}</p>}
            description={type==4&&<p>{item?.totalCount}台(销售{item?.totalCount}台，租赁{item?.totalRentCount}台)</p>}
            />
            <div>
              <p>{divide(item)}元</p>
              <p style={{color:'#999999'}}>{type==4?'订单数量':'业绩金额'}：{type==4?`${item?.orderCount}笔`:`${amountTransform(item?.totalOrderAmount,'/').toFixed(2)}元`}</p>
            </div>
        </List.Item>
        )}
       />
    </DrawerForm >
  );
};