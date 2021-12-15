
import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProForm, { ProFormSwitch, ProFormRadio, } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { goodsClassList, openSwitch, hideItem } from '@/services/cms/member/member';
import Edit from './form';

const BannerAdmin = () => {
  const actionRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [swc, setSwc] = useState(false);

  useEffect(() => {
    openSwitch().then((res) => {
      if (res.code === 0) {
        setSwc(+res.data.categoryOpen)
      }
    })
    return {}
  }, [])

  const onChangeSwitch = (indexStatus) => {
    const param = {
      categoryOpen: indexStatus?1:0,
    }
    openSwitch(param).then((res) => {
      if (res.code === 0) {
        setSwc(+res.data.categoryOpen)
        actionRef.current.reload();
      }
    })
  }
 
  const build = () => {
    setDetailData({})
    setFormVisible(true)
  }

  const edit = (record) => {
    const data = {
      ...record,
    }
    setDetailData(data)
    setFormVisible(true)
  }

  const hide = (id) => {
    const param = {
      isShow: 0,
      id: id
    }
    hideItem(param).then((res) => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '类目名称',
      dataIndex: 'categoryName',
      search: false,
    },
    {
      title: '显示状态',
      dataIndex: 'isShow',
      search: false,
      valueEnum: {
        0: '已隐藏',
        1: '已显示',
      }
    },
    {
      title: '商品sku数',
      dataIndex: 'skuNum',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      search: false,
      render: (_, record) => {
        return <>
          <a onClick={() => { edit(record) }}>编辑</a>&nbsp;
          <a onClick={() => { hide(record.id) }}>隐藏</a>
        </>
      }
    },
  ];

  return (
    <PageContainer>
      <ProForm.Group>
        <ProCard
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
          <ProFormSwitch
            name="switch"
            label="在app店铺管理主页展示集约采购商品的自定义分类"
            checkedChildren="开启"
            unCheckedChildren="关闭"
            fieldProps={{
              checked: swc,
              onChange: (indexData) => {
                onChangeSwitch(indexData)
              },
            }}
          />

        </ProCard>
      </ProForm.Group>
      <ProTable
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        request={goodsClassList}
        search={false}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={(_) => {
          return <Button key="button" type="primary" onClick={() => { build() }}>
            新建
          </Button>
        }}
      />
      {formVisible && <Edit
        visible={formVisible}
        setVisible={setFormVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { actionRef.current.reload(); setDetailData(null) }}
      />}
    </PageContainer>
  );
};


export default BannerAdmin