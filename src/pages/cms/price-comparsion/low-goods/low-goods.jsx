import React, { useRef, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { priceComparsionList, hotGoosOperation } from '@/services/cms/member/member';
import Edit from './form';

const LowGoods = () => {
  const [formVisible, setFormVisible] = useState(false);
  const actionRef = useRef();
  const columns = [
    {
      title: '商品图片',
      key: 'goodsImageUrl',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={90} height={90} />,
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            &nbsp;&nbsp;{record.status===1&&<a key="d">删除</a>}
          </>
        )
      }
    },
  ]



  return (
    <PageContainer>
      <ProTable
      rowKey="id"
      options={false}
      columns={columns}
      actionRef={actionRef}
      request={priceComparsionList}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      search={false}
      dateFormatter="string"
      headerTitle=""
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { setFormVisible(true) }}>
          选择比价商品
        </Button>,
      ]}
      />
      {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      // detailData={detailData}
      callback={() => { actionRef.current.reload() }}
      onClose={() => { actionRef.current.reload() }}
    />}
    </PageContainer>
  )
}

export default LowGoods;

