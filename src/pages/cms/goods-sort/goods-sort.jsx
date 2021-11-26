
import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { homeBannerList, homeBannerDel, bannerSortTop } from '@/services/cms/member/member';
import { sort } from 'core-js/core/array';

const BannerAdmin = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [useType, setUseType] = useState(1);
  const getDetail = (data) => {
    data && setDetailData(data);
    setFormVisible(true);
  }

  const top = (data) => {
    bannerSortTop({id: data}).then((res) => {
      if (res.code === 0) {
        message.success(`置顶成功`);
        actionRef.current.reset();
      }
    })
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
      title: 'spuID',
      dataIndex: 'title',
    },
    {
      title: 'skuID',
      dataIndex: 'title',
    },
    {
      title: '主图',
      dataIndex: 'image',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '一级分类',
      dataIndex: 'title',
    },
    {
      title: '集约价',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '起订量',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'title',
    },
    {
      title: '采购序号',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '提醒序号',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _) => {
        return (
          <>
            {record.state===1&&<a key="top" onClick={() => {top(record.id)}}>+添加到集约爆品区</a>}
          </>
        )
      }
    },
  ];

  return (
    <PageContainer>
      <ProForm.Group>
        <ProCard style={{display: 'flex',}}>
          <Button type={useType==1?'primary':''} onClick={() => {setUseType(1)}}>集约商品</Button>
          <Button type={useType==1?'':'primary'} onClick={() => {setUseType(2)}}>集约爆品区</Button>
        </ProCard>
      </ProForm.Group>
    <ProTable
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      request={homeBannerList}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { sort(1) }}>
          按集约价升序排列采购列表
        </Button>,
        <Button key="button" type="primary" onClick={() => { sort(2) }}>
          按集约价升序排列提醒列表
        </Button>,
      ]}
    />
    </PageContainer>
  );
};


export default BannerAdmin