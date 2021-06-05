import React, { useRef, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import ProCard from '@ant-design/pro-card';
import { Button, Input, Space, Tag, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


const defaultData = [
  {
    id: 624748504,
    title: '淘宝',
    labels: [{ key: 'woman', label: '川妹子' }],
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '京东',
    labels: [{ key: 'man', label: '西北汉子' }],
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
  },
  {
    id: 624748501,
    title: '拼多多',
    labels: [{ key: 'woman', label: '川妹子' }],
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691222,
    title: '天猫',
    labels: [{ key: 'man', label: '西北汉子' }],
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
  },
  {
    id: 624691223,
    title: '美团',
    labels: [{ key: 'man', label: '西北汉子' }],
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
  },
];

const columns = [
  {
    title: '比价电商平台',
    dataIndex: 'title',
    valueType: 'text',
    width: '10%',
    editable: false
  },
  {
    title: 'skuid',
    key: 'skuId',
    dataIndex: 'state',
    valueType: 'text',
    width: '10%',
    editable: false
  },
  {
    title: '售卖价格',
    dataIndex: 'price',
    width: '10%',
    editable: false
  },
  {
    title: '链接',
    dataIndex: 'url',
    valueType: 'input',
    width: '40%',
  },
  {
    title: '操作',
    valueType: 'option',
    width: 250,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        抓取
      </a>,
      <EditableProTable.RecordCreator
        key="copy"
        record={{
          ...record,
          id: (Math.random() * 1000000).toFixed(0),
        }}
      >
        <a>复制此行到末尾</a>
      </EditableProTable.RecordCreator>,
    ],
  },
];

export default () => {
  const actionRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() =>
    defaultData.map((item) => item.id),
  );
  const [form] = Form.useForm();
  return (
    <>
      <EditableProTable
        rowKey="id"
        actionRef={actionRef}
        headerTitle="可编辑表格"
        maxLength={5}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          form,
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
    </>
  );
};