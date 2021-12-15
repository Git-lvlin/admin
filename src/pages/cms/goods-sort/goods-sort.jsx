
import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { goodsSortList, goodsSortTop, goodsSortTopCancel, goodsSortReset, goodsMoveSort } from '@/services/cms/member/member';
import Edit from './form';

const BannerAdmin = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [useType, setUseType] = useState(1);

  const moveSort = (record, moveUp) => {
    const { wsSkuId } = record;
    const param = {
      wsSkuId,
      type: useType,
      moveUp,
    }
    goodsMoveSort(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const top = (record, type) => {
    const { wsSkuId } = record;
    let api = type?goodsSortTop:goodsSortTopCancel
    const param = {
      wsSkuId,
      type: useType,
    }
    api(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const sortReset = () => {
    const param = {
      type: useType,
      isHot: 0,
    }
    goodsSortReset(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const editSort = (record, type) => {
    const data = {
      ...record,
      type,
    }
    setDetailData(data)
    setFormVisible(true)
  }

  const columns = [
    {
      title: '序号',
      valueType: 'indexBorder',
      search: false,
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
    },
    {
      title: '主图',
      dataIndex: 'imageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '一级分类',
      dataIndex: 'gcName1',
      search: false,
    },
    {
      title: '集约价',
      dataIndex: 'salePrice',
      search: false,
      render: (_) => {
        return <>{_/100}</>
      }
    },
    {
      title: '起订量',
      dataIndex: 'buyMinNum',
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    useType==1&&{
      title: '采购列表序号',
      dataIndex: 'sort',
      search: false,
      render: (_, record) => {
        return <>
          <a onClick={() => { editSort(record, 1) }}>设置序号</a>&nbsp;
          <Button icon={<ArrowDownOutlined />} onClick={() => { moveSort(record, 0 ) }}></Button>
          {record.sort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { moveSort(record, 1) }}></Button>}&nbsp;
          <a onClick={() => { top(record, 1) }}>置顶</a>&nbsp;
          <a onClick={() => { top(record, 0) }}>取消置顶</a>
        </>
      }
    },
    useType==2&&{
      title: '提醒列表序号设置',
      dataIndex: 'noticeSort',
      search: false,
      render: (_, record) => {
        return <>
          <a onClick={() => { editSort(record, 2) }}>设置序号</a>&nbsp;
          <Button icon={<ArrowDownOutlined />} onClick={() => { moveSort(record, 0) }}></Button>
          {record.noticeSort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { moveSort(record, 1) }}></Button>}&nbsp;
          <a onClick={() => { top(record, 2) }}>置顶</a>&nbsp;
          <a onClick={() => { top(record, 0) }}>取消置顶</a>
        </>
      }
    },
  ];

  return (
    <PageContainer>
      <ProForm.Group>
        <ProCard style={{display: 'flex',}}>
          <Button type={useType==1?'primary':''} onClick={() => {setUseType(1)}}>店主采购列表</Button>
          <Button type={useType==1?'':'primary'} onClick={() => {setUseType(2)}}>集约板块提醒列表</Button>
        </ProCard>
      </ProForm.Group>
      <ProTable
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        params={{type: useType}}
        request={goodsSortList}
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={(_) => {
          if (useType==1) {
            return [
              <Button key="button" type="primary" onClick={() => { sortReset(1) }}>
                按集约价升序排列采购列表
              </Button>
            ]
          } else {
            return [
            <Button key="button" type="primary" onClick={() => { sortReset(2) }}>
              按集约价升序排列提醒列表
            </Button>
            ]
          }
        }}
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


export default BannerAdmin