import React, { useRef, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { hotGoosList, hotGoosOperation} from '@/services/cms/member/member';
import Edit from './edit';

const PriceComparsionManagement = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);


  const formControl = (data,type) => {
    hotGoosOperation({ids: data,status: type}).then((res) => {
      if (res.code === 0) {
        message.success(`成功`);
        actionRef.current.reset();
      }
    })
  }


  const expandedRowRender = () => {
    const data = [];
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <ProTable
        columns={[
          { title: '比价电商平台', dataIndex: 'date', key: 'date' },
          { title: 'skuid', dataIndex: 'name', key: 'name' },
  
          { title: '售卖加个', dataIndex: 'upgradeNum', key: 'upgradeNum' },
          {
            title: '链接',
            dataIndex: 'operation',
            key: 'operation',
            valueType: 'option',
            render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
          },
          {
            title: '动作',
            valueType: 'option',
            dataIndex: 'option',
            render: (text, record, _, action) => {
              return (
                <>
                  &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {}}>抓取</a>}
                </>
              )
            }
          },
        ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: 'skuId',
      dataIndex: 'skuId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '商家名称',
      dataIndex: 'goodsName',
    },
    {
      title: '结算类型',
      dataIndex: 'type',
      search: false,
    },
    {
      title: '秒约价',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '市场价',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '可用库存',
      dataIndex: 'num',
      search: false,
    },
    {
      title: '销量',
      dataIndex: 'num',
      search: false,
    },
    {
      title: '比价排名',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: { text: '全部', status: 'Default' },
        1: {
          text: '价格最低',
          status: '1',
        },
        2: {
          text: '第二低价',
          status: '2',
        },
        3: {
          text: '第三低价',
          status: '2',
        },
        4: {
          text: '第四低价',
          status: '2',
        },
        5: {
          text: '第五低价',
          status: '2',
        },
        6: {
          text: '价格最高',
          status: '2',
        },
        7: {
          text: '未比价',
          status: '2',
        },
      }
    },
    {
      title: '比价排名',
      dataIndex: 'status',
      valueType: 'text',
      search: false,
      valueEnum: {
        1: '价格最低',
        2: '第二低价',
        3: '第三低价',
        4: '第四低价',
        5: '第五低价',
        6: '价格最高',
        7: '未比价',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {}}>比价设置</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="d" onClick={() => {formControl(record.id,4)}}>删除</a>}
          </>
        )
      }
    },
  ]

  return (
    <PageContainer>
      <ProTable
      rowKey="id"
      columns={columns}
      expandable={{ expandedRowRender }}
      actionRef={actionRef}
      request={hotGoosList}
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
          <span>{`待发布: ${selectedRows.reduce(
            (pre, item) => pre + item.containers,
            0,
          )} 个`}</span>
          <span>{`已发布: ${selectedRows.reduce(
            (pre, item) => pre + item.callNumber,
            0,
          )} 个`}</span>
        </Space>
      )}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="数据列表"
      toolBarRender={(_,record) => [
        <Button key="button" icon={<PauseCircleOutlined />} type="primary" onClick={() => { setFormVisible(true) }}>
          添加比价商品
        </Button>,
        <Button key="button" icon={<MinusOutlined />} type="primary" onClick={() => { formControl(record.selectedRowKeys.toString(), 4) }}>
          批量删除
        </Button>,
      ]}
      />
      {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      // detailData={detailData}
      callback={() => { actionRef.current.reload() }}
      onClose={() => { actionRef.current.reload() }}
    />}
    </PageContainer>
  )

}

export default PriceComparsionManagement