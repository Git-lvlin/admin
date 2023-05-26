import { useState, useRef } from 'react';
import { Drawer } from 'antd';
import { queryMemberPromotionItemPage } from "@/services/hydrogen-atom-trusteeship/hydrogen-referral-commission"
import { amountTransform } from '@/utils/utils'
import type { ProColumns } from "@ant-design/pro-table"
import type { DescriptionsProps } from "./data"
import type { FormInstance } from "@ant-design/pro-form"
import ProTable from '@/components/pro-table'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import style from './style.less'

export default (props) => {
  const { visible, setVisible, onClose, phone } = props;
  const [visit, setVisit] = useState(false)
  const ref = useRef<FormInstance>()
  const columns: ProColumns<DescriptionsProps>[] = [
    {
      title: '被推荐人手机',
      dataIndex: 'buyerMobile',
      align: 'center',
      render: (_,data)=>{
        if(data?.tradeType=='investorIncome'){
          return '-'
        }else{
          return _
        }
      }
    },
    {
      title: '佣金类型',
      dataIndex: 'commissionType',
      align: 'center',
      valueEnum: {
        'directVipStoreCommissionProxy': '运营商推荐佣金',
        'investorCommission': '投资人推荐佣金',
        'investorIncome': '投资人投资收益'
      },
      hideInTable: true,
    },
    {
      title: '佣金类型',
      dataIndex: 'tradeType',
      align: 'center',
      valueEnum: {
        'directVipStoreCommissionProxy': '运营商推荐佣金',
        'investorCommission': '投资人推荐佣金',
        'investorIncome': '投资人投资收益'
      },
      hideInSearch: true,
    },
    {
      title: '提成金额（元）',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '订单金额（元）',
      dataIndex: 'orderAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '交易时间',
      dataIndex: 'tradeTime',
      align: 'center',
      hideInSearch: true,
    },
  ]
  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }
  return (
    <Drawer
      title="详情"
      width={1200}
      placement="right"
      onClose={() => { setVisible(false);onClose() }}
      visible={visible}
      footer={false}
      className={style.hydrogen_referral_commission}
    >
      <ProTable<DescriptionsProps>
        rowKey="memberId"
        columns={columns}
        request={queryMemberPromotionItemPage}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10
        }}
        params={{
          phoneNumber: phone
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e) => { setVisit(e) }}
            type={'exportMemberPromotionItemList'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'exportMemberPromotionItemList'}/>
          ]
        }}
      />
    </Drawer>
  )
}
