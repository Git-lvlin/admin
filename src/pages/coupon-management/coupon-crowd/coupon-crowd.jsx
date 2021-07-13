import React, { useState, useRef } from 'react';
import { Button,Tabs} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { couponList } from '@/services/coupon-management/coupon-list';
import DeleteModal from '@/components/DeleteModal'
import { history} from 'umi';



export default (props) =>{
  const [visible, setVisible] = useState(false);
  const ref=useRef()
  const columns= [
    {
      title: '群体名称',
      dataIndex: 'couponName',
      valueType: 'text',
    },
    {
      title: '选项',
      dataIndex: 'couponType',
      hideInSearch: true,
    },
    {
        title: '范围',
        dataIndex: 'couponStatus',
        valueType: 'select',
        valueEnum: {
          1: '包含',
          2: '不包含',
        },
        hideInSearch: true,
    },
    {
        title: '条件',
        dataIndex: 'useType',
        hideInSearch: true,
    },
    {
        title: '状态',
        dataIndex: 'couponStatus',
        valueType: 'select',
        valueEnum: {
          1: '开启',
          2: '关闭',
        },
        hideInSearch: true,
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, data) => [
      <a
          key="a"
          onClick={()=>{
            Examine(data.id)
          }}
        >
          {
            type==1?
            '编辑'
            :null
          }
      </a>,
      <DeleteModal
        record={data} 
        boxref={ref} 
        text={'确定要删除所选优惠券吗？'} 
        // InterFace={dynamicDelete} 
        blok={type}
        title={'操作确认'}
      />
      ],
    },
    
  ];
 
  //编辑
  const Examine=(id)=>{
    history.push(`/coupon-management/coupon-list/construction?id=`+id);
  }
  //新建
  const addcoupon=()=>{
    history.push('/coupon-management/coupon-crowd/add-crowd');
  }
  return (
    <PageContainer>
        <Button
            key="primary"
            type="primary"
            style={{marginBottom:'20px'}}
            onClick={addcoupon}
        >
            新建
        </Button>
      <ProTable
            actionRef={ref}
            rowKey="id"
            options={false}
            // params={{
            // status: 1,
            // }}
            // request={couponList}
            search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
            ],
            }}
            columns={columns}
      />
    </PageContainer>
  )
}
