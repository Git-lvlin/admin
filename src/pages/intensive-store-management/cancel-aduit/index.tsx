import { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@/components/pro-table'
import { Tooltip, Space } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FC } from 'react'
import type { TableListItem } from './data.d'

import { memberShopCancel } from '@/services/intensive-store-management/cancel-aduit'
import Detail from '../store-list/detail'
import Aduit from './aduit'
import AddressCascader from '@/components/address-cascader'
import Export from '@/components/export'

const CancelAduit: FC = () => {

  const [selectItem, setSelectItem] = useState<string | undefined>('')
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [aduitVisible, setAduitVisible] = useState<boolean>(false)
  const [data, setData] = useState<TableListItem>({})
  const formRef = useRef();

  const actionRef = useRef<ActionType>()

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '申请ID',
      dataIndex: 'applyId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '生鲜店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
    },
    {
      title: '店铺ID',
      dataIndex: 'storeNo',
      align: 'center',
    },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      align: 'center',
    },
    {
      title: '是否生鲜店铺',
      dataIndex: 'memberShopType',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        0: '全部',
        20: '生鲜店铺',
        10: '非生鲜店铺'
      },
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInTable: true,
      order:-1
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺类型',
      dataIndex: 'memberShopType',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      align: 'center',
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      align: 'center',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主姓名'
      },
    },
    {
      title: 'VIP店铺',
      dataIndex: 'vip',
      valueType: 'text',
      valueEnum: {
        0: '否',
        1: '是'
      },
      hideInSearch: true,
    },
    {
      title: '提货点所在地区',
      align: 'center',
      hideInSearch: true,
      render: (_, records) => <span>{records?.provinceName}{records?.cityName}{records?.regionName}</span>
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect />)
    },
    {
      title: '提货点详细地址',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: '生鲜店铺状态',
      dataIndex: 'freshVerifyStatus',
      align: 'center',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: {
        0: '没有申请过',
        1: '审核通过',
        2: '审核不通过',
        5: '取消申请',
        6: '待审核'
      }
    },
    {
      title: '所属运营中心',
      dataIndex: 'operationName',
      align: 'center',
    },
    {
      title: '营业状态',
      dataIndex: 'shopMemberStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '已启用',
        2: '注销',
        3: '已关闭',
        4: '待开户',
        5: '注销'
      },
      hideInSearch: true
    },
    {
      title: '营业状态',
      dataIndex: 'shopMemberStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '已启用',
        3: '已关闭',
        4: '待开户',
        'cancel': '注销'
      },
      hideInTable: true
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        0: '全部',
        11: '正常-已退部分保证金',
        12: '正常-已退全部保证金',
        13: '正常-未退保证金',
        20: '注销未退保证金',
        21: '注销已退全部保证金',
        22: '注销已退部分保证金'
      },
    },
    {
      title: '注销原因',
      dataIndex: 'reason',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '申请注销时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '注销审核状态',
      dataIndex: 'verifyStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '审核通过',
        2: '审核不通过',
        5: '取消申请',
        6: '待审核'
      },
      render: (_, r) => (
        <>
          <div>{_}</div>
          {
            r.verifyStatus === 2 &&
            <Tooltip title={r.auditMsg}>
              <a>查看拒绝原因</a>
            </Tooltip>
          }
        </>
      )
    },
    {
      title: 'VIP店铺',
      dataIndex: 'vip',
      valueType: 'select',
      valueEnum: {
        0: '非VIP店铺',
        1: 'VIP店铺'
      },
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: '100px',
      render: (_, data) => (
        <Space size='small'>
          <a onClick={() => { setSelectItem(data.storeNo); setDetailVisible(true) }}>详情</a>
          {
            data.verifyStatus === 6 &&
            <a onClick={() => { setData(data); setAduitVisible(true) }}>审核</a>
          }
        </Space>
      )
    }
  ]

  const postData = (data: TableListItem[]) => {
    return data.map(ele => {
      return (
        {
          ...ele,
          memberShopType: ele.memberShopType?.desc,
          freshVerifyStatus: ele.freshVerifyStatus?.code,
          shopMemberStatus: ele.shopMemberStatus?.code,
          depositStatus: ele.depositStatus?.code,
          verifyStatus: ele.verifyStatus?.code,
          reason: ele.details?.reason
        }
      )
    })
  }

  const getFieldValue = () => {
    return formRef?.current?.getFieldsValue?.()
  }

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="applyId"
        columns={columns}
        request={memberShopCancel}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={formRef}
        actionRef={actionRef}
        toolBarRender={false}
        scroll={{ x: 'max-content' }}
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key="export"
              type="store-export-membershop-cancel"
              conditions={getFieldValue}
            />,
          ]
        }}
        postData={postData}
      />
      {
        detailVisible &&
        <Detail
          storeNo={selectItem}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      {
        aduitVisible &&
        <Aduit
          visible={aduitVisible}
          setVisible={setAduitVisible}
          data={data}
          callback={() => { actionRef.current?.reload() }}
        />
      }
    </PageContainer>
  )
}

export default CancelAduit