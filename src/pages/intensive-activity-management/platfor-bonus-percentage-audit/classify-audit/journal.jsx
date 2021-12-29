import React, { useEffect } from 'react';
import { Form } from 'antd';
import ProForm, {
  DrawerForm,
} from '@ant-design/pro-form';
import * as api from '@/services/product-management/product-category'
import ProTable from '@ant-design/pro-table';

export default (props) => {
  const { visible, setVisible, callback, data, id, type} = props;
  useEffect(() => {
  }, [])
  const columns= [
    {
        title: '序号',
        dataIndex: 'spuId',
    },
    {
        title: '操作角色',
        dataIndex: 'goodsImageUrl', 
        valueType: 'text'
    },
    {
        title: '操作人名称',
        dataIndex: 'goodsName',
        valueType: 'text',
        ellipsis:true
    },
    {
        title: '操作动作',
        dataIndex: 'gcId1Display',
        valueType: 'text',
    },
    {
        title: '操作说明',
        dataIndex: 'brandName',
        valueType: 'text',
    },
    {
        title: '操作时间',
        dataIndex: 'stockNum',
    },
];
  return (
    <DrawerForm
      title='操作日志'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          setVisible(false)
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [];
        },
        }}
    >
      <ProTable
          toolBarRender={false}
          search={false}
          rowKey="spuId"
          columns={columns}
          // request={commonSpuList}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
        }}
      />
    </DrawerForm >
  );
};