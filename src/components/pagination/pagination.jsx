import { Pagination } from 'antd';

const P = (props) => {
  return <Pagination
    pageSize={10}
    showSizeChanger
    showQuickJumper
    hideOnSinglePage={false}
    {...props}
  />
}


export default P


