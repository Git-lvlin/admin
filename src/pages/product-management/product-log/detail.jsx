import { Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import { logDetail } from '@/services/product-management/product-log';

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
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
    dataIndex: 'updateTime',
    valueType: 'text',
    hideInSearch: true,
  },
];

const UserDetail = (props) => {
  const { visible, setVisible, spuId } = props;
  return (
    <Drawer
      title="用户详情"
      width={1000}
      placement="right"
      onClose={() => { setVisible(false) }}
      visible={visible}
    >
      <ProTable
        rowKey="id"
        options={false}
        params={{
          spuId,
        }}
        request={logDetail}
        search={{
          defaultCollapsed: false,
        }}
        columns={columns}
      />
    </Drawer>
  )
}

export default UserDetail;
