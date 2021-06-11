import React, { useRef, useState, useEffect  } from 'react';
import { message, Form, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { bindSkuId } from '@/services/cms/member/member';

export default (props) => {
  const { setVisible, formData, setFlag, visible } = props;
  const [arr, setArr] = useState(null)
  const formRef = useRef();
  const [form] = Form.useForm()
  const columns = [
    {
      title: 'skuid',
      dataIndex: 'sku',
      valueType: 'text',
    },
    {
      title: 'spuid',
      dataIndex: 'spu',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'sku_name',
      valueType: 'text',
      search: false,
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      valueType: 'money',
      search: false,
    },
  ];

  const waitTime = () => {
    const param = {
      goodsSpuId: arr.goodsSpuId,
      sourceType: arr.sourceType,
      skuId: arr.skuId,
    }
    return new Promise((resolve,reject) => {
      bindSkuId(param).then((res) => {
        if (res.code === 0) {
          setFlag(true)
          resolve(true)
        } else {
          reject(false)
          return
        }
      })
  
    });
  };

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData
      })
    }
  }, [formData])

  return (
    <ModalForm
      title={'请选择您需要比价的商品规格'}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      submitter={{
        searchConfig: {
          submitText: '确定',
          resetText: '取消',
        },
      }}
      drawerprops={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async () => {
        console.log('arr', arr)
        if (arr === null||arr.length > 1) {
          message.error('请选择一种规格!');
          return false;
        }
        await waitTime();
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
<ProTable
      rowKey="skuId"
      options={false}
      columns={columns}
      params={formData}
      dataSource={formData?[formData]:false}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      // tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
      //   <Space size={24}>
      //     <span>
      //       已选 {selectedRowKeys.length} 项
      //       <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
      //         取消选择
      //       </a>
      //     </span>
      //     <span>{`待发布: ${selectedRows.reduce(
      //       (pre, item) => pre + item.containers,
      //       0,
      //     )} 个`}</span>
      //     <span>{`已发布: ${selectedRows.reduce(
      //       (pre, item) => pre + item.callNumber,
      //       0,
      //     )} 个`}</span>
      //   </Space>
      // )}
      tableAlertOptionRender={(a) => {
        setArr(a.selectedRowKeys)
      }}
      search={false}
      pagination={false}
      dateFormatter="string"
      headerTitle="添加比价商品"
    />


    </ModalForm>
  );
};