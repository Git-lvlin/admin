
import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { goodsSortList, goodsSortTop, goodsSortReset } from '@/services/cms/member/member';
import { category } from '@/services/product-management/product-category';
const BannerAdmin = () => {
  const actionRef = useRef();
  // const [useType, setUseType] = useState(1);
  const [sortValue, setSortValue] = useState(null);
  // const [arr, setArr] = useState([]),

  // const renderPopup = () => (
  //   <Popconfirm key="popconfirm" title={``} okText="确定" cancelText="取消">
  //     <a>{text}</a>
  //     <input value={sortValue} onChange={(v) => {setSortValue(v)}}></input>
  //   </Popconfirm>
  // );

  // useEffect(() => {
  //   category({ gcParentId: 0 }).then(res => {
  //     console.log('res', res)
  //   })
  // }, [])

  const sortReset = (type) => {
    const param = {
      type: type,
      isHot: 0,
    }
    goodsSortReset(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reset();
      }
    })
  }

  const doSort = (record, type, varieties) => {
    const { wsSkuId, sort, noticeSort } = record;
    let param = {}
    switch(varieties) {
      case 'top':
        param = {
          wsSkuId,
          type,
          sort: 1
        }
        break
      case 'num':
        param = {
          wsSkuId,
          type,
          sort: sortValue
        }
        break
      case 'left':
        break
      case 'right':
        break
      case 'up':
        param = {
          wsSkuId,
          type,
          sort: type==1?sort-1:noticeSort-1
        }
        break
      case 'down':
        param = {
          wsSkuId,
          type,
          sort: type==1?sort+1:noticeSort+1
        }
        break
    }
    goodsSortTop(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reset();
      }
    })
  }

  const editSort = (record, type) => {

  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'sort',
      valueType: 'text',
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
        // let node = renderPopup('排序');
        return <>
          <a>{_}</a>&nbsp;
          {record.sort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { doSort(record, 1, 'up') }}></Button>}
          <Button icon={<ArrowDownOutlined />} onClick={() => { doSort(record, 1, 'up') }}></Button>&nbsp;
          {/* <a onClick={() => { editSort(record, 1) }}>排序</a>&nbsp; */}
          <a onClick={() => { doSort(record, 1, 'top') }}>置顶</a>
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
          {record.noticeSort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { doSort(record, 2, 'down') }}></Button>}
          <Button icon={<ArrowDownOutlined />} onClick={() => { doSort(record, 2, 'down') }}></Button>&nbsp;
          {/* <a onClick={() => { editSort(record, 2) }}>排序</a>&nbsp; */}
          <a onClick={() => { doSort(record, 2, 'top') }}>置顶</a>
        </>
      }
    },
  ];

  return (
    <PageContainer>
      {/* <ProForm.Group>
        <ProCard style={{display: 'flex',}}>
          <Button type={useType==1?'primary':''} onClick={() => {setUseType(1)}}>集约商品</Button>
          <Button type={useType==1?'':'primary'} onClick={() => {setUseType(2)}}>集约爆品区</Button>
        </ProCard>
      </ProForm.Group> */}
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
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { sortReset(1) }}>
          按集约价升序排列采购列表
        </Button>,
        <Button key="button" type="primary" onClick={() => { sortReset(2) }}>
          按集约价升序排列提醒列表
        </Button>,
      ]}
    />
    </PageContainer>
  );
};


export default BannerAdmin