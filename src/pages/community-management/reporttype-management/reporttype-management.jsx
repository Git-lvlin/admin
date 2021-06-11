import React from 'react';;
import ProTable from '@ant-design/pro-table';


const columns= [
  {
    title: 'ID',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '举报类型',
    valueType:'text',
    hideInSearch:true
  }
];


export default () => {
  return (
    <ProTable
      columns={columns}
      // request={{}}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      toolbar={{
        title: '高级表格',
        tooltip: '这是一个标题提示',
      }}
      toolBarRender={false}
    />
  );
};