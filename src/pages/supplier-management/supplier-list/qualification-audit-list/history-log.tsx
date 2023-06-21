import { useRef } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { qlfCheckLog } from '@/services/supplier-management/supplier-list'
import type { CumulativeProps } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props:CumulativeProps)=>{
  const { visible, setVisible, msgDetail } = props;
  const [form] = Form.useForm();
  const ref = useRef<ActionType>()

  const Columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'indexBorder'
    },
    {
      title: '操作名称',
      dataIndex: 'optItem',
      align: 'center',
    },
    {
      title: '操作值',
      dataIndex: 'optContent',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'optRemark',
      align: 'center',
    },
    {
      title: '资质编号',
      dataIndex: 'qlfNumber',
      align: 'center',
    },
    {
      title: '资质文件',
      dataIndex: 'qlfImg',
      valueType:  'image',
      align: 'center',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'optName',
      valueType: 'text',
    },
    {
      title: '操作角色',
      dataIndex: 'optRole',
      align: 'center',
    },
  ]


  return (
    <DrawerForm
      layout="horizontal"
      title={<p>供应商ID：{msgDetail?.supId}    供应商名称：{msgDetail?.supName}     资质名称：{msgDetail?.name}</p>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={1400}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
        }
      }}
      submitter={{
        render: ({ form }) => {
          return []
        }
      }}
      {...formItemLayout}
    >
      <ProTable
        rowKey="id"
        columns={Columns}
        request={qlfCheckLog}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        columnEmptyText={false}
        actionRef={ref}
        params={{
          goodsQlfId:msgDetail?.goodsQlfId,
          gc:msgDetail?.gc,
          supId:msgDetail?.supId,
        }}
        options={false}
        search={false}
      />
    </DrawerForm >
  )
}
