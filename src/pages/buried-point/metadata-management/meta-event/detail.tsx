import ProTable from "@ant-design/pro-table"
import { Drawer, Typography, Row, Col } from "antd"

import type { ProColumns } from "@ant-design/pro-table"
import type { DetailProps } from "./data"

import { metadataEventProerties } from "@/services/buried-point/metadata-management"

const { Title, Paragraph } = Typography

const Detail = (props: DetailProps) => {
  const { visible, setVisible, enventType } = props

  const columns: ProColumns[] = [
    {
      title: '属性名',
      dataIndex: 'name',
      align: 'center',
      width: '25%'
    },
    {
      title: '属性显示名',
      dataIndex: 'comment',
      align: 'center',
      width: '25%'
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      align: 'center',
      width: '25%'
    },
    {
      title: '上报数据',
      dataIndex: 'submitData',
      align: 'center',
      width: '25%'
    }
  ]

  return (
    <Drawer 
      visible={visible}
      onClose={()=>setVisible(false)}
      width={800}
      title="事件详情"
    >  
      <Paragraph>
        <Title level={5}>自定义属性</Title>
        <ProTable
          rowKey="name"
          params={{enventType}}
          columns={columns}
          request={metadataEventProerties}
          pagination={{
            showQuickJumper: true,
            pageSize: 10
          }}
          options={false}
          search={false}
        />
      </Paragraph>
    </Drawer>
  )
}

export default Detail
