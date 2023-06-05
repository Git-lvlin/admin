import React, { useEffect, useState, useRef } from 'react';
import ProForm from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import PageContainer from "@/components/PageContainer"
import { Button, message } from 'antd';
import {getConfig, addConfig } from '@/services/hydrogen-atom-generation/settings-page'



type DataSourceType = {
  id: React.Key;
  desc: string;
  code: string;
  time: [string, string] | [];
  roleCode: string;
};


const EditableTable: React.FC<void> = () => {
  const [dataSource, setDataSource] = React.useState<DataSourceType[]>([]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const ref=useRef<ActionType>()

  useEffect(()=>{
    getConfig({ code:'hydrogenCityAgentTime' }).then(res=>{
      if(res.code==0){
        setDataSource(res.data.map((ele: any,index: number)=>({id:index+1,...ele})))
        setEditableKeys(res.data.map((ele: any,index: number)=>index+1))
      }
    })
    
  },[])

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      editable: false,
      width: 100
    },
    {
      title: '业绩订单类型',
      dataIndex: 'desc',
      editable: false
    },
    {
      title: '氢原子市代平台可展示业绩时段',
      dataIndex: 'time',
      valueType: 'dateRange',
    },
    {
      dataIndex: 'roleCode',
      editable: false,
      hideInTable: true
    },
  ];

  return (
    <PageContainer>
      <ProForm
        onFinish={async (values) => {
          console.log(values)
          console.log('dataSource',dataSource)
          try {
            const params={
              code: 'hydrogenCityAgentTime',
              content: dataSource?.map(ele=>({code:ele.code,desc:ele.desc,time:ele.time,roleCode:ele.roleCode}))
            }
            addConfig(params).then(res=>{
              if(res.code==0){
                message.success('提交成功')
                ref?.current?.reload()
              }
            })
          } catch (error) {
            console.log('error',error)
          }
        }}
        style={{ backgroundColor: '#fff' }}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button type="primary" style={{ margin: '20px 0 20px 100px' }} key="button-submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  提交
                </Button>,
                <Button type="default" key="button-default" onClick={() => { setDataSource(dataSource.map((ele,index)=>({...ele,id:index+1,time:[]}))) }}>
                  重置
                </Button>
              ];
            }
          }
        }
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          columns={columns}
          value={dataSource}
          actionRef={ref}
          search={false}
          editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                console.log('recordList',recordList)
              setDataSource(recordList)
              },
            }}
            controlled
          recordCreatorProps={false}
        />
      </ProForm>
    </PageContainer>
  );
};

export default EditableTable;