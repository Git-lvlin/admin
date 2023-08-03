import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import TimeSelect from '@/components/time-select'

import { getLogListByParams } from "@/services/product-management/transaction-sharing-management"
import {
  DrawerForm
} from '@ant-design/pro-form';
// import AdvertisementDetails from './advertisement-details'
import { CumulativeProps } from './data';
import Preview from './preview'

export default (props:CumulativeProps) => {
  const { visible, setVisible } = props;
  const form = useRef<ActionType>()
  const [detailVisible,setDetailVisible] = useState<boolean>(false)
  const [parameter,setParameter] = useState()
  const [positionSelect,setPositionSelect] = useState()
  const [advSelect, setAdvSelect] = useState()
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(()=>{
    // advPositionPage().then(res=>{
    //   console.log('res',res)
    //   let obj={}
    //   res.data?.map((item: { code: string | number; title: string })=>{
    //     obj[item.code]=item.title
    //   })
    //   console.log('obj',obj)
    //   setPositionSelect(obj)
    // })
  },[])

  useEffect(()=>{
    // advGetAdType().then(res=>{
    //   if(res.code==0){
    //     let obj={}
    //     res.data?.map((item: { code: string | number; title: string })=>{
    //       obj[item.code]=item.title
    //     })
    //     setAdvSelect(obj)
    //   }
    // })
  },[])

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
      render: (_) => {
        return <a onClick={()=>{ setPreviewVisible(true) }}>查看</a>
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
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse()
          ],
        }}
      />
      {/* {
        previewVisible &&
        <Preview
          visible={previewVisible}
          setVisible={setPreviewVisible}
          callback={()=> setVisible(false)}
          // tableCallback={()=>callback()}
          data={data}
          selectData={selectData}
        />
      } */}
    </DrawerForm>
  )
}
