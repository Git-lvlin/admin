import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { feedbackList} from '@/services/user-management/user-feedback';
import { PageContainer } from '@ant-design/pro-layout';
import { Image,Space } from 'antd';
import DetailModel from './detail-model'
import type { ProColumns,ActionType } from '@ant-design/pro-table';

type activityItem={
  createName:string;
  createIcon:string;
  mobile:number;
  parentType:string;
  content:string;
  model:string;
  system:string;
  status:number;
}

// interface ItemProps {
//   createName:string;
//   createIcon:string;
// }

export default () => {
    const ref=useRef<ActionType>()
    const [visible, setVisible] = useState<boolean>(false);
    const [detailId,setDetailId]=useState<number>()
    const columns:ProColumns<activityItem>[]= [
      {
        title: '反馈用户',
        dataIndex: 'createName',
        valueType: 'text',
        render:(_,data)=>{
          return <Space style={{display:'flex'}}>
                  <Image src={data?.createIcon} height={50} width={50} />
                  <p>{_}</p>
                </Space>
        },
        hideInSearch: true
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        valueType: 'text',
        hideInTable: true,
        fieldProps:{
          placeholder: '输入手机号'
        }
      },
      {
        title: '联系手机',
        dataIndex: 'mobile',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '类型',
        dataIndex: 'parentType',
        valueType: 'text',
        valueEnum: {
          0: '全部类型',
          1: '功能异常',
          2: '客户投诉',
          3: '使用建议'
        },
        hideInTable: true,
      },
      {
        title: '类型',
        dataIndex: 'parentType',
        valueType: 'text',
        hideInSearch: true,
        render:(_,data)=>{
          return <>
            <p>{_}</p>
            <p>{data['type']}</p>
          </>
        }
      },
      {
        title: '内容',
        dataIndex: 'content',
        valueType: 'text',
        hideInTable: true,
        fieldProps:{
          placeholder: '输入关键字'
        }
      },
      {
        title: '反馈内容',
        dataIndex: 'content',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '系统',
        dataIndex: 'model',
        valueType: 'select',
        valueEnum: {
          0: '所有系统',
          1: 'IOS',
          2: '安卓',
        },
        hideInTable: true,
      },
      {
        title: '系统和型号',
        dataIndex: 'system',
        valueType: 'text',
        hideInSearch: true,
        render:(_,data)=>{
          return <>
            <p>{_}</p>
            <p>{data.model}</p>
          </>
        }
      },
      {
        title: 'APP版本',
        dataIndex: 'version',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: 'APP版本',
        dataIndex: 'version',
        valueType: 'select',
        valueEnum: {
          0: 'V1.0',
          1: 'V1.1',
          2: 'V2.0',
          3: 'V2.1',
          4: 'V2.2',
          5: 'V2.3',
          6: 'V2.4',
          7: 'V2.5',
        },
      },
      {
        title: ' 状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          0: '全部状态',
          1: '待处理',
          2: '已处理',
        },
        hideInTable: true,
      },
      {
        title: ' 状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          1: '待处理',
          2: '已处理',
        },
        hideInSearch: true,
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record:any, _, action)=>[
            <a key='detail' onClick={()=>{setVisible(true);setDetailId(record.id)}}>查看详情</a>,
        ],
      }, 
    ];
    const postData=(data: any[])=>{
    //   const arr=data.map((ele)=>({
    //     shoperLimitAll:ele.content?.shoperLimitAll,
    //     shoperLimitOnece:ele.content?.shoperLimitOnece,
    //     buyerLimit:ele.content?.buyerLimit,
    //     joinShopType:ele.content?.joinShopType,
    //     joinBuyerType:ele.content?.joinBuyerType,
    //     goodsCount:ele.content?.goodsCount,
    //     ...ele
    //   }))
      return data
    }
    return (
      <PageContainer>
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          request={feedbackList}
          postData={postData}
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
          visible&&<DetailModel
          visible={visible} 
          setVisible={setVisible}  
          detailId={detailId} 
          canBlack={()=>{ref.current&&ref.current.reload();setDetailId(NaN)}}
          onClose={()=>{ref.current&&ref.current.reload();setDetailId(NaN)}}
          />
        }
        </PageContainer>
    );
  };