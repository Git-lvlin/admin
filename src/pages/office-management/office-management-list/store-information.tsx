import { useEffect, useState } from 'react';
import { Form,List } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import { getStoreList } from '@/services/intensive-store-management/store-list';

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
    getStoreList({agencyId:msgDetail?.agencyId,vip:type}).then(res=>{
        setDetailList(res.data)
    })

  },[])
  return (
    <DrawerForm
      title={`${type==1?'VIP社区店':'普通社区店'}（ID:${msgDetail?.agencyId}）`}
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
      onFinish={async (values) => {
        setVisible(false)
        callback(true)
      }}
      {...formItemLayout}
    >
      <List
        itemLayout="horizontal"
        dataSource={detailList}
        renderItem={item => (
        <List.Item>
            <List.Item.Meta
            title={<p>{item?.storeName}</p>}
            description={<p>{item?.status?.desc}</p>}
            />
            <div>
              <p style={{float:'right'}}>{item?.auditTime} <span>审核通过</span></p><br/>
              <p style={{color:'#999999',float:'right'}}>{item?.areaInfo['1964']} {item?.areaInfo['1988']} {item?.areaInfo['1992']} {item?.address}</p>
            </div>
        </List.Item>
        )}
       />
    </DrawerForm >
  );
};