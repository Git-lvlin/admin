
import React, { useRef, useState, useEffect } from 'react';
import { message, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormSwitch } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { dateFormat } from '@/utils/utils';
import Edit from './form';
import ClassSort from './sort';
import { homeClassificationList, homeClassificationSortTop, homeClassificationStatus, homeClassificationSetSort } from '@/services/cms/member/member';

const HomeClassification = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [listData, setListData] = useState(null);
  const getDetail = (data) => {
    setDetailData(data);
    setFormVisible(true);
  }

  const top = ({homeStatus, id}) => {
    if (!homeStatus) {
      message.error('关闭状态无法置顶')
      return
    }
    homeClassificationSortTop({id:id}).then((res) => {
      if (res.code === 0) {
        message.success(`置顶成功`);
        actionRef.current.reset();
      }
    })
  }

  const onChangeSwitch = ({id, homeStatus}) => {
    homeClassificationStatus({id: id,status: homeStatus}).then((res) => {
      if (res.code === 0) {
        message.success(`切换状态成功`);
      }
    })
    
  }

  const setSort = (v) => {
    const param = {}
    v.map((item, index) => {
      param[item.id]=index+1
    })
    homeClassificationSetSort({sortList:param}).then((res) => {
      if (res.code === 0) {
        message.success(`编辑排序成功`);
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
      search: false,
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
          homeStatus: 0,
        },
        1: {
          text: '已上线',
          homeStatus: 1,
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
      <ProForm.Group>
        <ProCard style={{display: 'flex',}}>
          <Button type={'primary'} onClick={() => {}}>APP</Button>
          <Button disabled onClick={() => {}}>小程序</Button>
        </ProCard>
      </ProForm.Group>
    <ProTable
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      request={homeClassificationList}
      postData={(data) => {
        setListData(data)
        return data
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="首页分类配置"
      toolBarRender={() => [
        <ClassSort data={listData} callback={(v) => { setSort(v) }} />
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