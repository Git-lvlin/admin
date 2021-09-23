
import React, { useRef, useState, useEffect } from 'react';
import { message, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormSwitch } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { dateFormat } from '@/utils/utils';
import Edit from './form';
import { homeClassificationList, homeClassificationSortTop, homeClassificationStatus } from '@/services/cms/member/member';

const HomeClassification = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const getDetail = (data) => {
    setDetailData(data);
    setFormVisible(true);
  }

  const controlSort = () => {
    console.log('排序')
  }

  const top = (data) => {
    // if (data.homeStatus === 0) {
    //   message.error('关闭状态无法置顶')
    //   return
    // }
    homeClassificationSortTop({id: data.id}).then((res) => {
      if (res.code === 0) {
        message.success(`置顶成功`);
        actionRef.current.reset();
      }
    })
  }

  const onChangeSwitch = ({id, homeStatus}) => {
    console.log('param', id, homeStatus)
    homeClassificationStatus({id: id,status: homeStatus}).then((res) => {
      if (res.code === 0) {
        message.success(`切换状态成功`);
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
      dataIndex: 'homeSort',
      valueType: 'text',
      search: false,
    },
    {
      title: '分类名称',
      dataIndex: 'gcName',
    },
    {
      title: '操作人',
      dataIndex: 'lastEditor',
      hideInTable: true,
    },
    {
      title: '编辑时间',
      dataIndex: 'homeLastEditTime',
      valueType: 'text',
      search: false,
      render:(time) => {
        return dateFormat(time*1000)
      }
    },
    {
      title: '操作人',
      dataIndex: 'homeLastEditor',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'homeStatus',
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
      dataIndex: 'homeStatus',
      valueType: 'text',
      search: false,
      render: (_,item) => {
        return (
          <ProFormSwitch
            name="homeStatus"
            fieldProps={{
              style: {marginTop: 24},
              defaultChecked:_?true:false,
              onChange: () => {
                item.homeStatus = item.homeStatus?0:1
                onChangeSwitch(item)
              },
            }}
          />
        )
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _) => {
        return (
          <>
            <a key="top" onClick={() => {top(record)}}>置顶</a>
            &nbsp;&nbsp;<a key="editable" onClick={() => {getDetail(record)}}>编辑</a>
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
      request={homeClassificationList}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="首页分类配置"
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { controlSort }}>
          编辑排序
        </Button>,
      ]}
    />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      onChangeSwitch={onChangeSwitch}
      detailData={detailData}
      callback={() => { actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { actionRef.current.reload(); setDetailData(null) }}
    />}
    </PageContainer>
  );
};


export default HomeClassification;