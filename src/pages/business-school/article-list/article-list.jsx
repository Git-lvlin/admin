
import React, { useRef, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import { articleList, articleOperation, articleTop } from '@/services/cms/member/member';
import { ACTION_TYPE } from '@/utils/text';

const ArticleList = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(false);

  const getDetail = (data) => {
    setDetailData(data);
    setFormVisible(true);
  }

  const formControl = (data,type) => {
    articleOperation({id: data,isShow: type}).then((res) => {
      if (res.code === 0) {
        message.success(`${ACTION_TYPE[type]}成功`);
        actionRef.current.reset();
      }
    })
  }

  const top = (id, type, userId) => {
    const param = {
      id: data,
      isTop: type,
      operatorId: userId,
    }
    articleTop(param).then((res) => {
      if (res.code === 0) {
        message.success(`置顶成功`);
      }
    })
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'text',
      search: false,
    },
    {
      title: '标题',
      dataIndex: 'articleTitle',
      valueType: 'text',
    },
    {
      title: '分类',
      dataIndex: 'articleTypeName',
      valueType: 'text',
      search: false,
    },
    {
      title: '发布人昵称',
      dataIndex: 'authorNickName',
      valueType: 'text',
      search: false,
    },
    {
      title: '封面图片',
      dataIndex: 'coverPicture',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '真实浏览量',
      dataIndex: 'clickNum',
      valueType: 'text',
      search: false,
    },
    {
      title: '虚拟浏览量',
      dataIndex: 'virtualClickNum',
      valueType: 'text',
      search: false,
    },
    {
      title: '创建人ID',
      dataIndex: 'createId',
      valueType: 'number',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'number',
      search: false,
    },
    {
      title: '置顶',
      dataIndex: 'isTop',
      valueType: 'text',
      search: false,
      valueEnum: {
        0: '否',
        1: '是',
      }
    },
    {
      title: '首页',
      dataIndex: 'isRecommend',
      valueType: 'text',
      search: false,
      valueEnum: {
        0: '否',
        1: '是',
      }
    },
    {
      title: '吐槽数量',
      dataIndex: 'debunkNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '已隐藏',
        1: '已显示',
      }
    },
    {
      title: '状态',
      dataIndex: 'isShow',
      valueType: 'text',
      search: false,
      valueEnum: {
        0: '已隐藏',
        1: '已显示',
      }
    },
    // {
    //   title: '分类',
    //   dataIndex: 'classification',
    //   valueType: 'select',
    //   hideInTable: true,
    //   valueEnum: {
    //     1: '已隐藏',
    //     2: '已显示',
    //   }
    // },
    {
      title: '发布人',
      dataIndex: 'authorName',
    },
    {
      title: '置顶',
      dataIndex: 'top',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        0: '否',
        1: '是',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      align: 'center',
      fixed: 'right',
      render: (text, record, _, action) => {
        return (
          <>
            {<a key="top" onClick={() => {top(record)}}>{record.isTop?'取消置顶':'置顶'}</a>}
            &nbsp;&nbsp;{record.status===2&&<a key="down" onClick={() => {formControl(record.id, 1)}}>隐藏</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="view" onClick={() => {formControl(record.id,2)}}>详情</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {action?.startEditable?.(record.key);console.log('action',action,record)}}>编辑</a>}
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
      params={
        {articleType: 1}
      }
      request={articleList}
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
      scroll={{ x: 2200 }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      // headerTitle=""
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { formControl(record.selectedRowKeys.toString(), 4) }}>
          设置到首页
        </Button>,
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


export default ArticleList