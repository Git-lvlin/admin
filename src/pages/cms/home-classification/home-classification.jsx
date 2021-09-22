
import React, { useRef, useState, useEffect } from 'react';
import { message } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import ContentVersionTab from '@/components/content-version-tab';
import { homeBannerList, bannerSortTop } from '@/services/cms/member/member';

const HomeClassification = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [verifyVersionId, setVerifyVersionId] = useState(1);
  const getDetail = (data) => {
    data && setDetailData(data);
    setFormVisible(true);
  }

  const top = (data) => {
    bannerSortTop({id: data}).then((res) => {
      if (res.code === 0) {
        message.success(`置顶成功`);
        actionRef.current.reset();
      }
    })
  }

  useEffect(() => {
    if (!formVisible) {
      actionRef.current.reset();
    }
  }, [formVisible])

  const columns = [
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
      search: false,
    },
    {
      title: '分类名称',
      dataIndex: 'title',
    },
    {
      title: '跳转链接',
      dataIndex: 'actionUrl',
      valueType: 'text',
      search: false,
    },
    {
      title: '编辑时间',
      dataIndex: 'createTime',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作人',
      dataIndex: 'createTime',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'state',
      filters: true,
      onFilter: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '已下线',
          status: '1',
        },
        1: {
          text: '已上线',
          status: '2',
        },
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'text',
      search: false,
      valueEnum: {
        0: '下架',
        1: '上架',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _) => {
        return (
          <>
            {record.state===1&&<a key="top" onClick={() => {top(record.id)}}>置顶</a>}
            &nbsp;&nbsp;{<a key="editable" onClick={() => {getDetail(record)}}>编辑</a>}
          </>
        )
      }
    },
  ];

  return (
    <PageContainer>
      <ProForm.Group>
        <ContentVersionTab setVerifyVersionId={setVerifyVersionId} />
      </ProForm.Group>
    <ProTable
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      params={{verifyVersionId: verifyVersionId}}
      request={homeBannerList}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="首页分类配置"
    />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      verifyVersionId={verifyVersionId}
      detailData={detailData}
      callback={() => { actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { actionRef.current.reload(); setDetailData(null) }}
    />}
    </PageContainer>
  );
};


export default HomeClassification;