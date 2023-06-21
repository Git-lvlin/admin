import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@/components/PageContainer';
import SupplierMerchant from './supplier-merchant';
import ConsultantList from './consultant-list';
import QualificationAuditList from './qualification-audit-list';
import TobeUploadedQualification from './tobe-uploaded-qualification';

const TableList = () => {
  const [activeKey, setActiveKey] = useState('1')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="供应商家商家">
          {activeKey === '1' && <SupplierMerchant />}
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="供应商家顾问">
          {activeKey === '2' && <ConsultantList />}
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="资质审核">
          {activeKey === '3' && <QualificationAuditList />}
        </ProCard.TabPane>
        <ProCard.TabPane key="4" tab="待上传资质">
          {activeKey === '4' && <TobeUploadedQualification/>}
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>

  )
};

export default TableList;
