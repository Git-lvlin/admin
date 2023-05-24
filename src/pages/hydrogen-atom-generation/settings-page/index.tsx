import React, { useEffect, useState } from 'react';
import ProForm, { ProFormFieldSet, ProFormDatePicker } from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import PageContainer from "@/components/PageContainer"
import { Button } from 'antd';



type DataSourceType = {
  id: React.Key;
  orderType: string;
  performancePeriod: [string, string];
};

const defaultData: DataSourceType[] = [
  {
    id: 1,
    orderType: '氢原子启动费',
    performancePeriod: ['2022-01-01', '2022-01-31'],
  },
  {
    id: 2,
    orderType: '氢原子月租/管理费(本市)',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
  {
    id: 3,
    orderType: '氢原子月租/管理费(全国)',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
  {
    id: 4,
    orderType: '新集约批发单',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
  {
    id: 5,
    orderType: '氢原子全款销售单',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
  {
    id: 6,
    orderType: '氢原子业绩',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
  {
    id: 7,
    orderType: '健康礼包',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
  {
    id: 8,
    orderType: 'AED培训服务套餐',
    performancePeriod: ['2022-02-01', '2022-02-28'],
  },
];

const EditableTable: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataSourceType[]>(defaultData);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  useEffect(()=>{
    setEditableKeys(dataSource?.map(item => item.id))
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
      dataIndex: 'orderType',
      editable: false
    },
    {
      title: '氢原子市代平台可展示业绩时段',
      dataIndex: 'performancePeriod',
      valueType: 'dateRange',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <ProFormFieldSet> 
            <ProFormDatePicker name="startTime" />
            至 
            <ProFormDatePicker name="endTime" />
          </ProFormFieldSet>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProForm
        onFinish={async (values) => {
          console.log(values);
        }}
        style={{ backgroundColor: '#fff' }}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button type="primary" style={{ margin: '20px 0 20px 100px' }} key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  提交
                </Button>,
                <Button type="default" onClick={() => { props.form?.resetFields?.() }}>
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
          recordCreatorProps={false}
        />
      </ProForm>
    </PageContainer>
  );
};

export default EditableTable;