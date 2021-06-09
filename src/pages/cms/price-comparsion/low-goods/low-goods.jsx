import React, { useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { savePriceList, SetHotGoodsDel } from '@/services/cms/member/member';
import Edit from './form';

const LowGoods = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const actionRef = useRef();

  useEffect(() => {
    if (flag) {
      actionRef.current.reset()
      setFlag(false)
    }
  }, [flag])

  const del = (record, opt) => {
    const param = {
      ids: record.id,
      opt: opt
    }
    SetHotGoodsDel(param).then((res) => {
      if (res.code === 0) {
        message.success(`删除成功`);
        actionRef.current.reset();
      }
    })
  }

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'image',
      render: (text) => <img src={text} width={90} height={90} />,
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (_, record) => {
        return (
          <>
            {<a key="d" onClick={() => {
              del(record, 'del')
            }}>删除</a>}
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
      request={savePriceList}
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
      setFlag={setFlag}
    />}
    </PageContainer>
  )
}

export default LowGoods;

