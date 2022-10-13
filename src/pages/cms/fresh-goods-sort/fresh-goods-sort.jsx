
import { useRef, useState, useEffect } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, message, Space, Select,Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { getSpuList, goodsSortTop, goodsSortTopCancel, goodsMoveSort, modifySpuCategory, goodsClassList } from '@/services/cms/fresh-goods-sort';
import Sort from './sort';
import { amountTransform } from '@/utils/utils'
import Putaway from './putaway'
import GcCascader from '@/components/gc-cascader'
import Form from './form';
import Edit from './edit';

const BannerAdmin = () => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [goodsClass, setGoodsClass] = useState(null);
  const [itemClass, setItemClass] = useState(null);
  const [selected, setSelected] = useState(true);
  const [selectedRows,setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    goodsClassList().then((res) => {
      setGoodsClass(res.data.map(item => ({ label: item.categoryName, value: item.id })))
    })
    return {}
  }, [])

  const push = (selectedRowKeys) => {
    if (!selectedRowKeys||!selectedRowKeys.length) {
      message.error('请先勾选商品！')
      return
    }
    const param = {
      spuIds: selectedRowKeys.toString(),
      wscId: itemClass,
    }
    modifySpuCategory(param).then((res) => {
      if(res.code==0){
        message.success('添加成功')
        actionRef.current.reload();
        setSelectedRowKeys([])
        setItemClass(null)
      }
    })
  }

  const moveSort = (record, moveUp) => {
    const { spuId } = record;
    const param = {
      spuId,
      moveUp,
    }
    goodsMoveSort(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const top = (record, type) => {
    const { spuId } = record;
    let api = type?goodsSortTop:goodsSortTopCancel
    const param = {
      spuId,
    }
    api(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const changeHandle = (v) => {
    setItemClass(v)
  }

  const onFF=(bol,data)=>{
    cardStatusSub({id:data.id,status:bol?1:0}).then(res=>{
    if(res.code==0){
        message.success('设置成功');
        ref?.current?.reload()
    }
    })
  }

  const editSort = (record) => {
    setDetailData(record)
    setSortVisible(true)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
    },
    {
      title: '运营类目',
      hideInTable: true,
      dataIndex: 'wscId',
      renderFormItem: () => (<GcCascader />)
    },
    {
      title: '主图',
      dataIndex: 'imageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      search: false,
    },
    {
      title: '一级分类',
      dataIndex: 'gcName1',
      search: false,
    },
    {
      title: '运营类目',
      dataIndex: 'gcName1',
      search: false,
    },
    {
      title: '店主新集约价',
      dataIndex: 'distributePriceStr',
      search: false,
    },
    {
      title: '起订量',
      dataIndex: 'defaultBuyNumStr',
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '考核业绩状态',
      dataIndex: 'orderLimit',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum:{
        1:'考核业绩',
        0:'不考核业绩',
      },
    },
    {
      title: '考核业绩状态',
      dataIndex: 'orderLimit',
      align: 'center',
      hideInSearch: true,
      render: (_,r) => {
       return <Switch checked={_} onChange={(bol)=>{onFF(bol,r)}}/>
      },
    },
    {
      title: '分成状态',
      dataIndex: 'commissionConfig',
      align: 'center',
      hideInTable: true,
      valueType: 'select',
      valueEnum:{
        1:'已设置分成',
        0:'未设置分成',
      },
    },
    {
      title: '分成状态',
      dataIndex: 'commissionConfig',
      align: 'center',
      hideInSearch: true,
      render: (_,record) => {
       return <a key='putaway' onClick={()=>{setDetailData(record);setEditVisible(true)}}>{_?'已配置':'未配置'}</a>
      },
    },
    {
      title: '上架状态',
      dataIndex: 'goodsState',
      valueEnum:{
        1:'已上架',
        0:'已下架',
      },
      fieldProps: {
        placeholder: '请选择上架状态'
      },
      hideInTable: true,
      fieldProps: {
        placeholder: '请选择上架状态'
      }
    },
    {
      title: '上架状态',
      dataIndex: 'goodsState',
      valueEnum:{
        1:'已上架',
        0:'已下架',
      },
      hideInSearch: true
    },
    {
      title: '采购列表序号',
      hideInSearch: true,
      render: (_, record) => {
        return <>
          <a onClick={() => { editSort(record) }}>设置序号</a>&nbsp;
          <Button icon={<ArrowDownOutlined />} onClick={() => { moveSort(record, 0 ) }}></Button>&nbsp;
          {record.sort!==1&&<Button icon={<ArrowUpOutlined />} onClick={() => { moveSort(record, 1) }}></Button>}&nbsp;
          {record.sortIsTop==0&&<a onClick={() => { top(record, 1) }}>置顶</a>}&nbsp;
          {record.sortIsTop==1&&<a onClick={() => { top(record, 0) }}>取消置顶</a>}&nbsp;
        </>
      }
    },
    {
      title: '操作列',
      key: 'option',
      valueType: 'option',
      render:(text, record, _, action)=>{
        return <>
         {record.goodsState==1&&<a onClick={() => { setVisible(true);setSelectedRows([record?.spuId]) }}>下架</a>}&nbsp;
         {record.goodsState==0&&<a key='putaway' onClick={()=>{setDetailData(record);setFormVisible(true)}}>上架</a>}
        </>
      },
    }, 
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="spuId"
        columns={columns}
        actionRef={actionRef}
        request={getSpuList}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle={selected&&<Space size={24}>
        <span>
          <span style={{marginRight: 20}}>添加到 </span>
          <GcCascader onChange={changeHandle} placeholder="请选择运营类目"/>
          <a style={{ marginLeft: 8 }} onClick={() => {push()}}>
            确定
          </a>
          <a style={{ marginLeft: 8 }} onClick={() => {message.error('请先勾线商品！')}}>
            批量下架
          </a>
        </span>
      </Space>}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: (_, val) => {
            setSelectedRowKeys(_);
          }
        }}
        alwaysShowAlert={true}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
          if (selectedRowKeys.length) {
            setSelected(false)
          } else {
            setSelected(true)
          }
          return(
          <>
            <span>
              已选 {selectedRowKeys.length} 项
              <span>添加到</span>&nbsp;
              {/* <Select
                placeholder="请选择运营类目"
                options={goodsClass}
                value={itemClass}
                onChange={changeHandle}
                allowClear
              /> */}
              <GcCascader onChange={changeHandle} placeholder="请选择运营类目"/>
              <a style={{ marginLeft: 8 }} onClick={() => {push(selectedRowKeys)}}>
                确定
              </a>
              <a style={{ marginLeft: 8 }} onClick={() => {setVisible(true);setSelectedRows(selectedRowKeys)}}>
                批量下架
              </a>
            </span>
            
          </>
        )}}
        dateFormatter="string"
      />
      
      {sortVisible && <Sort
        visible={sortVisible}
        setVisible={setSortVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { actionRef.current.reload(); setDetailData(null) }}
      />}
      {visible && <Putaway
        visible={visible}
        setVisible={setVisible}
        selectedRows={selectedRows}
        callback={() => { actionRef.current.reload(); setSelectedRows(null) }}
        onClose={() => { actionRef.current.reload(); setSelectedRows(null) }}
      />}
      {formVisible && <Form
        visible={formVisible}
        setVisible={setFormVisible}
        onClose={() => { setFormVisible(false); setDetailData(null) }}
        detailData={detailData}
        callback={() => { actionRef.current.reload();setDetailData(null) }}
      />}
      {editVisible && <Edit
        visible={editVisible}
        setVisible={setEditVisible}
        onClose={() => { actionRef.current.reload();setEditVisible(false); setDetailData(null) }}
        detailData={detailData}
        callback={() => { actionRef.current.reload();setDetailData(null) }}
      />}
    </PageContainer>
  );
};


export default BannerAdmin