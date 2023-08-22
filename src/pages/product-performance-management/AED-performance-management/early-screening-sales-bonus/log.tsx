import { Drawer } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'
import type { logProps } from './data'

import ProTable from '@/components/pro-table'
import { logList } from '@/services/product-performance-management/early-screening-sales-bonus'
import styles from './styles.less'

const Log: React.FC<logProps> = ({visible, setVisible, data}) => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '角色',
      dataIndex: 'optSource',
      align: 'center'
    },
    {
      title: '操作人',
      dataIndex: 'optName',
      align: 'center'
    },
    {
      title: '操作项',
      dataIndex: 'acItem',
      align: 'center'
    },
    {
      title: '操作备注',
      dataIndex: 'remark',
      align: 'center'
    }
  ]

  return (
    <Drawer
      width={1200}
      visible={visible}
      onClose={()=> {setVisible(false)}}
      title={`销售人用户ID：${data?.memberId} 销售人手机号码：${data?.memberPhone} 状态：${data?.processDesc} 申请时间：${data?.applyTime}`}
    >
      <ProTable
        rowKey='id'
        columns={columns}
        params={{ipoId: data?.id}}
        request={logList}
        search={false}
        options={false}
        bordered
        className={styles.desc}
      />
    </Drawer>
  )
}

export default Log