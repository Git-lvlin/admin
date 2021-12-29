import React, { useEffect, useState,useRef } from 'react'
import { Spin, Empty, Switch,Form,InputNumber } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import * as api from '@/services/product-management/product-category'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import Journal from './journal';
import styles from './style.less'
import { EditableProTable } from '@ant-design/pro-table';


const List = (props) => {
  const { parentId = 0, onClick = () => { }, check, remove } = props;
  const [loading, setLoading] = useState(false);
  const actionRef=useRef()
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [form] = Form.useForm();
  const FromWrap = ({ value, onChange, content, right }) => (
    <div>
      <div>{content(value, onChange)}</div>
      <div>{right(value)}</div>
    </div>
  )
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
      title: 'id',
      dataIndex: 'id',
      editable:false,
      hideInTable:true
    },
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
      valueType: 'percent',
      renderFormItem: (_,r) => {
        return <FromWrap
                content={
                  (value, onChange) => 
                  <InputNumber
                    min="0"
                    max="100"
                    precision='2'
                    value={value}
                    onChange={onChange}
                    // addonAfter="%"
                    stringMode
                  />
                 }
                right={(value) => {
                  return (
                    <p>运营中心：20%</p>
                  )
                }}
              />
        },
      render: (_,r) =>{
        return <p>{_}</p>
      }
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
      width:'25%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          更新比例
        </a>,
        <a key="log" onClick={()=>check(record.id)}>日志</a>
      ],
    },
  ];
  return (
    <Spin
      spinning={loading}
    >
        <EditableProTable
          rowKey="id"
          actionRef={actionRef}
          headerTitle={`${parentId?'二':'一'}级分类`}
          maxLength={5}
          // 关闭默认的新建按钮
          recordCreatorProps={false}
          columns={columns}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true,
          })}
          value={dataSource}
          onChange={(value)=>{
            setDataSource(value)
            console.log('最终得到的值',value)
          }}
          editable={{
            form,
            editableKeys,
            onSave: async (rowKey, data, row) => {
              // console.log('rowKey', rowKey);
              // console.log('data', data);
              // console.log('row', row)
            },
            onCancel:async (rowKey, data, row) => {
              setEditableRowKeys([])
            },
            onChange: setEditableRowKeys,
            actionRender: (row, config, dom) => [
              <a 
                key='sub' 
                onClick={()=>{
                  const obj={
                    ...row,
                    ratio:config?.form?.getFieldValue()[row.id].ratio,
                  }
                  config?.onSave(row.id,obj,row)
                }}
              >提交审核</a>,
              <a key='cancel' 
                onClick={()=>{
                  const obj={
                    ...row,
                    ratio:config?.form?.getFieldValue()[row.id].ratio,
                  }
                  config?.onCancel(row.id,obj,row)
                }}
              >取消更新</a>
            ],
          }}
          style={{width:'800px'}}
      />
    </Spin>
  )
}

const PlatforBonusPercentage = () => {
  const [visible, setVisible] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [formParams, setFormParams] = useState({})

  const check = (params) => {
    setFormParams(params)
    setVisible(true)
  }

  const remove = (id, cb) => {
    api.categoryDel({
      id
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        if (cb) {
          cb();
        }
      }
    })
  }

  return (
    <PageContainer>
      {visible && <Journal
        visible={visible}
        setVisible={setVisible}
        {...formParams}
      />}
      <div className={styles.header}>
        <p>* 平台总额外奖励占商品盈利比例：90%</p>
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent:'space-between' }}>
        <List onClick={(id) => { setSelectId(id);console.log('id',id) }} check={check} remove={remove} />
        {selectId && <List parentId={selectId} check={check} remove={remove} />}
      </div>
    </PageContainer>
  )
}

export default PlatforBonusPercentage;

