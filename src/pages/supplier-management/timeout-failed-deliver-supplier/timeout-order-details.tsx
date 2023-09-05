import { useRef, useState } from "react"
import { Form, Select } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { purchaseUnshippedOrder } from '@/services/supplier-management/timeout-failed-deliver-supplier'
import type { CumulativeProps } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import TimeSelect from '@/components/time-select'
import {
    ProFormFieldSet,
  } from '@ant-design/pro-form';
import { amountTransform } from "@/utils/utils";
import RangeOvertime0rder from './range-overtime-order';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible, msgDetail, activeKey } = props;
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()
  const [visit, setVisit] = useState(false)

  const getFieldValue = (searchConfig) => {
    const {dateTimeRange,...rest}=searchConfig.form.getFieldsValue()
    return {
      startTime1:dateTimeRange&&dateTimeRange[0],
      startTime2:dateTimeRange&&dateTimeRange[1],
      ...rest,
    }
  }

  const Columns: ProColumns[] = [
    {
      title: '订单类型',
      dataIndex:'id',
      valueType: 'indexBorder',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: 'subOrderSn',
      align: 'center',
    },
    {
      title: '商品名称',
      dataIndex: 'goodName',
      align: 'center',
      width: 200
    },
    {
      title: '商品件数',
      dataIndex: 'buySkuNum',
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
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间距今已过天数',
      dataIndex: 'earliestDay',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'optRole',
      align: 'center',
      renderFormItem: () => <TimeSelect />,
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
        dataIndex: 'overDay',
        hideInTable: true,
        renderFormItem: () => <RangeOvertime0rder />
      },
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<>
               <p>首页 /  供应商管理 / 超时未发货供应商 / 超时未发货订单明细 / {activeKey=='1'?'普通订单':'集约订单'}</p>
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
        request={purchaseUnshippedOrder}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          supplierId: msgDetail?.id
        }}
        options={false}
        search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                key='export'
                change={(e) => { setVisit(e) }}
                type={'bind-box-use-detail-export'}
                conditions={()=>{return getFieldValue(searchConfig)}}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type={'bind-box-use-detail-export'}/>,
            ],
          }}
      />
    </DrawerForm >
  )
}
