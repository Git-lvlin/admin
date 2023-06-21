import { Modal } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { CategoryProps } from './data'

import { goodsQlfCategory } from '@/services/product-management/qualification-management'

const Category:React.FC<CategoryProps> = ({id, title, visible, setVisible}) => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '一级分类',
      dataIndex: 'gcId1Desc',
      align: 'center'
    },
    {
      title: '二级分类',
      dataIndex: 'gcId2Desc',
      align: 'center'
    },
    {
      title: '三级分类',
      dataIndex: 'gcId3Desc',
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
        rowKey='gcId3'
        options={false}
        params={{id}}
        request={goodsQlfCategory}
        columns={columns}
      />
    </Modal>
  )
}
export default Category