import { useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { hostingUserList } from "@/services/city-office-management/city-office-management-list"
import type { ProColumns } from "@ant-design/pro-table"
import type { HostingUserListItem } from "./data"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

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
  const { visible, setVisible,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [visit, setVisit] = useState<boolean>(false)
  const Columns: ProColumns<HostingUserListItem>[] = [
    {
      title: '投资商手机',
      dataIndex: 'hostingMemberPhone',
      align: 'center',
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺名称',
      dataIndex: 'hostingStoreName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺编号',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺地址',
      dataIndex: 'hostingAddress',
      align: 'center',
      hideInSearch: true,
    },
  ]
  
  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.agencyName}  投资商总人数`}
      onVisibleChange={setVisible}
      visible={visible}
      width={1300}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render:()=>{
            return []
        }
      }}
      {...formItemLayout}
    >
      <ProTable<HostingUserListItem>
        rowKey="date"
        columns={Columns}
        request={hostingUserList}
        columnEmptyText={false}
        params={{
          agencyCityId:msgDetail?.agencyId,
        }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={'healthyHostingUserList'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'healthyHostingUserList'}/>
          ],
        }}
      />
    </DrawerForm >
  );
};