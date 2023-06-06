import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

const P = (props: PaginationProps) => {
  return <Pagination
    pageSize={10}
    showSizeChanger
    showQuickJumper
    hideOnSinglePage={false}
    {...props}
  />
}


export default P


