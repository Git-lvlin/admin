import { useState, useRef } from 'react';
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@/components/pro-table';
import { adventPage } from '@/services/supplier-management/balance-delivery-supplier'
import type { ActionType } from "@ant-design/pro-table"
import { amountTransform } from '@/utils/utils';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import RangeNumberInput from '@/components/range-number-input'
import styles from './style.less'

const OrderList = () => {
    const [visit, setVisit] = useState(false)
    const actionRef = useRef<ActionType>();

    const getFieldValue = (searchConfig) => {
        const {balanceAvailable,balanceProcessable,balanceExpire,...rest}=searchConfig.form.getFieldsValue()
        return {
          balanceAvailableStart:balanceAvailable&&amountTransform(balanceAvailable.min,'*'),
          balanceAvailableEnd:balanceAvailable&&amountTransform(balanceAvailable.max,'*'),
          balanceProcessableStart:balanceProcessable&&amountTransform(balanceProcessable.min,'*'),
          balanceProcessableEnd:balanceProcessable&&amountTransform(balanceProcessable.max,'*'),
          balanceExpireStart:balanceExpire&&amountTransform(balanceExpire.min,'*'),
          balanceExpireEnd:balanceExpire&&amountTransform(balanceExpire.max,'*'),
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
        title: '可提现余额',
        dataIndex: 'balanceAvailable',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
        hideInTable:true
      },
      {
        title: '可提现余额（元）',
        dataIndex: 'balanceAvailable',
        valueType: 'text',
        render: (_) => {
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '已过120天未到178天订单余额',
        dataIndex: 'balanceProcessable',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
        hideInTable:true
      },
      {
        title: '已过120天未到178天订单余额(元)',
        dataIndex: 'balanceProcessable',
        valueType: 'text',
        render: (_) => {
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '已过178天订单余额',
        dataIndex: 'balanceExpire',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
        hideInTable:true
      },
      {
        title: '已过178天订单余额(元)',
        dataIndex: 'balanceExpire',
        valueType: 'text',
        render: (_) => {
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '最近提现申请时间',
        dataIndex: 'lastWithdrawTime',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '最近提现成功时间',
        dataIndex: 'lastWithdrawSuccessTime',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '最近订单支付时间',
        dataIndex: 'lastPayTime',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '在售商品spu数量',
        dataIndex: 'totalSpu',
        valueType: 'text',
        hideInSearch: true,
      }
    ];
  
    return (
        <PageContainer>
            <ProTable
            rowKey="supplierId"
            headerTitle='总余额大于100元的供应商'
            options={false}
            request={adventPage}
            search={{
                defaultCollapsed: true,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
                <Export
                    key='export'
                    change={(e) => { setVisit(e) }}
                    type={'exportSupplierAdventList'}
                    conditions={()=>{return getFieldValue(searchConfig)}}
                />,
                <ExportHistory key='task' show={visit} setShow={setVisit} type={'exportSupplierAdventList'}/>,
                ],
            }}
            columns={columns}
            actionRef={actionRef}
            scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
            className={styles.balance_delivery_supplier}
            />
      </PageContainer>
    );
  };

export default OrderList;
