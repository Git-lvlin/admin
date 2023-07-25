import { useState, useRef } from "react"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { logPage } from "@/services/cms/tripartite-advertising-data-statistics"
import {
  DrawerForm
} from '@ant-design/pro-form';
import AdvertisementDetails from './advertisement-details'
import { CumulativeProps } from './data';

export default (props:CumulativeProps) => {
  const { visible, setVisible } = props;
  const form = useRef<ActionType>()
  const [detailVisible,setDetailVisible] = useState<boolean>(false)
  const [parameter,setParameter] = useState()

  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'signCode',
      hideInSearch: true
    },
    {
      title: '广告类型',
      dataIndex: 'adType',
      align: 'center',
      valueEnum: {
        1: '开屏广告',
        2: '横幅广告',
        3: '插屏广告',
        4: '激励视频广告',
        5: '快手短视频广告'
      },
      hideInTable: true,
      fieldProps: {
        placeholder: '请选择广告类型'
      }
    },
    {
      title: '广告类型',
      dataIndex: 'adTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '前端位置',
      dataIndex: 'positionCode',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '启动页',
        2: '首页Banner图',
        3: '插屏广告',
        4: '集约页Banner图',
        5: '个人中心页Banner图',
        6: '个人中心-进入我的早筛页',
        7: '搜索页猜你喜欢上方',
        8: '聊天-消息列表看视频领红包',
        9: '邀请好友页-返回',
        10: '首页-每日红包下方',
        11: '个人中心-我的邀请返回',
        12: '个人中心-我的订单-返回',
        13: '个人中心-活动中心',
      },
      fieldProps:{
        placeholder: '请选择展示在前端的位置'
      }
    },
    {
      title: '前端位置',
      dataIndex: 'positionTitle',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作项',
      dataIndex: 'memberId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '原值',
      dataIndex: 'dateRange',
      hideInSearch: true
    },
    {
      title: '操作后新值',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '说明',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return <a onClick={()=>{ setDetailVisible(true);setParameter(data) }}>查看</a>
      }
    },
    {
      title: '操作人',
      dataIndex: 'payAmountDesc',
      align: 'center',
    },
    {
      title: '操作时间',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '操作时间',
      dataIndex: 'dateRange',
      hideInSearch: true
    },
  ]

  return (
    <DrawerForm
      layout="horizontal"
      title='三方广告数据统计'
      onVisibleChange={setVisible}
      visible={visible}
      width={1400}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      submitter={{
        render:()=>{
          return []
        }
      }}
    >
      <ProTable
        rowKey="orderSn"
        columns={tableColumns}
        request={logPage}
        columnEmptyText={false}
        actionRef={form}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse()
          ],
        }}
      />
      {detailVisible&&
      <AdvertisementDetails
         visible={detailVisible}
         setVisible={setDetailVisible}
         msgDetail={parameter}
      />}
    </DrawerForm>
  )
}