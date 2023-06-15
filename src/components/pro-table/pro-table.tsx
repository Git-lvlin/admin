import ProTable from '@ant-design/pro-table';
import type { ProTableProps } from '@ant-design/pro-table';
import type { TablePaginationConfig } from 'antd';

interface I extends ProTableProps<Record<string, unknown>, Record<string, unknown>> {
  paginationProps?: false | TablePaginationConfig
}

const P = (props: I) => {
  const { pagination, paginationProps = {}, ...rest } = props
  return <ProTable
    revalidateOnFocus={false}
    pagination={{
      pageSize: 10,
      showQuickJumper: true,
      hideOnSinglePage: false,
      showSizeChanger: true,
      ...paginationProps,
    }}
    scroll={{ x: 'max-content' }}
    {...rest}
  />
}

P.Summary = ProTable.Summary;

export default P


