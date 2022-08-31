import { useState } from "react"
import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProTable from "@ant-design/pro-table"
import { getStoreList } from '@/services/intensive-store-management/store-list';
import type { ProColumns } from "@ant-design/pro-table"
import type { GithubIssueItem } from "./data"
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
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [visit, setVisit] = useState<boolean>(false)
  const compute=()=>{
    switch (type) {
      case 1:
        return 'VIP店主数'
      case 2:
        return '普通店主数'
      case 3:
        return '全款销售氢原子数'
      case 4:
        return '托管氢原子数'
      case 5:
        return '运营氢原子数'
      case 6:
        return '投资商总人数'
      case 7:
        return '运营商总人数'
      default:
        return ''
    }
  }
  const Columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '店铺名称',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'orderType',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        0: '总分成',
        1: '销售分成',
        2: '管理分成',
        3: '累计业绩'
      },
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'orderType',
      align: 'center',
      valueType: 'select',
      valueEnum:{
        0: '总分成',
        1: '销售分成',
        2: '管理分成',
        3: '累计业绩'
      },
      hideInSearch: true,
    },
    {
      title: '店铺编号',
      dataIndex: 'orderNo',
      align: 'center',
    },
    {
      title: '店主手机',
      dataIndex: 'orderTypeDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '店铺地址',
      dataIndex: 'orderAmount',
      align: 'center',
      hideInSearch: true,
    }
  ]
  
  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.agencyName}  ${compute()}`}
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
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
    >
      <ProTable<GithubIssueItem>
        rowKey="date"
        columns={Columns}
        request={getStoreList}
        columnEmptyText={false}
        params={{
          type:type,
          businessDeptId:msgDetail?.businessDeptId,
          begin:msgDetail?.begin,
          end:msgDetail?.end
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