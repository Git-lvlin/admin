import React, { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import AddressMultiCascader from '@/components/address-multi-cascader'
import { Button, message } from 'antd';
import { getApplicableArea, setApplicableArea, changeApplicableArea } from '@/services/intensive-store-management/shop-area'
import { getAreaData } from '@/utils/utils'


const ShopArea = () => {
  const [tips, setTips] = useState('');
  const [selectKeys, setSelectKeys] = useState([]);
  const [uncheckableItemValues, setUncheckableItemValues] = useState([]);
  const [disabledItemValues, setDisabledItemValues] = useState([]);
  const actionRef = useRef();
  const formRef = useRef();

  const changeStatus = (data) => {
    changeApplicableArea({
      status: data.status === 'on' ? 'off' : 'on',
      regionId: data.regionId,
      cityId: data.cityId,
      provinceId: data.provinceId,
    }, { showSuccess: true })
      .then(res => {
        if (res.code === 0) {
          actionRef.current.reload();
        }
      })
  }

  const columns = [
    {
      title: '省份',
      dataIndex: 'provinceName',
      valueType: 'text',
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      valueType: 'text',
    },
    {
      title: '地区/县城',
      dataIndex: 'regionName',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      render: (_) => {
        return <span style={{ color: _ === 'on' ? 'green' : 'red' }}>{_ === 'on' ? '启用' : '禁用'}</span>
      }
    },
    {
      title: '操作',
      valueType: 'options',
      render: (_, data) => {
        return <a onClick={() => { changeStatus(data) }}>{data.status === 'on' ? '禁用' : '启用'}</a>
      }
    },
  ];

  const postData = (data) => {
    if (data.tips) {
      setTips(data.tips)
    }
    return data.records;
  }

  const getUncheckableItemValues = () => {
    setUncheckableItemValues(window.yeahgo_area.filter(item => item.deep !== 3).map(item => item.id))
    getApplicableArea({
      page: 1,
      size: 9999,
    }).then(res => {
      const keys = res.data.records.map(item => item.regionId)
      setDisabledItemValues(keys)
    })
  }

  const setArea = () => {
    if (selectKeys.length === 0) {
      message.error('请选择要添加的区域')
      return;
    }
    setApplicableArea({
      areas: getAreaData(selectKeys).map(item => ({ ...item, status: 'on' })),
      append: true,
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
        getUncheckableItemValues();
        document.querySelector('.tips').click()
      }
    })
  }

  useEffect(() => {
    getUncheckableItemValues();
  }, [])

  return (
    <PageContainer>
      <div style={{ backgroundColor: '#fff', padding: 30 }}>
        <AddressMultiCascader
          style={{ width: 130 }}
          value={selectKeys}
          placeholder="添加地区"
          renderValue={() => <span style={{ color: '#8e8e93' }}>添加地区</span>}
          cleanable={false}
          renderExtraFooter={() => <div style={{ padding: 10, textAlign: 'right' }}><Button type="primary" onClick={() => { setArea() }}>确定</Button></div>}
          onChange={setSelectKeys}
          uncheckableItemValues={uncheckableItemValues}
          disabledItemValues={disabledItemValues}
          onClose={() => { setSelectKeys([]) }}
        />
        <div style={{ marginTop: 20, textAlign: 'right' }} className="tips">
          {tips}
        </div>
      </div>
      <ProTable
        rowKey="regionId"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        request={getApplicableArea}
        search={false}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        postData={postData}
      />
      <div style={{ backgroundColor: '#fff', padding: 30, display: 'flex' }}>
        设置后立即生效，只对生效后新申请的店铺有效，已申请店铺按原设置实施！
      </div>
    </PageContainer>
  );
};

export default ShopArea;
