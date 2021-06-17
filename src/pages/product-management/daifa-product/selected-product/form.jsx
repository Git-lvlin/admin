import React, { useRef, useState, useEffect  } from 'react';
import { Button, message, Form, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import { saveMoneyAdd } from '@/services/cms/member/member';
import { saveMoneyFormList } from '@/services/cms/member/member';
import { getGoodsList, selectGoodsList } from '@/services/product-management/daifa-product';

export default (props) => {
  const { setVisible, setHasData, visible } = props;
  const formRef = useRef();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '商品组名称',
      dataIndex: 'title',
      valueType: 'text',
      search: false,
    },
    {
      title: '商品数量',
      dataIndex: 'feedCount',
      valueType: 'text',
      search: false,
    },
    {
      title: '最近获取时间',
      dataIndex: 'updateTime',
      valueType: 'text',
      search: false,
    },
    {
      title: '商品组状态',
      dataIndex: 'state',
      valueType: 'money',
      search: false,
    },
    {
      title: 'groupId',
      dataIndex: 'groupId',
      valueType: 'text',
      search: false,
      hideInTable: true,
    },
  ];

  useEffect(() => {

  }, [])


  const goToBigList = (record) => {
    console.log('record', record)
    const param = {
      groupId: record.groupId
    }
    selectGoodsList(param).then((res) => {
      console.log('res', res)
      if (res.code === 0) {
        return true
      }
    })
  }

  return (
    <ModalForm
      title={`选择要获取的供应链商品组商品`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
      // drawerprops={{
      //   forceRender: true,
      //   destroyOnClose: true,
      // }}
    >
<ProTable
      rowKey="id"
      options={false}
      columns={columns}
      // postData={(data) => {
      //   data.filter(item=>item.id < 20)
      //   return data
      // }}
      request={getGoodsList}
      search={false}
      pagination={{
        pageSize: 10
      }}
      dateFormatter="string"
      headerTitle="请点击要拉取商品所在的商品组"
      onRow={(record) => {
        return {
          onClick: async () => {
            console.log('左侧栏点击item',record)
            await goToBigList(record)
            setHasData(true)
            setVisible(false)
          },
        };
      }}
    />


    </ModalForm>
  );
};