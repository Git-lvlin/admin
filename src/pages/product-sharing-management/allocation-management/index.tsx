import { useState, useRef } from 'react';
import ProTable from '@/components/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { getListByParams } from '@/services/product-management/transaction-sharing-management';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils';
import { Button, Space, Menu, Dropdown } from 'antd';
import UpdateHistory from './update-history'
import moment from 'moment';
import TerminationModel from './termination-model'
import { TableProps } from './data'
import type { ActionType } from '@ant-design/pro-table'
import Detail from './detail/index'

export default () => {
  const actionRef = useRef<ActionType>();
  const [selectItem, setSelectItem] = useState<TableProps>();
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [visit, setVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false)
  const [roleInfo,setRoleInfo] = useState()

  type SearchConfig = {
    form: {
      getFieldsValue: () => any;
    };
  };
  

  const getFieldValue = (searchConfig: SearchConfig) => {
    const { ...rest }=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }

  const handleMenuClick = ({ key }:{key:string}, data:TableProps) => {
    if (key === '1') {
      setSelectItem({ ...data })
      setFormVisible(true)
    }
    if (key === '2') {
      setSelectItem({ ...data })
      setVisible(true)
    }

    if (key === '3') {
      setSelectItem({ ...data })
      setHistoryVisible(true)
    }
  }

  const menu = (data:TableProps) => {
    return (
      <Menu onClick={(e) => { handleMenuClick(e, data) }}>
        {data?.status?<Menu.Item key="1">编辑</Menu.Item>:''}
        {data?.status?<Menu.Item key="2">终止</Menu.Item>:<Menu.Item key="2">启用</Menu.Item>}
        <Menu.Item key="3">更新历史</Menu.Item>
      </Menu>
    )
  }

  const columns =[
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
    },
    {
      dataIndex: 'name',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入业务名称'
      }
    },
    {
      title: '创建日期',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '业务名称',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '分账角色数',
      dataIndex: 'roleNum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '分账计算类型',
      dataIndex: 'billType',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: '比例',
        2: '金额'
      },
    },
    {
      title: '平台最少分账',
      dataIndex: 'platformLeastFee',
      align: 'center',
      hideInSearch: true,
      render: (_:number) => {
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true,
      width: 300
    },
    {
      title: '计账时段',
      dataIndex: 'startTime',
      align: 'center',
      hideInSearch: true,
      render: (_:number,data:TableProps) => {
        return <div style={{ color:'#06B39B' }}>
                <p>{moment(data?.startTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>{moment(data?.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
               </div>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: '开启',
        0: '已终止'
      },
    },
    {
      title: '商品',
      dataIndex: 'goodsNum',
      align: 'center',
      hideInSearch: true,
      render: (_:number, data:TableProps) => {
        return <a onClick={()=>{ setFormVisible(true);setSelectItem(data);  }}>{_}</a>
      }
    },
    {
      title: '最近操作人',
      dataIndex: 'lastEditor',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近操作时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      render: (_:string, data:TableProps) => (
        <Space>
          <Dropdown.Button onClick={() => { setSelectItem(data); setDetailVisible(true) }} overlay={() => { return menu(data) }}>管理</Dropdown.Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        bordered
        options={false}
        request={getListByParams}  
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        postData={(data)=>{
          setRoleInfo(data?.roleInfo)
          return data?.records
        }}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
             <Export
             key='export'
             change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
             type={'bill-config-list'}
             conditions={()=>{return getFieldValue(searchConfig)}}
           />,
           <ExportHistory key='task' show={visit} setShow={setVisit} type={'bill-config-list'}/>,
           <Button type='primary' onClick={()=>{ setFormVisible(true); setSelectItem(undefined) }}>新增</Button>
          ],
        }}
      />
      {
        formVisible &&
        <Detail
          visible={formVisible}
          setVisible={setFormVisible}
          callback={()=>{ setSelectItem(undefined); actionRef?.current?.reload() }}
          id={selectItem?.id}
        />
      }
      {
        historyVisible &&
        <UpdateHistory
          visible={historyVisible}
          setVisible={setHistoryVisible}
          msgDetail={selectItem}
          roleInfo={roleInfo}
        />
      }
      {
        visible &&
        <TerminationModel
          visible={visible}
          setVisible={setVisible}
          msgDetail={selectItem}
          callback={()=>{ setSelectItem(undefined); actionRef?.current?.reload() }}
        />
      }

    </PageContainer>
  );
};
