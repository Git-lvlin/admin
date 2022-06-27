import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@/components/PageContainer';
import Edit from './form';
import { seckillingClassList } from '@/services/cms/member/goos-reg';
import { ACTION_TYPE } from '@/utils/text';
import ProCard from '@ant-design/pro-card';
import EndModel from './end-model'
import styles from './style.less'

const CrazyDate = ( props ) => {
  const { status } = props
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(false);
  const [visible, setVisible] = useState(false);
  const [goDetail, setGoDetail] = useState(false)
  const [copy, setCopy] = useState(false)

  const columns = [
    {
      title: '活动标题',
      dataIndex: 'activityName',
      valueType: 'text',
      hideInTable: true
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '活动开始时间',
      dataIndex: 'activityStartTime',
      valueType: 'dateTime',
      hideInTable: true
    },
    {
      title: '开始时间',
      dataIndex: 'activityStartTime',
      valueType: 'text',
      search: false
    },
    {
      title: '结束时间',
      dataIndex: 'activityEndTime',
      valueType: 'text',
      search: false
    },
    {
      title: '限购',
      dataIndex: 'limitBuyType',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        1: '不限购',
        2: '限购',
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        1: '未开始',
        2: '进行中',
        3: '已结束',
        4: '已终止'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _,) => {
        return [
            <a key="editable" onClick={() => {setFormVisible(true);setGoDetail(record)}}>编辑</a>,
            <a key="copy" onClick={() => { setFormVisible(true);setGoDetail(record);setCopy('copy') }}>复制</a>,
            <>
              {
                record.status==3||record?.status==4?
                null
                :
                <a key="stop" onClick={() => {setVisible(true);setGoDetail(record)}}>终止</a>
              }
            </>
        ]
      }
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        params={{
          status
        }}
        options={false} 
        columns={columns}
        actionRef={actionRef}
        request={seckillingClassList}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        toolBarRender={(_,record) => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { setFormVisible(true) }}>
            新建活动
          </Button>,
        ]}
        className={styles.crazy_date}
      />
      {formVisible && <Edit
        visible={formVisible}
        setVisible={setFormVisible}
        id={goDetail?.id}
        copy={copy}
        callBack={()=>{actionRef.current.reset();setGoDetail(null);setCopy(null)}}
        onClose={()=>{actionRef.current.reset();setGoDetail(null);setCopy(null)}}
      />}

      {visible && <EndModel
        visible={visible}
        setVisible={setVisible}
        id={goDetail?.id}
        callBack={()=>{actionRef.current.reset();setGoDetail(null)}}
        onClose={()=>{actionRef.current.reset();setGoDetail(null)}}
      />}
    </>
  );
};


export default ()=> {
  const [activeKey, setActiveKey] = useState('0')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="0" tab="全部">
          {
            activeKey == '0' && <CrazyDate status={activeKey}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="1" tab="未开始">
          {
            activeKey == '1' && <CrazyDate status={activeKey}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="进行中">
          {
            activeKey == '2' && <CrazyDate status={activeKey}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="已结束">
          {
            activeKey == '3' && <CrazyDate status={activeKey}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}