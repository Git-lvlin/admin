import React, { useState, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@/components/pro-table';
import { purchaseUnshippedStats } from '@/services/supplier-management/timeout-failed-deliver-supplier'
import type { ActionType } from "@ant-design/pro-table"
import { amountTransform } from '@/utils/utils';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import RangeNumberInput from '@/components/range-number-input'
import TimeoutOrderDetails from './timeout-order-details'
import RangeOvertime from './range-overtime';
import type { Statistics } from "./data"
import styles from './style.less'

const OrderList = (props:Statistics) => {
    const { activeKey } = props
    const [visible, setVisible] = useState(false);
    const [msgDetail, setMsgDetail] = useState(); 
    const [visit, setVisit] = useState(false)
    const actionRef = useRef<ActionType>();
    const [deadline, setDeadline] = useState<string>('')

    const getFieldValue = (searchConfig) => {
        const {orderNum,orderAmount,...rest}=searchConfig.form.getFieldsValue()
        return {
            orderNumMin:orderNum&&orderNum.min,
            orderNumMax:orderNum&&orderNum.max,
            orderAmountMin:orderAmount&&amountTransform(orderAmount.min,'*'),
            orderAmountMax:orderAmount&&amountTransform(orderAmount.max,'*'),
          ...rest,
        }
      }
    
    const columns = [
      {
        title: '供应商ID',
        dataIndex: 'supplierId',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入供应商ID'
        }
      },
      {
        title: '供应商名称',
        dataIndex: 'supplierName',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入供应商名称'
        }
      },
      {
        title: '待发货订单金额',
        dataIndex: 'orderAmount',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
        hideInTable:true
      },
      {
        title: '待发货订单金额',
        dataIndex: 'orderAmount',
        valueType: 'text',
        render: (_) => {
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '待发货订单数量',
        dataIndex: 'orderNum',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最少数量' afterPlaceholder='最多数量'/>,
        hideInTable:true
      },
      {
        title: '待发货订单数量',
        dataIndex: 'orderNum',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '待发货订单最早支付时间距今已过天数',
        dataIndex: 'earliestDay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '待发货订单最早支付时间',
        dataIndex: 'earliestPayTime',
        valueType: 'text',
        hideInSearch: true,
      },
      { 
        title: '',
        dataIndex: 'overDay',
        hideInTable: true,
        renderFormItem: () => <RangeOvertime />
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, data) => (
            <a onClick={() => { setMsgDetail(data); setVisible(true) }}>查看明细</a>
        ),
      },
    ];
  
    return (
      <>
        <ProTable
          rowKey="id"
          options={false}
          request={activeKey=='2'?purchaseUnshippedStats:''}
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
          postData={(data)=>{
            setDeadline(data[0]&&data[0].createTime)
            return data
          }}
          columns={columns}
          actionRef={actionRef}
          scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
          className={styles.timeout_failed_deliver_supplier}
          toolBarRender={(_,record) => <p>截止{deadline}</p>}
        />
        {
          visible&&<TimeoutOrderDetails
            setVisible={setVisible}
            visible={visible}
            msgDetail={msgDetail}
            activeKey={activeKey}
          />
        }
      </>
    );
  };

const TableList = () => {
  const [activeKey, setActiveKey] = useState('1')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="普通订单">
          {activeKey === '1' && <OrderList activeKey={activeKey}/>}
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="集约订单">
          {activeKey === '2' && <OrderList activeKey={activeKey}/>}
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>

  )
};

export default TableList;
