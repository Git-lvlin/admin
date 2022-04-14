import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment'
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import DrawerDetail from './detail'
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


export default () => {
    const ref=useRef<ActionType>()
    const [detailVisible,setDetailVisible]=useState<boolean>(false)
    const [pennyId,setPennyId]=useState<number>()
    const [visit, setVisit] = useState<boolean>(false)
    const columns:ProColumns<activityItem>[]= [
      {
        title: '售后编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInTable: true,
      },
      {
        title: '退款编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '缺货申请编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '集约采购单号',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '店主采购单号',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '供应商ID',
        dataIndex: 'ggoid',
        valueType: 'text',
      },
      {
        title: '店主ID',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '退款数量',
        dataIndex: 'shoperLimitAll',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '退款金额',
        dataIndex: 'shoperLimitOnece',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        },
        hideInSearch: true,
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record:any, _, action)=>[
            <a key='detail' onClick={()=>{setDetailVisible(true);setPennyId(record.id)}}>详情</a>,
        ],
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
      const {dateTimeRange,dateTimeRange2,...rest}=searchConfig.form.getFieldsValue()
      return {
        lqStartTime1:dateTimeRange&&moment(dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        lqStartTime2:dateTimeRange&&moment(dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        useStartTime1:dateTimeRange2&&moment(dateTimeRange2[0]).format('YYYY-MM-DD HH:mm:ss'),
        useStartTime2:dateTimeRange2&&moment(dateTimeRange2[1]).format('YYYY-MM-DD HH:mm:ss'),
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
          headerTitle="数据列表"
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
                type={'day-red-detail-export'}
                conditions={()=>{return getFieldValue(searchConfig)}}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type='day-red-detail-export'/>,
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {detailVisible&& <DrawerDetail
          visible={detailVisible}
          setVisible={setDetailVisible}
          id={pennyId} 
          callback={() => { ref.current&&ref.current.reload(); setPennyId(NaN) }}
          onClose={() => { ref.current&&ref.current.reload(); setPennyId(NaN) }}
        />}
        </PageContainer>
    );
  };
