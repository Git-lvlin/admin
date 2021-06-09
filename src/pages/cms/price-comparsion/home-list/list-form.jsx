import React, { useRef, useState, useEffect  } from 'react';
import { Button, message, Form, Space } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { hotGoosAdd } from '@/services/cms/member/member';
import { priceComparsionListAll } from '@/services/cms/member/member';


export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const [arr, setArr] = useState(null)
  const formRef = useRef();
  const columns = [
    {
      title: 'skuid',
      dataIndex: 'goodsSkuId',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
    },
  ];

  const waitTime = (values) => {
    const { ...rest } = values
  
    const param = {
      spuIds: arr,
      ...rest
    }
    return new Promise((resolve) => {
      hotGoosAdd(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        }
      })
  
    });
  };

  useEffect(() => {

  }, [])

  return (
    <ModalForm
      title={`选择比较商品`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      submitter={{
        searchConfig: {
          submitText: '确认',
          resetText: '取消',
        },
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
<ProTable
      rowKey="id"
      options={false}
      columns={columns}
      request={priceComparsionListAll}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
          {/* <span>{`待发布: ${selectedRows.reduce(
            (pre, item) => pre + item.containers,
            0,
          )} 个`}</span>
          <span>{`已发布: ${selectedRows.reduce(
            (pre, item) => pre + item.callNumber,
            0,
          )} 个`}</span> */}
        </Space>
      )}
      tableAlertOptionRender={(a) => {
        setArr(a.selectedRowKeys.toString())
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
    />
    </ModalForm>
  );
};