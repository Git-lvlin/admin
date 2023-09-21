import { useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import ProTable from '@/components/pro-table';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { amountTransform } from "@/utils/utils"
import type { MyComponentProps, RecordsEntity } from './data'
import type { ProColumns } from '@ant-design/pro-table'


export default (props:MyComponentProps) => {
  const { visible, setVisible, callback, dataSource } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<RecordsEntity[]>([]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };


  const columns: ProColumns[] = [
    {
      title: 'spuid',
      dataIndex: 'spuId',
      valueType: 'text',
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入skuID'
      }
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      },
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true,
    },
    {
      title: '销售价',
      dataIndex: 'salePrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true,
    },
    {
      title: '平台亏盈',
      dataIndex: 'salePriceProfitLoss',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/')
      },
      hideInSearch: true,
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <ModalForm
      title='选择商品'
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      onFinish={() => {
        const updatedRows = selectedRow?.map(item => ({
            ...item,
            id: 0,
            actPrice: amountTransform(item?.actPrice, '/'),
            batchNumber: 1,
            sort: 1
        })) || [];
        callback(updatedRows);
        setVisible(false);
        return true;
    }}
      submitter={{
        searchConfig:{
          submitText: '确认添加',
          resetText: '取消'
        }
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProTable
        columns={columns}
        headerTitle='请选择商品'
        rowKey="id"
        options={false}
        request={productList}
        params={{
          selectType: 1,
          NEGoodsSaleType: 1,
          isDrainage: 0
        }}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        pagination={{
          pageSize: 10,
        }}
        rowSelection={{
          hideSelectAll:false,
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (r)=>{
            return {
              disabled: dataSource?.find(item => item.skuId === r.id)
            }
          },
          onChange: (_, val) => {
            setSelectedRowKeys(_);
            setSelectedRow(val)
          }
        }}
      />
    </ModalForm>
  );
};