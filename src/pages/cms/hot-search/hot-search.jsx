
import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { hotSearchList, homeBannerDel } from '@/services/cms/member/member';
import Edit from './form';

const HotSearch = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const getDetail = (data) => {
    data?setDetailData(data):setDetailData(null);
    setFormVisible(true);
  }

  const formControl = (ids, record) => {
    if (record.selectedRows) {
      let type = false
      record.selectedRows.map((item) => {
        if (!item.state) {
          type=true
        }
      })
      if (!type) {
        message.error(`上线中无法删除！`);
        return
      }
    }

    homeBannerDel({ids: ids}).then((res) => {
      if (res.code === 0) {
        message.success(`删除成功`);
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
      title: '序号',
      dataIndex: 'sort',
      valueType: 'text',
      search: false,
    },
    {
      title: '关键词名称',
      dataIndex: 'title',
    },
    {
      title: '添加时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作人',
      dataIndex: 'actionUrl',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
           {<a key="editable" onClick={() => {getDetail(record)}}>编辑</a>}
            &nbsp;&nbsp;{<a key="d" onClick={() => {formControl([record.id],record)}}>删除</a>}
          </>
        )
      }
    },
  ];

  return (
    <PageContainer>
    <ProTable
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      request={hotSearchList}
      // rowSelection={{
      //   // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
      //   // 注释该行则默认不显示下拉选项
      //   // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      // }}
      // tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
      //   <Space size={24}>
      //     <span>
      //       已选 {selectedRowKeys.length} 项
      //       <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
      //         取消选择
      //       </a>
      //     </span>
      //     <span>{`待发布: ${selectedRows.reduce(
      //       (pre, item) => {
      //         item.state === 0
      //         if (item.state === 0) {
      //           return pre += 1
      //         }
      //         return pre
      //       },0,)} 个`}</span>
      //     <span>{`已发布: ${selectedRows.reduce(
      //       (pre, item) => item.state && pre + 1,
      //       0,
      //     )} 个`}</span>
      //   </Space>
      // )}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      toolBarRender={(_,record) => [
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { getDetail() }}>
          新增
        </Button>,
      ]}
    />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      detailData={detailData}
      callback={() => { actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { actionRef.current.reload(); setDetailData(null) }}
    />}
    </PageContainer>
  );
};


export default HotSearch