import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
import { cardCityAgencyOrderPmDetail } from '@/services/health-package-activities/health-package-performance-statistics'
import { useEffect, useState } from 'react';
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
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();

  return (
    <DrawerForm
      title={` 店铺 ${msgDetail?.houseNumber}  绑定套餐订单明细`}
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
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
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
    >
      <p style={{ padding:'10px 10px',background:"#B6B6B6",color:'#fff' }}>店主：{msgDetail?.memberPhone}   绑定套餐订单数： {msgDetail?.orderNums}单</p>
      <ProList
        search={false}
        rowKey="name"
        request={cardCityAgencyOrderPmDetail}
        params={{
          storeNo:msgDetail?.storeNo,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        split={true}
        metas={{
          title: {
            dataIndex: 'packageName',
          },
          description: {
            dataIndex: 'cardNum',
            render:(_,data)=>{
              return <div>
                      <p>{data?.createTime}</p>
                      <p>{data?.cardNum?data?.cardNum:0}次</p>
                     </div>
            }
          },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}>订单金额：{amountTransform(row?.payAmount,'/').toFixed(2)}</p><br/>
              <p style={{color:'#999999',float:'right'}}>订单号：{row?.orderSn} <br/>下单人：{row?.memberPhone}</p>
            </div> 
            )
          }
        }}
      />
    </DrawerForm >
  );
};
