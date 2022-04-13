import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { DrawerForm } from '@ant-design/pro-form';
import moment from 'moment'
import { Form,Button} from 'antd';
import type { ProColumns,ActionType } from '@ant-design/pro-table';
// import ActivityDetail from '../activity-detail'


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

const formItemLayout = {
    labelCol: { span: 2 },
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
    const {visible,setVisible,onClose,callback}=props
    const ref=useRef<ActionType>()
    const [form] = Form.useForm();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [detailVisible,setDetailVisible]=useState<boolean>(false)
    const [dataVisible,setDatalVisible]=useState<boolean>(false)
    const [pennyId,setPennyId]=useState<number>()
    const columns:ProColumns<activityItem>[]= [
      {
        title: '采购单号',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '订单类型',
        dataIndex: 'id',
        valueType: 'select',
        // hideInSearch: true,
        valueEnum: {
          0: '全部',
          1: '散装生鲜',
          2: '集约生鲜',
        },
      },
      {
        title: '集约活动编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '收货方',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '采购商品',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '库存单位',
        dataIndex: 'ggoid',
        valueType: 'text',
      },
      {
        title: '采购数量',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '采购总金额',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '订单状态',
        dataIndex: 'shoperLimitAll',
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
    const onsubmit=()=>{
        setVisible(false)
        callback(true)
    }
    return (
        <DrawerForm
            title='新建申请'
            onVisibleChange={setVisible}
            visible={visible}
            width={1500}
            form={form}
            drawerProps={{
            forceRender: true,
            destroyOnClose: true,
            onClose: () => {
                onClose();
            }
            }}
            submitter={{
                render: (props, defaultDoms) => {
                    return [
                    ...defaultDoms
                    ];
                },
            }}
            onFinish={async ()=>{
            await  onsubmit();
            }}
            {...formItemLayout}
        >
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
          ],
          }}
          toolBarRender={() => [
            <Button key="3" type="primary" disabled onClick={()=>{}}>
              申请
            </Button>,
          ]}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {/* {detailVisible&& <ActivityDetail
          visible={detailVisible}
          setVisible={setDetailVisible}
          id={pennyId} 
          callback={() => { ref.current&&ref.current.reload(); setPennyId(NaN) }}
          onClose={() => { ref.current&&ref.current.reload(); setPennyId(NaN) }}
        />} */}
        </DrawerForm>
    );
  };
