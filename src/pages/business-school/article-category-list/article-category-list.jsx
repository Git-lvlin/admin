
import React, { useRef, useState } from 'react';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import { findAdminArticleTypeList, articleOperation, tagSortTop } from '@/services/cms/member/member';

const ArticleCategoryList = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);

  const formControl = (data,type) => {
    articleOperation({id: data, isShow: type}).then((res) => {
      if (res.code === 0) {
        message.success(`操作成功`);
        actionRef.current.reset();
      }
    })
  }

  // const top = (data) => {
  //   tagSortTop({id: data}).then((res) => {
  //     if (res.code === 0) {
  //       message.success(`置顶成功`);
  //       actionRef.current.reset();
  //     }
  //   })
  // }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'text',
      search: false,
    },
    {
      title: '分类名称',
      dataIndex: 'typeName',
      valueType: 'text',
      search: false,
    },
    {
      title: '分类描述',
      dataIndex: 'typeDesc',
      valueType: 'text',
      search: false,
    },
    {
      title: '展示序号',
      dataIndex: 'sortNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '添加人名称',
      dataIndex: 'authorName',
      valueType: 'text',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      search: false,
    },

    {
      title: '状态',
      dataIndex: 'isShow',
      filters: true,
      onFilter: true,
      hideInTable: true,
      search: false,
      valueType: 'select',
      valueEnum: {
        0: '关闭',
        1: '启用',
      }
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _) => {
        return (
          <>
            {/* {record.status===1&&<a key="down" onClick={() => {top(record.id)}}>置顶</a>} */}
            {record.isShow===0&&<a key="down" onClick={() => {formControl(record.id, 1)}}>启用</a>}
            &nbsp;&nbsp;{record.isShow===1&&<a key="view" onClick={() => {formControl(record.id, 0)}}>关闭</a>}
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
      request={findAdminArticleTypeList}
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
      pagination={false}
      dateFormatter="string"
      headerTitle=""
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
      // setFlag={setFlag}
      callback={() => { actionRef.current.reload() }}
      onClose={() => { actionRef.current.reload() }}
    />}
    </PageContainer>
  );
};


export default ArticleCategoryList