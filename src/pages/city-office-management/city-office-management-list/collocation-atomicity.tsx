import { useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { hostingDeviceList } from "@/services/city-office-management/city-office-management-list"
import type { ProColumns } from "@ant-design/pro-table"
import type { HostingDeviceListItem } from "./data"
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
  const Columns: ProColumns<HostingDeviceListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '下单用户',
      dataIndex: 'hostingMemberPhone',
      align: 'center',
    },
    {
      title: '推荐人手机',
      dataIndex: 'recomPhone',
      align: 'center',
    },
    {
      title: '推荐人店铺编号',
      dataIndex: 'recomStoreHouseNumber',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '推荐人店铺店铺',
      dataIndex: 'recomStoreAddress',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '托管状态',
      dataIndex: 'statusDesc',
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
      title={`${msgDetail?.agencyName}  托管氢原子数`}
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
      <ProTable<HostingDeviceListItem>
        rowKey="date"
        columns={Columns}
        request={hostingDeviceList}
        columnEmptyText={false}
        params={{
          agencyCityId:msgDetail?.agencyId
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
              type={'healthyHostingDeviceList'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'healthyHostingDeviceList'}/>
          ],
        }}
      />
    </DrawerForm >
  );
};