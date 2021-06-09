import React, { useRef, useState, useEffect  } from 'react';
import { Button, message, Form, Space } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { priceComparsionList, SetHotGoodsDel } from '@/services/cms/member/member';

export default (props) => {
  const { setVisible, setFlag, visible } = props;
  const [arr, setArr] = useState(null)
  const formRef = useRef();
  const columns = [
    {
      title: 'skuid',
      dataIndex: 'skuId',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
    },
  ];

  const waitTime = () => {
    console.log('arr', arr)
    const param = {
      ids: arr,
      opt: 'add'
    }
    return new Promise((resolve) => {
      SetHotGoodsDel(param).then((res) => {
        if (res.code === 0) {
          setFlag(true)
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
      request={priceComparsionList}
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