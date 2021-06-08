import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

const index = () => {
  const columns = {

  }
  return (
    <PageContainer
      title={false}
    >
      <ProTable 
        columns={ columns }
      />
    </PageContainer>
  )
}

export default index;
