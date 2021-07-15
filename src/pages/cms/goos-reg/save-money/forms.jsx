import React, { useRef, useState, useEffect  } from 'react';
import { Button, message, Form, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import { saveMoneyAdd } from '@/services/cms/member/member';
import { saveMoneyFormLists } from '@/services/cms/member/member';

export default (props) => {
  const { detailData, setVisible, setFlag, visible } = props;
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
      width: 180,
      ellipsis: true,
    },
    {
      title: '商家名称',
      dataIndex: 'supplierName',
      valueType: 'text',
      search: false,
      width: 120,
      ellipsis: true,
    },
    {
      title: '供货类型',
      dataIndex: 'goodsSaleTypeDisplay',
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
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'number',
      search: false,
    },
    {
      title: '销量',
      dataIndex: 'goodsSaleNum',
      valueType: 'number',
      search: false,
    },
  ];

  const waitTime = () => {
    const goodsInfo = arr.map(({spuId, skuId, supplierId, wholesaleType}) => {
      const theArray = {
        spuId, skuId, wholesaleType
      }
      if (supplierId) {
        theArray.supplierId = supplierId
      }
      return theArray
    });
    const param = {
      goodsInfo: goodsInfo,
    }
    return new Promise((resolve, reject) => {
      saveMoneyAdd(param).then((res) => {
        if (res.code === 0) {
          setFlag(true)
          resolve(true);
        } else {
          reject(false)
        }
      })
  
    });
  };

  useEffect(() => {

  }, [])

  return (
    <ModalForm
      width={1200}
      title={`新建`}
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
      }}
      onFinish={async () => {
        await waitTime();
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
          item.goodsSalePrice = item.goodsSalePrice/100
        })
        return data
      }}
      request={saveMoneyFormLists}
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
        setArr(a.selectedRows)
      }}
      editable={{
        type: 'multiple',
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="约购更省钱"
    />


    </ModalForm>
  );
};