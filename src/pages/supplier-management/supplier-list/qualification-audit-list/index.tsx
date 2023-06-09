import { useState, useRef, useEffect } from 'react';
import ProTable from '@/components/pro-table'
import { Space } from 'antd';
import { qlfAuditList, qlfList } from '@/services/supplier-management/supplier-list'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import QualificationAudit from './qualification-audit'
import History from './history-log'
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { TableProps } from './data';

const QualificationAuditList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [msgDetail, setMsgDetail] = useState<TableProps>();
  const [visit, setVisit] = useState<boolean>(false)
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
    },
    {
      title: '资质名称',
      dataIndex: 'goodsQlfId',
      valueType: 'select',
      hideInTable: true,  
      valueEnum: qlfSelectList,
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
    {
      title: '资质编号',
      dataIndex: 'qlfNumber',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '资质文件',
      dataIndex: 'qlfImg',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '最近更新时间',
      dataIndex: 'updateTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '最近操作人',
      dataIndex: 'optName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      valueType: 'select',
      valueEnum: {
        0: '待审核',
        1: '审核通过',
        2: '审核拒绝'
      },
      hideInTable: true,  
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatusDesc',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          {data.auditStatus === 0 && <a onClick={() => { setMsgDetail(data); setFormVisible(true) }}>审核</a>}
          <a onClick={() => { setMsgDetail(data); setHistoryVisible(true) }}>历史日志</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={qlfAuditList}
        search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                key='export'
                change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
                type={'qlfAuditList'}
                conditions={()=>{return getFieldValue(searchConfig)}}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type='qlfAuditList'/>,
            ],
          }}
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
      />
      {formVisible &&
        <QualificationAudit
          visible={formVisible}
          setVisible={setFormVisible}
          msgDetail={msgDetail}
          callback={() => { actionRef?.current?.reload() }}
        />}

      {historyVisible &&
        <History
          visible={historyVisible}
          setVisible={setHistoryVisible}
          msgDetail={msgDetail}
        />}
    </>

  );
};

export default QualificationAuditList;
