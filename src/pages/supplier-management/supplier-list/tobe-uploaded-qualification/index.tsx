import { useState, useRef, useEffect } from 'react';
import ProTable from '@/components/pro-table'
import { qlfNoUploadQlf, qlfList } from '@/services/supplier-management/supplier-list'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import type { ActionType, ProColumns } from '@ant-design/pro-table';


const TobeUploadedQualification = () => {
  const [visit, setVisit] = useState<boolean>(false);
  const [qlfSelectList, setQlfSelectList] = useState<Record<string, string>>();
  const actionRef = useRef<ActionType>();

  const getFieldValue = (searchConfig: any) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
        ...rest,
        }
    }

  useEffect(()=>{
    qlfList().then(res=>{
      if(res.code == 0){
        const data={}
        res.data?.map((ele: { id: string | number; name: string; })=>(
          data[ele.id]=ele.name
        ))
      setQlfSelectList(data)
      }
    }
    )
  },[])

  const columns: ProColumns[] = [
    {
      title: '供应商ID',
      dataIndex: 'supId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商ID'
      }
    },
    {
      title: '供应商名称',
      dataIndex: 'supName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商名称'
      }
    },
    {
      title: '经营需资质的分类/商品',
      dataIndex: 'gcDesc',
      valueType: 'text',
      hideInSearch: true,
      width: 300
    },
    {
      title: '商品数量',
      dataIndex: 'goodsNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '资质名称',
      dataIndex: 'goodsQlfId',
      valueType: 'select',
      hideInTable: true,
      valueEnum: qlfSelectList
    },
    {
      title: '资质名称',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '资质类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        1: '必要资质',
        2: '可选资质'
      },
      hideInTable: true,
    },
    {
      title: '资质类型',
      dataIndex: 'typeDesc',
      valueType: 'select',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={qlfNoUploadQlf}
        search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                key='export'
                change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
                type={'noUploadQlf'}
                conditions={()=>{return getFieldValue(searchConfig)}}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type='noUploadQlf'/>,
            ],
          }}
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
      />
    </>

  );
};

export default TobeUploadedQualification;
