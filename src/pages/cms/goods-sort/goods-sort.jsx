
import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { goodsSortList, goodsSortTop, goodsSortReset, goodsMoveSort } from '@/services/cms/member/member';
import { category } from '@/services/product-management/product-category';
import Edit from './form';

const BannerAdmin = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  // useEffect(() => {
  //   category({ gcParentId: 0 }).then(res => {
  //     console.log('res', res)
  //   })
  // }, [])

  const moveSort = (record, type, moveUp) => {
    const { wsSkuId } = record;
    const param = {
      wsSkuId,
      type,
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
    const param = {
      wsSkuId,
      type,
      sort: 1
    }
    goodsSortTop(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const sortReset = (type) => {
    const param = {
      type: type,
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
    {
      title: '采购序号',
      dataIndex: 'sort',
      search: false,
      render: (_, record) => {
        return <>
          <a>{_}</a>&nbsp;
          <Button icon={<ArrowDownOutlined />} onClick={() => { moveSort(record, 1, 0 ) }}></Button>
          {record.sort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { moveSort(record, 1, 1) }}></Button>}&nbsp;
          <a onClick={() => { editSort(record, 1) }}>排序</a>&nbsp;
          <a onClick={() => { top(record, 1) }}>置顶</a>
        </>
      }
    },
    {
      title: '提醒序号',
      dataIndex: 'noticeSort',
      search: false,
      render: (_, record) => {
        return <>
          <a>{_}</a>&nbsp;
          <Button icon={<ArrowDownOutlined />} onClick={() => { moveSort(record, 2, 0) }}></Button>
          {record.noticeSort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { moveSort(record, 2, 1) }}></Button>}&nbsp;
          <a onClick={() => { editSort(record, 2) }}>排序</a>&nbsp;
          <a onClick={() => { top(record, 2) }}>置顶</a>
        </>
      }
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        request={goodsSortList}
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={(_) => [
          <Button key="button" type="primary" onClick={() => { sortReset(1) }}>
            按集约价升序排列采购列表
          </Button>,
          <Button key="button" type="primary" onClick={() => { sortReset(2) }}>
            按集约价升序排列提醒列表
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


export default BannerAdmin