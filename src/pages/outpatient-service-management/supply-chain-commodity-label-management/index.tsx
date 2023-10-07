import { useRef, useState, } from 'react';
import ProTable from '@/components/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { provideGetClassTagListByParams } from '@/services/outpatient-service-management/supply-chain-commodity-label-management'
import { PageContainer } from '@/components/PageContainer';
import OperationModel from './operation-model'
import { Button } from 'antd';
import { history } from 'umi';

export default () => {
  const ref = useRef<ActionType>()
  const [visible,setVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState()
  const columns: ProColumns[] = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '专区商品数量',
      dataIndex: 'tagNum',
      valueType: 'text',
      render:(_,data)=>{
        if(_){
          return <a onClick={()=>{ history.push(`/outpatient-service-management/store-partne-purchasing-areas`); window.localStorage.setItem('classTag',data.id)}}>{_}</a>
        }else{
          return _
        }
      }
    },
    {
      title: '显示序号',
      dataIndex: 'sort',
      valueType: 'text',
    },
    {
      title: '显示状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '显示',
        0: '不显示'
      }
    },
   {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>[
        <a key='edit' onClick={()=>{ setVisible(true); setMsgDetail(record) }}>编辑</a>
      ],
    }, 
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        options={false}
        actionRef={ref}
        request={provideGetClassTagListByParams}
        search={false}
        pagination={{
          pageSize: 10,
        }}
        tableRender={(_, dom) => {
            return <>
              { dom }
              <div style={{ backgroundColor: '#fff', textAlign: 'right', padding: "0 20px 20px 0" }}>
               <Button type='primary' onClick={()=>{ setVisible(true); }}>新建</Button>
              </div>
            </>
          }}
      />
      {visible&&<OperationModel
         visible={visible}
         setVisible={setVisible}
         msgDetail={msgDetail}
         callback={()=>{ ref.current?.reload(); setMsgDetail(undefined) }}
         onClose={()=>{ setMsgDetail(undefined) }}
      />}
    </PageContainer>
  );
};