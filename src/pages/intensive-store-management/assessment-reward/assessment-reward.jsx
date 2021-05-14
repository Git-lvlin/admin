import React, { useState, useRef } from 'react';
// import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { memberShopResults } from '@/services/intensive-store-management/assessment-reward';
import { amountTransform } from '@/utils/utils'

const GradeIndex = () => {
  // const [formVisible, setFormVisible] = useState(false);
  const actionRef = useRef();
  const formRef = useRef();

  const columns = [
    {
      title: '考核等级',
      dataIndex: 'resultsName',
      valueType: 'text',
    },
    {
      title: '等级徽章',
      dataIndex: 'resultsLevel',
      valueType: 'text',
      render: (_) => <img src={_} width="50" height="50" />
    },
    {
      title: '考核指标',
      dataIndex: ['upresults', 'evaluation'],
      valueType: 'text',
    },
    {
      title: '积分奖励',
      dataIndex: 'bonusPoints',
      valueType: 'text',
    },
    {
      title: '返佣比例',
      dataIndex: 'commissionRatio',
      valueType: 'text',
      render: (_) => `${amountTransform(+_)}%`
    },
    {
      title: '未完成指标降级说明',
      dataIndex: 'demotionInstruction',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: () => <a>配置</a>
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        request={memberShopResults}
        search={false}
        columns={columns}
      />
    </PageContainer>
  );
};

export default GradeIndex;
