import { Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';

const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: '操作角色',
    dataIndex: 'name',
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '全部',
      },
    },
  },
  {
    title: '操作对象',
    dataIndex: 'age',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入操作对象'
    }
  },
  {
    title: '操作项',
    dataIndex: 'age',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入操作项'
    }
  },
  {
    title: '操作内容',
    dataIndex: 'age',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: '操作时间',
    dataIndex: 'age',
    valueType: 'text',
    hideInSearch: true,
  },
];

const UserDetail = (onClose) => {
  return (
    <Drawer
      title="用户详情"
      width={1000}
      placement="right"
      onClose={onClose}
      visible
    >
      <ProTable
        rowKey="id"
        options={false}
        search={{
          defaultCollapsed: false,
        }}
        columns={columns}
      />
    </Drawer>
  )
}

export default UserDetail;
