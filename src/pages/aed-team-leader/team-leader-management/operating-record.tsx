import { useEffect } from 'react';
import { Form } from 'antd';
import {
  ProFormText,
  DrawerForm
} from '@ant-design/pro-form';
import { logList } from "@/services/aed-team-leader/team-leader-management"
import type { ProColumns } from "@ant-design/pro-table"
import ProTable from "@ant-design/pro-table"

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };


export default (props) => {
  const { visible, setVisible, msgDetail,onClose} = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue({
      ...msgDetail
    })
  },[])

  const tableColumns: ProColumns[] = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '操作项',
      dataIndex: 'acItem',
      align: 'center',
    },
    {
      title: '原数据',
      dataIndex: 'acBefore',
      align: 'center',
    },
    {
      title: '新数据',
      dataIndex: 'acAfter',
      align: 'center',
    },
    {
      title: '修改人',
      dataIndex: 'operateName',
      align: 'center',
    },
    {
      title: '修改时间',
      dataIndex: 'createTime',
      align: 'center',
    }
  ]
  return (
    <DrawerForm
      title='操作记录'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
          return [];
        },
        }}
      {...formItemLayout}
      
    >
      <ProFormText
        label="团长手机号"
        name="phone"
        readonly
      />
      <ProFormText
        label="团长姓名"
        name="name"
        readonly
      />
      <ProFormText
        label="团长类型"
        name="typeDesc"
        readonly
      />

      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={logList}
        columnEmptyText={false}
        params={{
          agencyId: msgDetail?.agencyId
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={false}
      />
    </DrawerForm >
  );
};