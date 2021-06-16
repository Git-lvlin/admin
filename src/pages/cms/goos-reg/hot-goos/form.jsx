import React, { useRef, useState, useEffect  } from 'react';
import { message, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import { hotGoosAdd } from '@/services/cms/member/member';
import { todayAllGoodsList } from '@/services/cms/member/member';





export default (props) => {
  const { setVisible, setFlag, visible } = props;
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
      title: '商家名称',
      dataIndex: 'supplierName',
      valueType: 'text',
      search: false,
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
    // {
    //   title: '活动库存',
    //   dataIndex: 'activityStockNum',
    //   valueType: 'number',
    //   search: false,
    // },
    {
      title: '销量',
      dataIndex: 'goodsSaleNum',
      valueType: 'number',
      search: false,
    },
  ];

  const waitTime = (values) => {
    const { ...rest } = values
  
    const param = {
      tagCode: 'hot_sale',
      spuIds: arr,
      ...rest
    }
    return new Promise((resolve) => {
      hotGoosAdd(param).then((res) => {
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
      title={`新增`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      submitter={{
        searchConfig: {
          submitText: '确认添加',
          resetText: '取消',
        },
      }}
      drawerprops={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
<ProTable
      rowKey="spuId"
      options={false}
      columns={columns}
      postData={(data) => {
        data.forEach(item => {
          item.goodsSalePrice = parseInt(item.goodsSalePrice/100)
        })
        return data
      }}
      request={todayAllGoodsList}
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
      headerTitle="热销好货"
    />
    </ModalForm>
  );
};