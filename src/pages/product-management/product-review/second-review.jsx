import React, { useState } from 'react';
import { Drawer, Button, Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import Overrule from './overrule';


const UserDetail = (props) => {
  const { visible, setVisible, detailData, operateRole, check } = props;
  const [overruleVisible, setOverruleVisible] = useState(false);

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作角色',
      dataIndex: 'operateRole',
      onFilter: true,
      valueType: 'select',
      valueEnum: operateRole,
      hideInTable: true,
    },
    {
      title: '操作角色',
      dataIndex: 'operatorTypeDisplay',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作对象',
      dataIndex: 'operatorName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入操作对象'
      }
    },
    {
      title: '操作项',
      dataIndex: 'actionTypeDisplay',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入操作项'
      }
    },
    {
      title: '原值',
      dataIndex: 'actionBefore',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => {
        if (/https?/.test(text)) {
          const imgArr = text.split(';');
          imgArr.length -= 1;
          return imgArr.map(item => (<div key={item} style={{ marginRight: 10, display: 'inline-block' }}><Image style={{ width: 50, height: 50 }} src={item} /></div>))
        }
        return text;
      }
    },
    {
      title: '操作后新值',
      dataIndex: 'actionAfter',
      valueType: 'text',
      hideInSearch: true,
      render: (text) => {
        if (/https?/.test(text)) {
          const imgArr = text.split(';');
          imgArr.length -= 1;
          return imgArr.map(item => (<div key={item} style={{ marginRight: 10, display: 'inline-block' }}><Image style={{ width: 50, height: 50 }} src={item} /></div>))
        }
        return text;
      }
    },
    {
      title: '说明',
      dataIndex: 'actionRemark',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      dataIndex: 'updateTime',
      valueType: 'text',
      hideInSearch: true,
    },
  ];

  return (
    <Drawer
      title="用户详情"
      width={1200}
      placement="right"
      onClose={() => { setVisible(false) }}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginLeft: 10 }} key="1" type="primary" onClick={() => { check(1, 1, detailData.spuId) }}>
            通过并上架
          </Button>
          <Button style={{ marginLeft: 10 }} key="2" onClick={() => { check(2, 1, detailData.spuId) }}>
            通过但不上架
          </Button>
          <Button style={{ marginLeft: 10 }} type="primary" key="3" danger onClick={() => { setOverruleVisible(true) }}>
            驳回
          </Button>
          <Button style={{ marginLeft: 10 }} key="4" onClick={() => { setVisible(false) }}>
            返回
          </Button>
        </div>
      }
    >
      <ProTable
        rowKey="id"
        options={false}
        dataSource={detailData.data}
        search={{
          defaultCollapsed: false,
        }}
        columns={columns}
      />
      {overruleVisible && <Overrule
        visible={overruleVisible}
        setVisible={setOverruleVisible}
        callback={(text) => { check(3, 2, detailData.spuId, text) }}
      />}
    </Drawer>
  )
}

export default UserDetail;
