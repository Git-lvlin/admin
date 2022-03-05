import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';
import moment from 'moment'
import EndModel from './end-model'



export default () => {
    const ref=useRef()
    const [visible, setVisible] = useState(false);
    const [pennyId,setPennyId]=useState()
    const columns= [
      {
        title: '活动编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
        fieldProps: {
          maxLength:50
        }
      },
      {
        title: '活动时段',
        dataIndex: 'startTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        },
        hideInSearch: true,
      },
      {
        title: '每位店主总限量',
        dataIndex: 'shoperLimitAll',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '每位店主单次限量',
        dataIndex: 'shoperLimitOnece',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '消费者限量',
        dataIndex: 'buyerLimit',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '参与活动的店铺',
        dataIndex: 'joinShopType',
        valueType: 'select',
        valueEnum: {
          1: '生鲜店铺',
        },
        hideInSearch: true,
      },
      {
        title: '参与活动的消费者',
        dataIndex: 'joinBuyerType',
        valueType: 'select',
        valueEnum: {
          1: '全部消费者',
          2: '从未下过单的消费者（新人）',
        },
        hideInSearch: true,
      },
      {
        title: '参与活动的商品',
        dataIndex: 'goodsCount',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '活动状态',
        dataIndex: 'actStatus',
        valueType: 'select',
        valueEnum: {
          0: '已终止',
          1: '进行中',
          2: '待开始',
          3: '已结束'
        },
        hideInTable:true
      },
      {
        title: '状态',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record, _, action)=>[
            <a key='detail' onClick={()=>history.push('/intensive-activity-management/penny-activity/activity-detail?id='+record.id)}>详情</a>,
            <>
             {
               record.statusDisplay=='未开始'||record.statusDisplay=='进行中'?
               <a key='detail' onClick={()=>history.push('/intensive-activity-management/penny-activity/added-activity?id='+record.id)}>编辑</a>:null
             }
            </>,
            <div key='stop' style={{display:record.statusDisplay=='已结束'?'none':'block'}}>
              {
                record.status!=0&&
                <a key='detail' onClick={()=>{setPennyId(record.id);setVisible(true)}}>终止</a>
              }
            </div>
        ],
      }, 
    ];
    const postData=(data)=>{
      const arr=data.map(ele=>({
        shoperLimitAll:ele.content?.shoperLimitAll,
        shoperLimitOnece:ele.content?.shoperLimitOnece,
        buyerLimit:ele.content?.buyerLimit,
        joinShopType:ele.content?.joinShopType,
        joinBuyerType:ele.content?.joinBuyerType,
        goodsCount:ele.content?.goodsCount,
        ...ele
      }))
      return arr
    }
    return (
      <PageContainer>
        <ProTable
          actionRef={ref}
          rowKey="id"
          options={false}
          params={{
            actCode:'wsCentActiveCode'
          }}
          request={getActiveConfigList}
          postData={postData}
          toolBarRender={()=>[
            <Button key='add' icon={<PlusOutlined />}  onClick={()=>history.push('/intensive-activity-management/penny-activity/added-activity')} type="primary">
                新建
            </Button>
        ]}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {
          visible&&<EndModel 
          visible={visible} 
          setVisible={setVisible}  
          pennyId={pennyId} 
          canBlack={()=>{ref.current.reload();setPennyId(null)}}
          onClose={()=>{ref.current.reload();setPennyId(null)}}
          />
        }
        </PageContainer>
    );
  };