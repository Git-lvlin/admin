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
import { priceComparsionListAlls } from '@/services/cms/member/member';


export default (props) => {
  const { detailData, setVisible, setIndexGoods, visible } = props;
  const [arr, setArr] = useState(false)
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

  const waitTime = () => {
    return new Promise((resolve, reject) => {
      if (arr.length !== 1) {
        message.error('只能添加一个商品!')
        reject(false)
        return false;
      } else {
        setIndexGoods(arr[0])
        resolve(true);
      }
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
        // 不返回不会关闭弹框
        return true;
      }}
    >
<ProTable
      rowKey="id"
      options={false}
      columns={columns}
      request={priceComparsionListAlls}
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
        setArr(a.selectedRows)
      }}
      search={false}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
    />
    </ModalForm>
  );
};