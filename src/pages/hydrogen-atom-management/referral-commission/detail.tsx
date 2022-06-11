import { useRef } from "react"
import { Drawer, Image, Space } from "antd"
import ProTable from "@ant-design/pro-table"

import type { DetailProps } from "./data"
import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import { queryStatisticsCommissionListSub } from "@/services/hydrogen-atom-management/referral-commission"
import { amountTransform } from "@/utils/utils"
import Export from "@/components/export"

const Detail = (props: DetailProps) => {
  const { visible, setVisible, data } = props

  const form = useRef<FormInstance>()

  const totalColumns: ProColumns[] = [
    {
      title: '推荐人',
      dataIndex: 'pMobile',
      align: 'center'
    },
    {
      title: '总提成(元)',
      dataIndex: 'totalAccount',
      align: 'center'
    },
    {
      title: '直购提成(元)',
      dataIndex: 'buyAmount',
      align: 'center'
    },
    {
      title: '管理费提成(元)',
      dataIndex: 'rentAmount',
      align: 'center'
    },
    {
      title: '总业绩(元)',
      dataIndex: 'orderAmountTotal',
      align: 'center'
    },
    {
      title: '直购业绩(元)',
      dataIndex: 'rentOrderAmount',
      align: 'center'
    },
    {
      title: '管理费业绩(元)',
      dataIndex: 'buyOrderAmount',
      align: 'center'
    },
    {
      title: '总提成人数',
      dataIndex: 'totalUser',
      align: 'center'
    },
    {
      title: '直购人数',
      dataIndex: 'buyCount',
      align: 'center'
    },
    {
      title: '租赁人数',
      dataIndex: 'rentCount',
      align: 'center'
    },
  ]

  const columns: ProColumns[] = [
    {
      title: '被推荐人信息',
      dataIndex: 'info',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <Space size='middle'>
          <Image 
            src={r.icon} 
            preview={false} 
            width={50} 
            height={50}
            style={{borderRadius: '50%'}}
          />
          <div>{r.nickeName}</div>
        </Space>
      )
    },
    {
      title: '被推荐人手机',
      dataIndex: 'buyMobile',
      align: 'center'
    },
    {
      title: '佣金类型',
      dataIndex: 'inviteType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: '管理佣金',
        1: '服务佣金'
      }
    },
    {
      title: '提成金额(元)',
      dataIndex: 'amount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true,
    },
    {
      title: '订单业绩金额(元)',
      dataIndex: 'oderAmount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '购买收益',
        2: '租金收益'
      }
    },{
      title: '支付编号',
      dataIndex: 'oderNo',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '是否店主',
      dataIndex: 'userType',
      align: 'center',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        0: '否',
        1: '是'
      },
    },
    {
      title: '是否vip',
      dataIndex: 'vip',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: '否',
        1: '是'
      },
      hideInSearch: true,
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店ID',
      dataIndex: 'storeId',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <Drawer
      title='详情'
      width={900}
      visible={visible}
      onClose={()=> setVisible(false)}
    >
      <ProTable
        rowKey=''
        columns={totalColumns}
        dataSource={[data]}
        pagination={false}
        search={false}
        options={false}
        scroll={{x: 'max-content'}}
      />
      <ProTable
        rowKey=''
        columns={columns}
        params={{pMemId: data?.pMemId}}
        request={queryStatisticsCommissionListSub}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
              key='export'
              type="queryMyCommissionSubListExport"
              conditions={{...form.current?.getFieldsValue()}}
            />
          ]
        }}
        options={false}
        scroll={{x: 'max-content'}}
      />
    </Drawer>
  )
}

export default Detail
