import ProTable from "@ant-design/pro-table"
import type { ProTableProps } from "@ant-design/pro-table"

const P = (props: ProTableProps<{},{}>) => {
  const { pagination, paginationProps = {},...rest } = props
  return <ProTable
    revalidateOnFocus={false}
    pagination={{
      pageSize: 10,
      showQuickJumper: true,
      hideOnSinglePage: false,
      showSizeChanger: true,
      ...paginationProps,
    }}
    {...rest}
  />
}

P.Summary = ProTable.Summary;

export default P


