import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import Edit from './form';
import DetailList from './activity-form';
import { crazyDateList, crazyActivityDel } from '@/services/cms/member/member';
import { ACTION_TYPE } from '@/utils/text';

const CrazyDate = (props) => {
  const { onChange, detail } = props;
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(true);

  const getDetail = (data) => {
    setDetailData(data);
    setFormVisible(true);
  }

  const formControl = (data,type) => {
    crazyActivityDel({ids: data,status: type}).then((res) => {
      if (res.code === 0) {
        message.success(`${ACTION_TYPE[type]}成功`);
        actionRef.current.reset();
      }
    })
  }


  const columns = [
    {
      title: '活动序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      search: false
    },
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
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            {/* &nbsp;&nbsp;{record.status===2&&<a key="down" onClick={() => {formControl(record.id, 1)}}>下线</a>} */}
            {/* &nbsp;&nbsp;{record.status===1&&<a key="view" onClick={() => {formControl(record.id,2)}}>发布</a>} */}
            &nbsp;&nbsp;<a key="editable" onClick={() => {getDetail(record)}}>编辑</a>
            {/* &nbsp;&nbsp;{record.status===1&&<a key="d" onClick={() => {formControl(record.id,4)}}>删除</a>} */}
          </>
        )
      }
    },
  ];


  return (
    <>
    <ProTable
      rowKey="id"
      options={false}
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
              (pre, item) => {
                if (item.status === 1) {
                  return pre += 1
                }
                return pre
              },
              0,
            )} 个`}</span>
            <span>{`已发布: ${selectedRows.reduce(
              (pre, item) => {
                if(item.status === 2) {
                  return pre += 1
                }
                return pre
              },
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

const Demo = () => {
  const [detail, setDetail] = useState({});
  return (
    <ProCard split="vertical">
      <ProCard colSpan="50%" ghost>
        <CrazyDate onChange={(cIp) => setDetail(cIp)} detail={detail} />
      </ProCard>
      <ProCard title={`当前选中活动=>${detail.title||'-'}, 活动id=>${detail.id||'-'}`}>
        <DetailList id={detail.id} />
      </ProCard>
    </ProCard>
  );
};

export default Demo;