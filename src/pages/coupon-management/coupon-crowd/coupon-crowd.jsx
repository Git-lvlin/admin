import React, { useState, useRef,useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import {ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { couponCrowdList,couponCrowdStatusSub,couponCrowdDel } from '@/services/crowd-management/coupon-crowd';
import { history} from 'umi';
import SubTable from '@/pages/coupon-construction/coupon-subtable'



export default (props) =>{
  const ref=useRef()
  const columns= [
    {
      title: '群体名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          1: '关闭',
          2: '开启',
        },
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, data) => [
      <ProFormSwitch name="Switch"
        fieldProps={{
          checked: data.status==2?true:false,
          onChange:(bol)=>{
            if(bol){
              couponCrowdStatusSub({id:data.id,status:2}).then(res=>{
                if(res.code==0){
                  ref.current.reload();
                }
              })
            }else{
              couponCrowdStatusSub({id:data.id,status:1}).then(res=>{
                if(res.code==0){
                  ref.current.reload();
                }
              })
            }
          }
        }
      }
      />,
      <a
          key="a"
          onClick={()=>{
            Examine(data.id)
          }}
        >
          编辑
      </a>,
       <a
          key="a"
          onClick={()=>{
            couponCrowdDel({id:data.id}).then(res=>{
              if(res.code==0){
                ref.current.reload();
              }
            })
          }}
        >
          删除
      </a>,
      ],
    },
    
  ];
 
  //编辑
  const Examine=(id)=>{
    history.push(`/coupon-management/coupon-crowd/add-crowd?id=`+id);
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
            expandable={{ expandedRowRender: (_) => <SubTable name={_.name}/> }}
            request={couponCrowdList}
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
