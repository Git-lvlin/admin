import { useRef, useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { purchaseUnshippedOrder, undeliverDetail } from '@/services/supplier-management/timeout-failed-deliver-supplier'
import type { CumulativeProps } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import TimeSelect from '@/components/time-select'
import { amountTransform } from "@/utils/utils";
import RangeOvertime0rder from './range-overtime-order';
import moment from "moment";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible, msgDetail, activeKey } = props;
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()
  const [visit, setVisit] = useState(false)
  const [timeDay, setTimeDay] = useState<number>(5)

  const getFieldValue = (searchConfig) => {
    const {dateTimeRange, payTimeDay=5, overDay=5, ...rest}=searchConfig.form.getFieldsValue()
    if(activeKey=='1'){
      return {
        payTimeStart:dateTimeRange&&moment(dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        payTimeEnd:dateTimeRange&&moment(dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        payTimeDay: payTimeDay,
        supplierId: msgDetail?.supplierId,
        ...rest,
      }
    }else{
      return {
        payTimeStart:dateTimeRange&&moment(dateTimeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        payTimeEnd:dateTimeRange&&moment(dateTimeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        overDay: overDay,
        supplierId: msgDetail?.supplierId,
        ...rest,
      }
    }
  }

  const Columns: ProColumns[] = [
    {
      title: '订单类型',
      dataIndex:activeKey=='1'?'orderTypeDesc':'orderType',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: activeKey=='1'?'orderSn':'subOrderSn',
      align: 'center',
    },
    {
      title: '商品名称',
      dataIndex: activeKey=='1'?'goodsName':'goodName',
      align: 'center',
      width: 200
    },
    {
      title: '商品件数',
      dataIndex: activeKey=='1'?'skuNum':'buySkuNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '实付金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '下单人手机号',
      dataIndex: activeKey=='1'?'phoneNumber':'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单用户ID',
      dataIndex: activeKey=='1'?'buyerId':'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间距今已过天数',
      dataIndex: activeKey=='1'?'payTimeDay':'earliestDay',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'dateTimeRange',
      align: 'center',
      renderFormItem: () => <TimeSelect beforePlaceholder="最早时间" afterPlaceholder="最晚时间"/>,
      hideInTable: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '',
      dataIndex: activeKey=='1'?'payTimeDay':'overDay',
      hideInTable: true,
      renderFormItem: () => <RangeOvertime0rder />,
    },
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
               <p>首页 /  供应商管理 / 超时未发货供应商 / 超时未发货订单明细 {activeKey=='1'?'（普通订单）':'（集约订单）'}</p>
               <p style={{ color:'#8D8D8D' }}>供应商ID：{msgDetail?.supplierId}    供应商名称：{msgDetail?.supplierName}</p>
             </>
      }
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={1400}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
        }
      }}
      submitter={{
        render: ({ form }) => {
          return []
        }
      }}
      {...formItemLayout}
    >
      <ProTable
        rowKey="id"
        columns={Columns}
        request={activeKey=='1'?undeliverDetail:purchaseUnshippedOrder}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          supplierId:activeKey=='1'? msgDetail?.supplierId:msgDetail?.supplierId
        }}
        options={false}
        search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                key='export'
                change={(e) => { setVisit(e) }}
                type={activeKey=='1'?'supplier-undeliver-detail':'export_supplier_purchaseUnshippedOrder'}
                conditions={()=>{return getFieldValue(searchConfig)}}
                fileName={`供应商ID${activeKey=='1'? msgDetail?.supplierId:msgDetail?.supplierId}超过${timeDay}天未发货订单明细`}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type={activeKey=='1'?'supplier-undeliver-detail':'export_supplier_purchaseUnshippedOrder'}/>,
            ],
          }}
        onSubmit={(params)=>{
          setTimeDay(activeKey=='1'?params?.payTimeDay:params?.overDay)
        }}
      />
    </DrawerForm >
  )
}
