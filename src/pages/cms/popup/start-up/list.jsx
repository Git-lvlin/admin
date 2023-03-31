import { useState,useRef } from 'react';
import { Button, Image, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@/components/PageContainer';
import StartUp from './start-up'
import { adimgList, adimgDeleteByIds, adimgEnableByIds } from '@/services/cms/member/member';

const { confirm } = Modal;


export default ()=> {
const [selectedRowKeys, setSelectedRowKeys] = useState([])
const [visible, setVisible] = useState(false)
const [msgDatail, setMsgDatail] = useState()
const ref=useRef()

const handleEnable = (ids,status) => { 
  adimgEnableByIds({ ids,status }).then((res) => {
    if(res.code===0){
      Modal.destroyAll();
      ref.current.reload();
      setSelectedRowKeys([])
    }
  });
 };

// 定义showDeleteConfirm方法，弹出确认删除弹窗
const showDeleteConfirm = (ids) => {
    if(typeof ids === 'string') ids = [ids];
    confirm({
      title: '确定要执行该操作吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          // 执行删除操作的接口请求
          adimgDeleteByIds({ ids:ids }).then((res) => {
            // 接口请求成功后关闭弹窗，resolve Promise
            if(res.code===0){
              Modal.destroyAll();
              ref.current.reload();
              setSelectedRowKeys([])
              resolve();
            } else {
              // 接口请求失败，reject Promise
              reject();
            }
          });
        });
      },
    });
  };

const columns = [
  {
    title: '全选',
    width: 50,
    hideInSearch: true
  },
  {
    title: '编号',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '缩略图',
    dataIndex: 'img',
    render: (text, record) => (
      <Image src={text} style={{ width: 60 }} />
    ),
    align: 'center',
    hideInSearch: true
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '跳转链接',
    dataIndex: 'link',
    render: (text, record) => (
      <a href={text} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ),
    align: 'center',
    hideInSearch: true
  },
  { 
    title: '状态',
    dataIndex: 'status', 
    render: (text, record) => ( 
      <span> 
        {text === 1 ? '正常' : '隐藏'}
      </span>
     ),
     align: 'center',
     hideInSearch: true
   },
   { 
      title: '最近操作人', 
      dataIndex: 'operator', 
      align: 'center',
      hideInSearch: true
    }, 
    { 
      title: '操作', 
      dataIndex: 'operation', 
      align: 'center',
      render: (text, record) => {
        return [
          <a key='edit' onClick={() => { setVisible(true); setMsgDatail(record) }}>修改 &nbsp;</a>,
          <a key='delete' onClick={() => { showDeleteConfirm(record.id) }}>删除</a>
        ]
      },
      hideInSearch: true
    }, 
];
    return (
    <PageContainer>
      <ProTable
        rowKey='id'
        options={false}
        columns={columns}
        actionRef={ref}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            <Button key='close' style={{ marginLeft: 8 }} onClick={()=>{selectedRowKeys.length&&handleEnable(selectedRowKeys,2)}} > 关闭 </Button>,
            <Button key='start' style={{ marginLeft: 8 }} onClick={()=>{selectedRowKeys.length&&handleEnable(selectedRowKeys,1)}} > 启用 </Button>,
            <Button key='delete' style={{ marginLeft: 8 }} onClick={()=>{ selectedRowKeys.length&&showDeleteConfirm(selectedRowKeys) }} > 批量删除</Button>,
            <Button key='addStartup' type="primary" icon={<PlusOutlined />} onClick={()=>{ setVisible(true) }}> 添加启动页</Button>
          ]
        }}
        pagination={{
          pageSize: 10
        }}
        request={adimgList}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            setSelectedRowKeys(_)
          }
        }}
      />
      {
        visible&&<StartUp
          visible={visible}
          setVisible={setVisible}
          msgDatail={msgDatail}
          callback={()=>{ ref.current.reload(); setMsgDatail('') }}
        />
      }
    </PageContainer>
    ); 
    };