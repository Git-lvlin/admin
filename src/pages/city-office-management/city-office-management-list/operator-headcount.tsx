import { useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { agencyOperateUser } from "@/services/city-office-management/city-office-management-list"
import type { ProColumns } from "@ant-design/pro-table"
import type { AgencyOperateUserItem } from "./data"
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
  const Columns: ProColumns<AgencyOperateUserItem>[] = [
    {
      title: '运营商手机',
      dataIndex: 'memberPhone',
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
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺编号',
      dataIndex: 'houseNumber',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺地址',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true,
    },
  ]
  
  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      agencyCityId:msgDetail?.agencyId,
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.agencyName}  运营商总人数`}
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
      <ProTable<AgencyOperateUserItem>
        rowKey="date"
        columns={Columns}
        request={agencyOperateUser}
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
              type={'healthyAgencyOperateUser'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'healthyAgencyOperateUser'}/>
          ],
        }}
      />
    </DrawerForm >
  );
};