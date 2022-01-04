
import React, { useRef, useState } from 'react';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history,connect } from 'umi';
import { findAdminArticleTypeList} from '@/services/cms/member/member';
import AuditModel from './audit-model'
import Journal from './journal';

export default () => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [auditVisible, setAuditVisible] = useState(false);
  const [logTabel, setLogTabel] = useState({})
  const [formDetail , setFormDetail ] = useState({})

  const defaultData= [
    {
      typeName: '水电费水电费',
      typeDesc:'大大方方代发',
      sortNum: '乡村振兴',
      isTop: 80,
      isShow: '1',
    },
    {
      typeName: 'ssdfsdf',
      typeDesc:'啊实打实',
      sortNum: '百货商品',
      isTop: 90,
      isShow: '0',
    },
  ];

  const columns = [
    {
      title: '活动商品',
      dataIndex: 'typeName',
      valueType: 'text',
    },
    {
      title: '集约活动',
      dataIndex: 'typeDesc',
      valueType: 'text',
    },
    {
      title: '店主额外奖励占总额外奖励比例',
      dataIndex: 'sortNum',
      valueType: 'number',
    },
    {
      title: '额外奖励说明',
      dataIndex: 'isTop',
      valueType: 'text',
    },
    {
      title: '更新状态',
      dataIndex: 'isShow',
      valueType: 'select',
      valueEnum: {
        0: '已关闭',
        1: '已启用',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _) => [
        <a
        key="audit"
        onClick={() => {
          setAuditVisible(true)
          setFormDetail(record)
        }}
      >
        审核
      </a>,
        <a 
        key='log'
        onClick={()=>{
          setVisible(true)
          setLogTabel(record.id)
        }}>
          日志
        </a>
      ]
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        columns={columns}
        actionRef={actionRef}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        dateFormatter="string"
        search={false}
        toolBarRender={false}
        pagination={{
          pageSize: 10,
      }}
      />
      {visible && <Journal
        visible={visible}
        setVisible={setVisible}
        {...logTabel}
      />}
      {auditVisible && <AuditModel
        visible={auditVisible}
        setVisible={setAuditVisible}
        {...formDetail}
      />}
    </>
  );
};