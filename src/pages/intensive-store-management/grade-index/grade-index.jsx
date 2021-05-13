import React, { useState, useRef } from 'react';
// import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { gradeList } from '@/services/Intensive-store-management/grade-index';

const GradeIndex = () => {
  // const [formVisible, setFormVisible] = useState(false);
  const actionRef = useRef();
  const formRef = useRef();

  const columns = [
    {
      title: '等级',
      dataIndex: 'gradeLevel',
      valueType: 'text',
    },
    {
      title: '等级徽章',
      dataIndex: 'icon',
      valueType: 'text',
      render: (_) => <img src={_} width="50" height="50" />
    },
    {
      title: '等级名称',
      dataIndex: 'gradeName',
      valueType: 'text',
    },
    {
      title: '积分门槛',
      dataIndex: ['upgrade', 'score', 'min'],
      valueType: 'text',
    },
    // {
    //   title: '月度指标',
    //   dataIndex: 'gradeName',
    //   valueType: 'text',
    // },
    {
      title: '权益可开小区店铺数量',
      dataIndex: 'equity',
      valueType: 'text',
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        request={gradeList}
        search={false}
        columns={columns}
      />
    </PageContainer>
  );
};

export default GradeIndex;
