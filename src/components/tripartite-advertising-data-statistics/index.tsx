import { useState, useRef } from "react"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { typeStats } from "@/services/cms/tripartite-advertising-data-statistics"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"
import {
  DrawerForm
} from '@ant-design/pro-form';
import { CumulativeProps } from './data';

export default (props:CumulativeProps) => {
  const { visible, setVisible } = props;
  const form = useRef<ActionType>()
  const [visit, setVisit] = useState<boolean>(false)

  const getFieldValue = (searchConfig: any) => {
    const { dateRange = [], ...rest }=searchConfig.form.getFieldsValue()
    return {
      startTime: dateRange[0]&& moment(dateRange[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange[1]&& moment(dateRange[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }

  const tableColumns: ProColumns[] = [
    {
      title: '广告ID',
      dataIndex:'signCode',
      hideInSearch: true
    },
    {
      title: '展示时段',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '广告类型',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '曝光量',
      dataIndex: 'exposureNums',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '人均曝光量',
      dataIndex: 'avgExposure',
      hideInSearch: true
    },
    {
      title: '点击量',
      dataIndex: 'clickNums',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '人均点击量',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频完播数',
      dataIndex: 'videoNums',
      align: 'center',
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
        request={typeStats}
        columnEmptyText={false}
        actionRef={form}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
            type={'advTypeStats'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type={'advTypeStats'}/>
          ],
        }}
      />
    </DrawerForm>
  )
}