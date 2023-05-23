
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import ProTable from '@/components/pro-table';
import { PageContainer } from '@/components/PageContainer';
import Modify from './edit';
import { productList } from '@/services/product-management/product-list';


const HotGoos = () => {
  const actionRef = useRef();
  const [modifyFormVisible, setModifyFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(false);

  const getDetail = (data) => {
    setDetailData(data);
    setModifyFormVisible(true);
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'optype2Sort',
      valueType: 'text',
      search: false,
    },
    {
      title: 'SPUID',
      dataIndex: 'spuId',
      valueType: 'number',
    },
    {
      title: '图片',
      key: 'goodsImageUrl',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '商品名称',
      key: 'goodsName',
      dataIndex: 'goodsName',
      valueType: 'text',
      width: 180,
      ellipsis: true,
    },
    {
      title: '可用库存',
      key: 'stockNum',
      dataIndex: 'stockNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record) => {
        return (
          <>
            {<Button size="small" key="editable" onClick={() => { getDetail(record) }}>排序</Button>}
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
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
        params={{
          operateType: 2,
          optype2Sort: 1,
          selectType: 1,
        }}
        request={productList}
        options={false}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
      {modifyFormVisible && <Modify
        visible={modifyFormVisible}
        setVisible={setModifyFormVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload() }}
      />}
    </PageContainer>
  );
};


export default HotGoos
