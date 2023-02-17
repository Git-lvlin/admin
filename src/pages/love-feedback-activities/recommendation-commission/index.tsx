import {  useRef, useState } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { queryPage } from "@/services/love-feedback-activities/recommendation-commission"
import Export from "@/components/export"
import { amountTransform } from "@/utils/utils"
import Detail from "./detail"


const RecommendationCommission:FC = ()=>  {
  const form = useRef<FormInstance>()
  const [visible, setVisible] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)
  const [name, setName] = useState<string>()
  const [agencyId, setAgencyId] = useState<string>()
  const getFieldValue = () => {
    const { time, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest
    }

  }

  const columns: ProColumns[] = [
      {
        title: '交易月度查询',
        dataIndex: 'tradeMonth',
        valueType: 'select',
        hideInTable: true,
        valueEnum: {
          '2022-11': '2022年11月',
          '2022-12': '2022年12月',
          '2023-01': '2023年1月',
          '2023-02': '2023年2月'
        },
        fieldProps: {
          placeholder: '请选择月份'
        }
      },
      {
        title: '手机号',
        dataIndex: 'phoneNumber',
        align: 'center',
        hideInSearch: true,
      },
      {
        title: '用户手机',
        dataIndex: 'phoneNumber',
        align: 'center',
        hideInTable: true,
        fieldProps:{
          placeholder:'请输入用户手机号'
        }
      },
      {
        title: '用户店铺编号',
        dataIndex: 'shopMemberAccount',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '推荐订单总额',
        dataIndex: 'totalAmount',
        align: 'center',
        hideInSearch: true,
        render: (_,data) => {
          if(_){
            return <a onClick={()=>{ 
                    setVisible(true);
                    setAgencyId(data.memberId);
                    setAmount(data.payAmount);
                    setName(`用户 ${data.phoneNumber} 推荐的爱心回馈礼品单交易明细`)}}
                    >
                    {amountTransform(_,'/').toFixed(2)}
                  </a>
          }else{
            return '-'
          }
         
        }
      },
      {
        title: '推荐订单总提成',
        dataIndex: 'totalCommission',
        align: 'center',
        hideInSearch: true,
        render: (_,data) => {
          if(_){
            return amountTransform(_,'/').toFixed(2)
          }else{
            return '-'
          }
          
        }
      },
      {
        title: '直推用户数',
        dataIndex: 'directCount',
        align: 'center',
        hideInSearch: true
      }
    ]
    return (
      <PageContainer>
        <ProTable
          rowKey='memberId'
          columns={columns}
          options={false}
          request={queryPage}
          formRef={form}
          pagination={{
            showQuickJumper: true,
            pageSize: 10
          }}
          search={{
            labelWidth: 120,
            optionRender: (searchConfig, props, dom) => [
              ...dom.reverse(),
              <Export
                key='export'
                type="exportLoveGiftCommissionList"
                conditions={getFieldValue}
              />
            ]
          }}
        />
      {
        visible &&
        <Detail
          id={agencyId}
          visible={visible}
          setVisible={setVisible}
          totalAmount={amount}
          title={name}
        />
      }
      </PageContainer>
    )
  }
  
  export default RecommendationCommission
  