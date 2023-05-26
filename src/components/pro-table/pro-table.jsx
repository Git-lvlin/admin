import ProTable from '@ant-design/pro-table';

const P = (props) => {
  return <ProTable revalidateOnFocus={true} {...props} />
}

P.Summary = ProTable.Summary;

export default P


