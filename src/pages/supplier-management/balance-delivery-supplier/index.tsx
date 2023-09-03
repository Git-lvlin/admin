import React, { useState, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@/components/pro-table';
import { helperList, statusSwitch } from '@/services/supplier-management/supplier-list'
import type { ActionType } from "@ant-design/pro-table"
import { amountTransform } from '@/utils/utils';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import RangeNumberInput from '@/components/range-number-input'

const OrderList = () => {
    const [visible, setVisible] = useState(false);
    const [msgDetail, setMsgDetail] = useState(); 
    const [visit, setVisit] = useState(false)
    const actionRef = useRef<ActionType>();

    const getFieldValue = (searchConfig) => {
        const {dateTimeRange,...rest}=searchConfig.form.getFieldsValue()
        return {
          startTime1:dateTimeRange&&dateTimeRange[0],
          startTime2:dateTimeRange&&dateTimeRange[1],
          ...rest,
        }
      }
    
    const columns = [
      {
        title: '供应商ID',
        dataIndex: 'companyName',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入供应商ID'
        }
      },
      {
        title: '供应商名称',
        dataIndex: 'companyName',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入供应商名称'
        }
      },
      {
        title: '临期余额',
        dataIndex: 'accountName',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
        hideInTable:true
      },
      {
        title: '临期余额',
        dataIndex: 'accountName',
        valueType: 'text',
        render: (_) => {
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '总余额',
        dataIndex: 'accountName',
        valueType: 'text',
        renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
        hideInTable:true
      },
      {
        title: '技术可处理余额剩余天数',
        dataIndex: 'companyUserPhone',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '临期余额相关订单支付最远时间',
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '总余额',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render: (_) => {
            return amountTransform(_,'/').toFixed(2)
        },
      },
      {
        title: '技术可处理总余额剩余天数',
        dataIndex: 'companyUserPhone',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '总余额相关订单支付最远时间',
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '最近提现申请时间',
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '最近提现成功时间',
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '最近订单支付时间',
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '在售商品spu数量',
        dataIndex: 'remark',
        valueType: 'text',
        hideInSearch: true,
      }
    ];
  
    return (
        <PageContainer>
            <ProTable
            rowKey="id"
            headerTitle='总余额大于100元的供应商'
            options={false}
            request={helperList}
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
            columns={columns}
            actionRef={actionRef}
            scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
            />
      </PageContainer>
    );
  };

export default OrderList;
