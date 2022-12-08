import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'
import moment from "moment"

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import PageContainer from "@/components/PageContainer"
import RangeInput from '@/components/range-input'
import Detail from "./detail"
import { getUseCardByParams } from "@/services/health-package-activities/store-health-card-management"
import Export from '@/components/export'
import { getPageQuery } from "@/utils/utils"

const StoreHealthCardManagement = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState()
  const form = useRef<FormInstance>()

  const query = getPageQuery()
  
  const getFieldsValue = () => {
    const { remainingNum, ...rest } = form.current?.getFieldsValue()
    return {
      remainingMin: remainingNum && remainingNum.min,
      remainingMax: remainingNum && remainingNum.max,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '所属店铺编号',
      dataIndex: 'storeName',
      align: 'center',
    },
    {
      title: '所属店主手机',
      dataIndex: 'storePhone',
      align: 'center'
    },
    {
      title: '服务号',
      dataIndex: 'cardNo',
      align: 'center',
      initialValue: query && query.cardNo
    },
    {
      title: '服务类型',
      dataIndex: 'ownerType',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        'buy': '礼包赠送',
        'platformSend': '平台赠送',
        'appointSend': '指定赠送'
      }
    },
    {
      title: '服务状态',
      dataIndex: 'statusStr',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务状态',
      dataIndex: 'cardStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '生效',
        2: '失效'
      }
    },
    {
      title: '有效期截止日',
      dataIndex: 'expireTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> r.expireTime ? moment(r.expireTime * 1000).format('YYYY-MM-DD') : '-'
    },
    {
      title: '总次数',
      dataIndex: 'totalNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '剩余可用次数',
      dataIndex: 'remainingNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '剩余可用次数',
      dataIndex: 'remainingNum',
      align: 'center',
      hideInTable: true,
      renderFormItem: () => <RangeInput beforePlaceholder="请输入最低次数" afterPlaceholder="最高次数"/>
    },
    {
      title: '服务所属人手机号',
      dataIndex: 'ownerMobile',
      align: 'center'
    },
    {
      title: '所属套餐名称',
      dataIndex: 'cardRule',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属套餐名称',
      dataIndex: 'giftCodeUserN',
      valueType: 'select',
      valueEnum: {
        'giftCodeUser1': '体验礼包',
        'giftCodeUser2': '礼包一',
        'giftCodeUser3': '礼包二',
        'giftCodeUser4': '礼包三',
        'giftCodeUser5': '礼包四',
        'giftCodeUser6': '礼包五'
      },
      hideInTable: true
    },
    {
      title: '持有时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> r.createTime ? moment(r.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    {
      title: '最近使用时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> r.updateTime ? moment(r.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> <a onClick={()=> {setVisible(true); setDataSource(r)}}>使用明细</a>
    }, 
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={getUseCardByParams}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="card-healthy"
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
          dataSource={dataSource}
        />
      }
    </PageContainer>
  )
}

export default StoreHealthCardManagement