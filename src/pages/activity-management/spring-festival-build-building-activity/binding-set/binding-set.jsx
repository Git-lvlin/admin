import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { getBuildhouseIncomeList } from '@/services/activity-management/spring-festival-build-building-activity';
import { PageContainer } from '@ant-design/pro-layout';
import BindingModel from './binding-model'



export default () => {
    const ref=useRef()
    const [visible, setVisible] = useState(false);
    const [formDetail, setFormDetail] = useState({})
    const columns= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '用户名',
        dataIndex: 'memberNicheng',
        valueType: 'text',
      },
      {
        title: '用户手机号',
        dataIndex: 'memberMobile',
        valueType: 'text',
      },
      {
        title: '绑定支付宝账号',
        dataIndex: 'memberMobile',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '可修改绑定次数',
        dataIndex: 'num',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>{setVisible(true);setFormDetail({record,type:1})}}>编辑</a>,
            <a onClick={()=>{setVisible(true);setFormDetail({record,type:2})}}>绑定记录</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          options={false}
          request={getBuildhouseIncomeList}
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
        {visible && <BindingModel
        visible={visible}
        setVisible={setVisible}
        formDetail={formDetail}
        onClose={()=>{ref.current.reload();setFormDetail(null)}}
        callback={()=>{ref.current.reload();setFormDetail(null)}}
      />}
        </PageContainer>
    );
  };