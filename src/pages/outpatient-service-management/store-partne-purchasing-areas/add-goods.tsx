import { useState, useEffect } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import ProTable from '@/components/pro-table';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { amountTransform } from "@/utils/utils"


export default (props) => {
  const { visible, setVisible, callback, dataSource } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

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


  const columns = [
    {
      title: 'spuid',
      dataIndex: 'spuId',
      valueType: 'text',
      hiddInSearch: true
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
        callback(selectedRow.map(item=>({...item,id:0,actPrice:amountTransform(item?.actPrice,'/'),divideState:0})));
        setVisible(false)
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
              disabled: dataSource.find(item => item.skuId === r.id)
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