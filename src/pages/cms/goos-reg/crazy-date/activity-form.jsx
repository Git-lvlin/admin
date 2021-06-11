
import ProTable from '@ant-design/pro-table';
import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { crazyGoodsList, crazyActivityDel } from '@/services/cms/member/member';
import { Button, Space, message } from 'antd';
import Edit from './goods-modal-form'
import ReplaceForm from './replace-form';
import ProCard from '@ant-design/pro-card';

const DetailList = (props) => {
  const { onChange, id } = props;
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [replaceFormVisible, setReplaceFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(true);
  const [acid, setAcId] = useState({cmsId: 0});

  const getDetail = (data) => {
    if (!id) {return message.error('请先选择活动')}
    const param = {
      data,
      id, 
    }
    setDetailData(param);
    setFormVisible(true);
  }

    const formControl = (data,type) => {
    crazyActivityDel({ids: data,status: type}).then((res) => {
      if (res.code === 0) {
        message.success(`${ACTION_TYPE[type]}成功`);
        actionRef.current.reset();
      }
    })
  }

  const openList = () => {
    if (!id) {
      message.error('请先选择活动')
      return;
    }
    const param = {
      id: id, 
    }
    setDetailData(param);
    setReplaceFormVisible(true);
  }

  const columns = [
    {
      title: '排序序号',
      dataIndex: 'sort',
      valueType: 'text',
      search: false,
      fixed: 'left',
      width: 80,
    },
    {
      title: 'SPUID',
      dataIndex: 'spuId',
      valueType: 'number',
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
      editable: true,
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
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: { text: '全部', status: 'Default' },
        1: {
          text: '待发布',
          status: '1',
        },
        2: {
          text: '已发布',
          status: '2',
        },
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      search: false,
      valueEnum: {
        1: '未发布',
        2: '已发布',
      }
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      width: 140,
      align: 'center',
      fixed: 'right',
      render: (text, record, _, action) => {
        return (
          <>
            &nbsp;&nbsp;{record.status===2&&<a key="down" onClick={() => {formControl(record.id, 1)}}>下线</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="view" onClick={() => {formControl(record.id,2)}}>发布</a>}
            {/* &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {action?.startEditable?.(record.key);console.log('action',action,record)}}>编辑</a>} */}
            &nbsp;&nbsp;{record.status===1&&<a key="d" onClick={() => {formControl(record.id,4)}}>删除</a>}
          </>
        )
      }
    },
  ];

  useEffect(() => {
    if (id) {
      setAcId({cmsId:id})
    }
  }, [id]);

  return (
    <>
    <ProCard style={{ maxWidth: 700,overflow:'hidden'}}>
    <ProTable
      rowKey="key"
      options={false}
      columns={columns}
      actionRef={actionRef}
      params={acid}
      postData={(data) => {
        data.forEach(item => {
          item.goodsSalePrice = parseInt(item.goodsSalePrice/100)
        })
        return data
      }}
      request={crazyGoodsList}
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
      editable={{
        type: 'multiple',
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      scroll={{ x: 2200 }}
      onRow={(record) => {
        return {
          onClick: () => {
            console.log('左侧栏点击item',record)
            if (record.title) {
              onChange(record);
            }
          },
        };
      }}
      dateFormatter="string"
      // headerTitle="正在疯约"
      toolBarRender={(_,record) => [
        <Button key="button" icon={<PlayCircleOutlined />} type="primary">
          批量发布
        </Button>,
        <Button key="button" icon={<PauseCircleOutlined />} type="primary">
          批量下线
        </Button>,
        <Button key="button" icon={<MinusOutlined />} type="primary">
          批量删除
        </Button>,
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { getDetail(record) }}>
          新增
        </Button>,
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => { openList() }}>
          新增(1688)
        </Button>,
      ]}
    />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      detailData={detailData}
      callback={() => { actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { setDetailData(null) }}
    />}
    {replaceFormVisible && <ReplaceForm
      visible={replaceFormVisible}
      setVisible={setReplaceFormVisible}
      detailData={detailData}
      callback={() => { actionRef.current.reload(); setDetailData(null) }}
      onClose={() => { actionRef.current.reload(); setDetailData(null) }}
    />}
    </ProCard>
    </>
    
  );
};

export default DetailList