import React, { useState, useRef } from 'react'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@ant-design/pro-table'
import * as api from '@/services/message-management/message-template-config'
import PopForm from './form'
import '../styles.less'

import { Tabs } from 'antd'
const { TabPane } = Tabs

const message = (type, module) => {
  const [selectItem, setSelectItem] = useState(null)
  const actionRef = useRef()
  const [formVisible, setFormVisible] = useState(false)
  const columns = [
    { 
      title: '消息编号',
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 100,
    },
    { 
      title: '消息名称', 
      dataIndex: 'name',
      align: 'center' 
    },
    { 
      title: '消息模板-标题', 
      dataIndex: 'templateTitle', 
      align: 'center' 
    },
    { 
      title: '消息模板-内容', 
      dataIndex: 'templateCopywritingContent', 
      width: '30%',
      align: 'center' 
    },
    { 
      title: '推送渠道',
      dataIndex: 'pushType',
      align: 'center',
      valueEnum: {
        1: '站内信',
        2: '推送消息',
        3: '短信',
        4: '小程序'
      }
    },
    { 
      title: '消息类型',
      dataIndex: 'type',
      hideInTable: true 
    },
    { 
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <a onClick={ () => {setSelectItem(record); setFormVisible(true)} }>配置</a>
        )
      },
      align: 'center'
    }
  ]
  return(
    <>
      <ProTable
        rowKey='id'
        search={false}
        toolBarRender={false}
        columns={columns}
        actionRef={actionRef}
        params={{toType: type, moduleType: module}}
        request={api.messageTemplateList}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
      />
      <PopForm
        visible={formVisible}
        setVisible={setFormVisible}
        callback={() => { actionRef.current.reload() }}
        onClose={() => { setSelectItem(null) }}
        data={selectItem}
      />
    </>
  )
}

const Index = () => {
  return (
    <PageContainer
      header={{
        title: false
      }}
    >
      <Tabs
        defaultActiveKey="1"
        style={{
          background: '#fff',
          padding: 25
        }}
      >
        <TabPane tab="订单消息" key="1">
          {message(1, 1)}
        </TabPane>
        <TabPane tab="物流消息" key="2">
          {message(1, 2)}
        </TabPane>
        <TabPane tab="社区消息" key="3">
          { message(1, 5) }
        </TabPane>
        <TabPane tab="服务消息" key="4">
          { message(1, 4) }
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}

export default Index
