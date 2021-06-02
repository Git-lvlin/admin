
import React, { useRef, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import { hotGoosList, hotGoosOperation, tagSortTop } from '@/services/cms/member/member';
import { ACTION_TYPE } from '@/utils/text';

const ArticleCategoryList = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(false);

  const getDetail = (data) => {
    setDetailData(data);
    setFormVisible(true);
  }

  const formControl = (data,type) => {
    hotGoosOperation({ids: data,status: type}).then((res) => {
      if (res.code === 0) {
        message.success(`${ACTION_TYPE[type]}成功`);
        actionRef.current.reset();
      }
    })
  }

  const top = (data) => {
    tagSortTop({id: data}).then((res) => {
      if (res.code === 0) {
        message.success(`置顶成功`);
      }
    })
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'sort',
      valueType: 'text',
      search: false,
    },
    {
      title: '分类名称',
      key: 'goodsSaleTypeDisplay',
      dataIndex: 'goodsSaleTypeDisplay',
      valueType: 'text',
      search: false,
    },
    {
      title: '分类描述',
      key: 'goodsSalePrice',
      dataIndex: 'goodsSalePrice',
      valueType: 'number',
      search: false,
    },
    {
      title: '展示序号',
      key: 'stockNum',
      dataIndex: 'stockNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '创建信息',
      key: 'activityStockNum',
      dataIndex: 'activityStockNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '文章数量',
      dataIndex: 'goodsSaleNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      hideInTable: true,
      search: false,
      valueType: 'select',
      valueEnum: {
        0: { text: '全部', status: 'Default' },
        1: {
          text: '待发布',
          status: '1',
        },
        2: {
          text: '已发布',
          status: '2',
        },
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      search: false,
      valueEnum: {
        1: '未发布',
        2: '已发布',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            &nbsp;&nbsp;{record.status===2&&<a key="down" onClick={() => {formControl(record.id, 1)}}>关闭</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="view" onClick={() => {formControl(record.id,2)}}>启用</a>}
          </>
        )
      }
    },
  ];

  return (
    <PageContainer>
    <ProTable
      rowKey="id"
      options={false}
      columns={columns}
      actionRef={actionRef}
      request={hotGoosList}
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
      //       (pre, item) => pre + item.containers,
      //       0,
      //     )} 个`}</span>
      //     <span>{`已发布: ${selectedRows.reduce(
      //       (pre, item) => pre + item.callNumber,
      //       0,
      //     )} 个`}</span>
      //   </Space>
      // )}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      // headerTitle=""
      search={false}
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { setFormVisible(true) }}>
          新建
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


export default ArticleCategoryList