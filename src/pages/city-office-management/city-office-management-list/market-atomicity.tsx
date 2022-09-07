import { useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { agencySalesList } from "@/services/city-office-management/city-office-management-list"
import type { ProColumns } from "@ant-design/pro-table"
import type { AgencySalesListItem } from "./data"
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
  const Columns: ProColumns<AgencySalesListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '订单日期',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '下单用户',
      dataIndex: 'userPhone',
      align: 'center',
    },
    {
      title: '下单联系人手机',
      dataIndex: 'contactPhone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '下单地址',
      dataIndex: 'address',
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
      title={`${msgDetail?.agencyName}  销售氢原子数`}
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
      <ProTable<GithubIssueItem>
        rowKey="date"
        columns={Columns}
        request={agencySalesList}
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
              type={'financial-businessDept-commission-page'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'financial-businessDept-commission-page'}/>
          ],
        }}
      />
    </DrawerForm >
  );
};