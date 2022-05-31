import { useEffect, useState } from 'react';
import { Form,List } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
// import ProList from '@ant-design/pro-list';
import { getStoreList } from '@/services/intensive-store-management/store-list';
import type { GithubIssueItem } from "./data"

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
    getStoreList({agencyId:msgDetail?.agencyId,vip:type,size:type==1?msgDetail?.vipStoreNums:msgDetail?.commonStoreNums}).then(res=>{
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
      {/* <ProList<GithubIssueItem>
        search={{}}
        rowKey="name"
        headerTitle="基础列表"
        request={getStoreList}
        pagination={{
          pageSize: 5,
        }}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'storeName',
            title: '用户',
          },
          avatar: {
            dataIndex: 'avatar',
            search: false,
          },
          description: {
            dataIndex: 'title',
            search: false,
          },
        }}
      /> */}
      <List
        itemLayout="horizontal"
        dataSource={detailList}
        pagination={{
          pageSize: 5,
        }}
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