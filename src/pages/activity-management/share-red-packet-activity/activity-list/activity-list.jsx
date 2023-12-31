import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@/components/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { couponInviteList } from '@/services/activity-management/share-red-packet-activity';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@/components/PageContainer';
import { history,connect } from 'umi';
import ShareRule from '../share-packet-rule'



export default () => {
    const ref=useRef()
    const [visible,setVisible]=useState(false)
    const [detailId,setDetailId]=useState()
    const columns= [
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '活动时间',
        dataIndex: 'activityStartTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{data.activityStartTime} 至 {data.activityEndTime}</p>
        }
      },
      {
        title: '阶梯一',
        dataIndex: 'couponOneDisplay',
        valueType: 'text',
      },
      {
        title: '阶梯二',
        dataIndex: 'couponTwoDisplay',
        valueType: 'text',
      },
      {
        title: '阶梯三',
        dataIndex: 'couponThreeDisplay',
        valueType: 'text',
      },
      {
        title: '活动状态',
        dataIndex: 'activityStatus',
        valueType: 'select',
        valueEnum: {
          0: '全部',
          2: '进行中',
          3: '未开始',
          4: '已结束',
          5: '已终止',
        }
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>{setVisible(true);setDetailId(record.id)}}>查看详情</a>
        ],
      }, 
    ];
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          request={couponInviteList}
          scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
          toolBarRender={()=>[
            <Button key='add' icon={<PlusOutlined />}  onClick={()=>setVisible(true)} type="primary">
                添加活动
            </Button>
        ]}
          search={false}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {
          visible&&<ShareRule
          setDetailVisible={setVisible}
          detailVisible={visible}
          id={detailId} 
          callback={() => { ref.current.reload(); setDetailId(null);}}
          onClose={() => { ref.current.reload(); setDetailId(null);}}
          />
        }
        </PageContainer>
    );
  };