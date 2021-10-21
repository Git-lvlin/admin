import React, { useState, useRef } from 'react';
import { Button, Radio, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { operationList } from '@/services/order-management/intensive-purchase-order';
import Detail from './detail';

const BindAuditList = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [params, setParams] = useState({ status: '' });
  const actionRef = useRef();
  const formRef = useRef();

  const columns = [
    {
      title: '社区店名称',
      dataIndex: 'poNo',
    },
    {
      title: '绑定运营商',
      dataIndex: 'totalNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '申请类别',
      dataIndex: 'statusDesc',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '申请人员',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '审批文件',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '审核人员',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '审核意见',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => { setSelectItem(record); setDetailVisible(true); }}>详情</a>
          </Space>
        )
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="poNo"
        options={{
          density: false,
          reload: true,
          fullScreen: false,
          setting: false,
        }}
        actionRef={actionRef}
        formRef={formRef}
        params={params}
        request={operationList}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
        toolbar={{
          multipleLine: true,
          filter: (
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              defaultValue={''}
              options={[
                {
                  label: '待审核',
                  value: '',
                },
                {
                  label: '审核通过',
                  value: 1,
                },
                {
                  label: '审核驳回',
                  value: 2,
                },
              ]}
              onChange={(e) => {
                setParams({
                  status: e.target.value
                })
                actionRef.current.reload();
              }}
            />
          )
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
      {
        detailVisible &&
        <Detail
          id={selectItem?.poNo}
          visible={detailVisible}
          setVisible={setDetailVisible}
          callback={() => {
            setDetailVisible(false);
            setSelectItem(null);
            actionRef.current.reload();
          }}
        />
      }
    </PageContainer>
  );
};

export default BindAuditList;
