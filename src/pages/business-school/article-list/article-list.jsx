
import React, { useRef, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import { hotGoosList, hotGoosOperation, tagSortTop } from '@/services/cms/member/member';
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
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '分类',
      dataIndex: 'spuId',
      valueType: 'text',
      search: false,
    },
    {
      title: '发布人昵称',
      key: 'goodsName',
      dataIndex: 'goodsName',
      valueType: 'text',
      search: false,
    },
    {
      title: '封面图片',
      key: 'goodsImageUrl',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '真实浏览量',
      key: 'supplierName',
      dataIndex: 'supplierName',
      valueType: 'text',
      search: false,
    },
    {
      title: '虚拟浏览量',
      key: 'goodsSaleTypeDisplay',
      dataIndex: 'goodsSaleTypeDisplay',
      valueType: 'text',
      search: false,
    },
    {
      title: '创建信息',
      key: 'goodsSalePrice',
      dataIndex: 'goodsSalePrice',
      valueType: 'number',
      search: false,
    },
    {
      title: '置顶',
      key: 'stockNum',
      dataIndex: 'stockNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '首页',
      key: 'activityStockNum',
      dataIndex: 'activityStockNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '吐槽数量',
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
        1: '已隐藏',
        2: '已显示',
      }
    },
    {
      title: '分类',
      dataIndex: 'classification',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '已隐藏',
        2: '已显示',
      }
    },
    {
      title: '发布人',
      dataIndex: 'publisher',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '已隐藏',
        2: '已显示',
      }
    },
    {
      title: '置顶',
      dataIndex: 'top',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '已隐藏',
        2: '已显示',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            {record.status===2&&<a key="top" onClick={() => {top(record.id)}}>置顶</a>}
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