import React, { useRef, useState, useEffect  } from 'react';
import { message, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { DrawerForm } from '@ant-design/pro-form';
import { hotGoosAdd } from '@/services/cms/member/member';
import { goosReplaceList } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, onClose, visible } = props;
  const [arr, setArr] = useState(null)
  const formRef = useRef();
  const columns = [
    {
      title: 'SPUID',
      dataIndex: 'spuId',
      valueType: 'text',
    },
    {
      title: '图片',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      search: false,
    },
    {
      title: '销售价',
      dataIndex: 'goodsSalePrice',
      valueType: 'money',
      search: false,
    },
    {
      title: '库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      search: false,
    },
    {
      title: '售价最多上浮百分比',
      dataIndex: 'floatPercent',
      valueType: 'text',
      search: false,
    },
    {
      title: '一级分类',
      dataIndex: 'gcId1Display',
      valueType: 'text',
      search: false,
    },
    {
      title: '二级分类',
      dataIndex: 'gcId2Display',
      valueType: 'text',
      search: false,
    },
  ];

  const waitTime = (values) => {
    const { ...rest } = values
    const len = arr.length
    let array = []
    for(let i=0;i<len;i++) {
      array.push(arr[i].spuId)
    }
    const param = {
      tagCode: 'hot_sale',
      spuIds: array.toString(),
      goodsType: 5,
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
    <DrawerForm
      title={`${detailData ? '编辑' : '新增'}`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      submitter={{
        searchConfig: {
          submitText: '确认添加',
          resetText: '取消',
        },
      }}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
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
      postData={(data) => {
        data.forEach(item => {
          item.floatPercent = parseInt(item.floatPercent/100)
          item.goodsSalePrice = item.goodsSalePrice/100
        })
        return data
      }}
      request={goosReplaceList}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <Space size={24}>
          <span>
            {/* 已选 {selectedRowKeys.length} 项 */}
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
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="热销好货"
    />
    </DrawerForm>
  );
};