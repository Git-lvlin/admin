import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { getLogListByParams } from "@/services/product-management/transaction-sharing-management"
import {
  DrawerForm
} from '@ant-design/pro-form';
import { CumulativeProps } from './data';
import Preview from './preview'

export default (props:CumulativeProps) => {
  const { visible, setVisible, msgDetail, roleInfo } = props;
  const form = useRef<ActionType>()
  const [parameter,setParameter] = useState()
  const [previewVisible, setPreviewVisible] = useState(false)


  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'id',
      hideInSearch: true
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '配置类型',
      dataIndex: 'editType',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '查看分成配置快照',
      dataIndex: '',
      align: 'center',
      render: (_,data) => {
        return <a onClick={()=>{ setPreviewVisible(true); setParameter(data) }}>查看</a>
      },
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'lastEditor',
      align: 'center',
    },
    {
      title: '操作时间',
      dataIndex: 'dataRange',
      renderFormItem: () => <TimeSelect />,
      align: 'center',
      hideInTable: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true
    }
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
        request={getLogListByParams}
        columnEmptyText={false}
        actionRef={form}
        options={false}
        params={{
          id: msgDetail?.id
        }}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse()
          ],
        }}
      />
      {
        previewVisible &&
        <Preview
          visible={previewVisible}
          setVisible={setPreviewVisible}
          callback={()=>{ setParameter(undefined); form.current?.reload()  }}
          msgDetail={parameter}
          selectData={roleInfo}
        />
      }
    </DrawerForm>
  )
}
