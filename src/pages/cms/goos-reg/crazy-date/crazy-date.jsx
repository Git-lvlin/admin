
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import Edit from './form';
import { crazyDateList } from '@/services/cms/member/member';
import { Button, Badge, Space } from 'antd';
const CrazyDate = (props) => {
  const { onChange, detail } = props;
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(true);

  const getDetail = (data) => {
    setDetailData(data);
    setFormVisible(true);
  }

  const columns = [
    {
      title: '活动标题',
      dataIndex: 'title',
      valueType: 'text',
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
      title: '活动状态',
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
      title: '开始时间',
      dataIndex: 'activityStartTime',
      search: false,
    },
    {
      title: '结束时间',
      dataIndex: 'activityEndTime',
      search: false,
    },
    {
      title: '位置',
      dataIndex: 'cmsClassName',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log('record', record)
            getDetail(record)
            // action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
      ],
    },
  ];


  return (
    <>
    <ProTable
      rowKey="id"
      // options={false}
      columns={columns}
      actionRef={actionRef}
      request={crazyDateList}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
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
      editable={{
        type: 'multiple',
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            console.log('左侧栏点击item',record)
            if (record.title) {
              onChange(record);
            }
          },
        };
      }}
      dateFormatter="string"
      headerTitle="正在疯约"
      toolBarRender={() => [
        <Button key="button" icon={<PlayCircleOutlined />} type="primary">
          批量发布
        </Button>,
        <Button key="button" icon={<PauseCircleOutlined />} type="primary">
          批量下线
        </Button>,
        <Button key="button" icon={<MinusOutlined />} type="primary">
          批量删除
        </Button>,
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { setFormVisible(true) }}>
          新建
        </Button>,
      ]}
    />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      detailData={detailData}
      callback={() => { actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { setDetailData(null) }}
    />}
    </>
  );
};

import React, { useRef, useEffect, useState } from 'react';

import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';



const DetailList = (props) => {
  const { detail } = props;
  const [tableListDataSource, setTableListDataSource] = useState([]);

  const columns = [
    {
      title: '时间点',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '代码',
      key: 'code',
      width: 80,
      dataIndex: 'code',
      valueType: 'code',
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      valueType: 'option',
      render: () => [<a key="a">预警</a>],
    },
  ];

  useEffect(() => {
    const source = [];
    for (let i = 0; i < 15; i += 1) {
      source.push({
        createdAt: Date.now() - Math.floor(Math.random() * 10000),
        code: `const getData = async params => {
          const data = await getData(params);
          return { list: data.data, ...data };
        };`,
        key: i,
      });
    }

    setTableListDataSource(source);
  }, [detail]);

  return (
    <ProTable
      columns={columns}
      dataSource={tableListDataSource}
      pagination={{
        pageSize: 3,
        showSizeChanger: false,
      }}
      rowKey="key"
      toolBarRender={false}
      search={false}
    />
  );
};

const Demo = () => {
  const [detail, setDetail] = useState('无');
  console.log('detail', detail)
  return (
    <ProCard split="vertical">
      <ProCard colSpan="50%" ghost>
        <CrazyDate onChange={(cIp) => setDetail(cIp)} detail={detail} />
      </ProCard>
      <ProCard title={`当前选中活动=>${detail.title||'-'}, 活动id=>${detail.id||'-'}`}>
        <DetailList detail={detail} />
      </ProCard>
    </ProCard>
  );
};

export default Demo;