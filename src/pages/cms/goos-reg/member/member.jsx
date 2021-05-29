
import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import MemberReg from '@/components/member-reg';
import { spaceInfoList, memberOperation } from '@/services/cms/member/member';
import { ACTION_TYPE } from '@/utils/text';



const Member = (proprs) => {
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(true);

  const actionRef = useRef();
  const formRef = useRef();


  const formControl = (data,type) => {
    memberOperation({ids: data,status: type}).then((res) => {
      if (res.code === 0) {
        message.success(`${ACTION_TYPE[type]}成功`);
        actionRef.current.reset();
      }
    })
  }

  useEffect(() => {
    actionRef.current.reset();
  }, [formVisible])

  const columns = [
    {
      title: '区域',
      dataIndex: 'title',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '区域',
      dataIndex: 'spaceId',
      // valueType: 'select',
      renderFormItem: () => (<MemberReg />),
      hideInTable: true,
    },
    {
      title: '商品描述',
      dataIndex: 'subtitle',
      hideInSearch: true,
    },
    {
      title: '图片',
      dataIndex: 'image',
      render: (text) => <img src={text} width={50} height={50} />,
      hideInSearch: true,
    },
    {
      title: '图片排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '跳转链接',
      dataIndex: 'actionUrl',
      hideInSearch: true,
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
        3: {
          text: '下线',
          status: '3',
        },
        4: {
          text: '删除',
          status: '4',
        },
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        1: '未发布',
        2: '已发布',
        3: '下线',
        4: '删除',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            &nbsp;&nbsp;{record.status===2&&<a key="down" onClick={() => {formControl(record.id, 1)}}>下线</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="view" onClick={() => {formControl(record.id,2)}}>发布</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {action?.startEditable?.(record.key);console.log('action',action,record)}}>编辑</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="d" onClick={() => {formControl(record.id,4)}}>删除</a>}
          </>
        )
      }
    },
  ];


  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        // options={false}
        actionRef={actionRef}
        formRef={formRef}
        request={spaceInfoList}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            <span>{`待发布: ${selectedRows.reduce(
              (pre, item) => pre + item.containers,
              0,
            )} 个`}</span>
            <span>{`已发布: ${selectedRows.reduce(
              (pre, item) => pre + item.callNumber,
              0,
            )} 个`}</span>
          </Space>
        )}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="会员及会员店约购区"
        toolBarRender={(_,record) => [
          <Button key="button" icon={<PlayCircleOutlined />} type="primary" onClick={() => { formControl(record.selectedRowKeys.toString(), 2) }}>
            批量发布
          </Button>,
          <Button key="button" icon={<PauseCircleOutlined />} type="primary" onClick={() => { formControl(record.selectedRowKeys.toString(), 1) }}>
            批量下线
          </Button>,
          <Button key="button" icon={<MinusOutlined />} type="primary" onClick={() => { formControl(record.selectedRowKeys.toString(), 4) }}>
            批量删除
          </Button>,
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { setFormVisible(true) }}>
            新建
          </Button>,
        ]}
        columns={columns}
      />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      detailData={detailData}
      callback={() => { console.log('callback');actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { console.log('close');actionRef.current.reload();setDetailData(null) }}
    />}
    </PageContainer>
  );
};


export default Member