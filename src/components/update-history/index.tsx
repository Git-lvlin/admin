import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { logPage, advPositionPage } from "@/services/cms/tripartite-advertising-data-statistics"
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
  const [positionSelect,setPositionSelect] = useState()

  useEffect(()=>{
    advPositionPage().then(res=>{
      console.log('res',res)
      let obj={}
      res.data?.map((item: { code: string | number; title: string })=>{
        obj[item.code]=item.title
      })
      console.log('obj',obj)
      setPositionSelect(obj)
    })
  },[])

  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true
    },
    {
      title: '广告类型',
      dataIndex: 'adType',
      align: 'center',
      valueEnum: {
        'SplashAd': '开屏广告',
        'BannerAd': '横幅广告',
        'InterstitialAd': '插屏广告',
        'RewardVideoAd': '激励视频广告',
        'KUAISHOU': '快手短视频广告',
        'DrawVideoAd': 'Draw视频广告',
        'NativeExpressAd': '原生广告'
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
      valueEnum: positionSelect,
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
      dataIndex: 'action',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '原值',
      dataIndex: 'old',
      hideInSearch: true
    },
    {
      title: '操作后新值',
      dataIndex: 'new',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '说明',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return <a onClick={()=>{ setDetailVisible(true);setParameter(data) }}>查看</a>
      }
    },
    {
      title: '操作人',
      dataIndex: 'optAdminName',
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
      dataIndex: 'createTime',
      hideInSearch: true
    },
  ]

  return (
    <DrawerForm
      layout="horizontal"
      title='更新历史'
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
        rowKey="id"
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