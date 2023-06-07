import { Modal } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { CategoryProps } from './data'

const Category:React.FC<CategoryProps> = ({title, visible, setVisible}) => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '一级分类',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '二级分类',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '三级分类',
      dataIndex: '',
      align: 'center'
    }
  ]

  return (
    <Modal
      title={`需要${title}的商品分类如下`}
      width={500}
      destroyOnClose
      footer={null}
      visible={visible}
      onCancel={()=> {setVisible(false)}}
    >
      <ProTable
        pagination={false}
        search={false}
        rowKey=''
        options={false}
        params={{}}
        // request={{}}
        columns={columns}
      />
    </Modal>
  )
}
export default Category