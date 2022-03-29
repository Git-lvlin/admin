import { useState, useRef } from 'react';
import { Button} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment'
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

type activityItem={
  id:number;
  name:string;
  startTime:number;
  endTime:number;
  shoperLimitAll:number;
  buyerLimit:number;
  joinShopType:number;
  joinBuyerType:number;
  goodsCount:number;
  actStatus:number;
  statusDisplay:string
}

// interface ItemProps {
//   id:number;
//   statusDisplay:string;
//   status: number;
// }

export default () => {
    const ref=useRef<ActionType>()
    const [visible, setVisible] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [detailVisible,setDetailVisible]=useState<boolean>(false)
    const [pennyId,setPennyId]=useState<number>()
    const [visit, setVisit] = useState<boolean>(false)
    const columns:ProColumns<activityItem>[]= [
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
        title: '集约开始时间',
        dataIndex: 'startTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        },
        hideInSearch: true,
      },
      {
        title: 'spuid',
        dataIndex: 'shoperLimitAll',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: 'skuid',
        dataIndex: 'shoperLimitOnece',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '商品名称',
        dataIndex: 'buyerLimit',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '类型',
        dataIndex: 'joinShopType',
        valueType: 'select',
        valueEnum: {
          1: '生鲜店铺',
        },
        hideInSearch: true,
      },
      {
        title: '规格/箱规',
        dataIndex: 'joinBuyerType',
        valueType: 'select',
        valueEnum: {
          1: '全部消费者',
          2: '从未下过单的消费者（新人）',
        },
        hideInSearch: true,
      },
      {
        title: '单位',
        dataIndex: 'goodsCount',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '份数',
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
        title: '总数量',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '供货价',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '集约价',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '店主起订量',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '定价盈亏（元）',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '运营中心提成（元）',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '平台净利润（元）',
        dataIndex: 'statusDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
    ];
    const postData=(data: any[])=>{
      const arr=data.map((ele)=>({
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
    const getFieldValue = (searchConfig) => {
        const {dateTimeRange,...rest}=searchConfig.form.getFieldsValue()
        return {
          startTime1:dateTimeRange&&dateTimeRange[0],
          startTime2:dateTimeRange&&dateTimeRange[1],
          ...rest,
        }
      }
    return (
      <PageContainer>
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          params={{
            actCode:'wsCentActiveCode'
          }}
          request={getActiveConfigList}
          postData={postData}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
                key='export'
                change={(e) => { setVisit(e) }}
                type={'bind-box-use-detail-export'}
                conditions={getFieldValue(searchConfig)}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'bind-box-use-detail-export'}/>
        ],
        }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        </PageContainer>
    );
  };