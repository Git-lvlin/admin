import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { findAdsensePositionList } from '@/services/community-management/adsense-position-list';
import { findAdsensePositionById } from '@/services/community-management/adsense-position-byid';
import { saveAdsensePosition } from '@/services/community-management/adsense-position';
import  ProForm,{ ModalForm,ProFormRadio,ProFormText} from '@ant-design/pro-form';
import { Button,Form, Tabs,message } from 'antd';
import AdvertisingModal from './advertising-modal'
import { render } from 'react-dom';

export default props => {
const ref=useRef()
let id = props.location.query.id
const [visible, setVisible] = useState(false);
const [visible2, setVisible2] = useState(false);
const [form] = Form.useForm()
const [byid,setByid]=useState()
const Termination=(record)=>{
  setVisible(true)
  setByid(record)
}
const addPosition=()=>{
  setVisible2(true)
}
const columns= [
  {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch:true
  },
  {
      title: '广告位名称',
      dataIndex: 'title',
      valueType: 'text',
      hideInSearch:true
  },
  {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      valueEnum:{
        "0":"未启用",
        "1":"已启用",
      },
      hideInSearch:true
  },
  {
      title:'操作',
      valueType:'text',
      render:(text, record, _, action)=>[
        <Button onClick={()=>Termination(record)}>编辑</Button>,
        // <AdvertisingModal visible={visible} setVisible={setVisible}  boxref={ref}/>
      ],
      hideInSearch:true
  }
];
  return (
      <PageContainer>
          <ProTable
            rowKey="userId"
            options={false}
            params={{
              page:0,
              size:5,
              sourceId:id,
              status:1,
            }}
            request={findAdsensePositionList}
            actionRef={ref}
            search={{
              optionRender:(searchConfig, formProps, dom) => [
              <Button type="primary" onClick={addPosition} key="refresh">
                添加
              </Button>,
              <AdvertisingModal visible={visible2} setVisible={setVisible2}  boxref={ref}/>
              ],
            }}
            toolBarRender={false}
            columns={columns}
          />
        
    </PageContainer>
  );
};
