import React, { useEffect, useState,useRef } from 'react'
import { Spin, Empty, Switch,Form } from 'antd'
import * as api from '@/services/product-management/product-category'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import Journal from './journal';
import styles from './style.less'
import ProTable from '@ant-design/pro-table';
import AuditModel from './audit-model'
import { audit } from 'rxjs';


const List = (props) => {
  const { parentId = 0, onClick = () => { }, check,audit } = props;
  const [loading, setLoading] = useState(false);
  const actionRef=useRef()
  const [form] = Form.useForm();
  const defaultData= [
    {
      id: 624748504,
      imges:'https://images.pexels.com/photos/8642176/pexels-photo-8642176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: '乡村振兴',
      ratio: 80,
      state: '1',
      explain: '店主：80%',
    },
    {
      id: 624691229,
      imges:'https://images.pexels.com/photos/10253213/pexels-photo-10253213.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: '百货商品',
      ratio: 90,
      state: '2',
      explain: '运营中心：20%',
    },
  ];
  const columns = [
    {
      title: '分类图片',
      dataIndex: 'imges',
      valueType: 'image',
      editable:false,
    },
    {
      title: '分类名称',
      dataIndex: 'title',
      editable:false,
      render: (_,r) =>{
        return <p onClick={()=>onClick(r.id)}>{_}</p>
      }
    },
    {
      title: '店主额外奖励占总额外奖励比例',
      dataIndex: 'ratio',
      valueType: 'percent'
    },
    {
      title: '额外奖励说明',
      dataIndex: 'explain',
      valueType: 'text',
      editable:false,
    },
    {
      title: '更新状态',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        0: '全部',
        1: '待审核(店主占90%)',
        2: '审核拒绝(拒绝原因)',
        3: '审核通过'
      },
      editable:false
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
           audit(record)
          }}
        >
          审核
        </a>,
        <a  onClick={()=>check(record.id)}>日志</a>
      ],
    },
  ];
  return (
    <Spin
      spinning={loading}
    >
      <div style={{ marginRight: 50 }}>
        <ProTable
          rowKey="id"
          actionRef={actionRef}
          headerTitle={`${parentId?'二':'一'}级分类`}
          maxLength={5}
          columns={columns}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true,
          })}
          options={false}
          search={false}
          style={{width:'800px'}}
          pagination={{
            pageSize: 10,
        }}
      />
      </div>
    </Spin>
  )
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [auditVisible, setAuditVisible] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [formParams, setFormParams] = useState({})
  const [formDetail , setFormDetail ] = useState({})

  const check = (params) => {
    setFormParams(params)
    setVisible(true)
  }

  const audit = (detail) => {
    setAuditVisible(true)
    setFormDetail(detail)
  }

  return (
    <>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <List onClick={(id) => { setSelectId(id);console.log('id',id) }} check={check} audit={audit} />
        {selectId && <List parentId={selectId} check={check} audit={audit} />}
      </div>
      {visible && <Journal
        visible={visible}
        setVisible={setVisible}
        {...formParams}
      />}
      {auditVisible && <AuditModel
        visible={auditVisible}
        setVisible={setAuditVisible}
        {...formDetail}
      />}
    </>
  )
}

