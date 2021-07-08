import React, { useState, useRef } from 'react';
import { Button,Tabs} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import XLSX from 'xlsx'
import { couponList } from '@/services/coupon-management/coupon-list';
import AddModel from './add-model'
import EndModel from './end-model'
import { history,connect } from 'umi';
const { TabPane } = Tabs


const message = (type, module,dispatch) => {
  const ref=useRef()
  const columns= [
    {
      title: '优惠券名称',
      dataIndex: 'couponName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入优惠券名称'
      },
    },
    {
      title: '优惠券类型',
      dataIndex: 'couponType',
      valueType: 'select',
      valueEnum: {
        1: '满减券',
        2: '折扣券',
        3: '立减券'
      }
    },
    // {
    //   title: '使用范围',
    //   dataIndex: 'useType',
    //   valueEnum: {
    //     1: '秒约商品',
    //     2: '集约商品',
    //   },
    //   hideInSearch: true,
    // },
    {
      title: '面值',
      dataIndex: 'useType',
      hideInSearch: true,
    },
    {
      title: '发行方式',
      dataIndex: 'useType',
      hideInSearch: true,
    },
    {
      title: '发行总金额（元）',
      dataIndex: 'issueQuantity',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '发行总数量（张）',
      dataIndex: 'issueQuantity',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '可领取时间',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      hideInSearch: true,
      ellipsis:true
    },
    // {
    //   title: '已被领取',
    //   dataIndex: 'lqCouponQuantity',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    // {
    //   title: '已被使用',
    //   dataIndex: 'useCouponQuantity',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    {
      title: '有效期',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '状态',
      dataIndex: 'couponStatus',
      valueType: 'select',
      valueEnum: {
        1: '未开始',
        2: '进行中',
        3: '已结束',
        4: '已终止'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '创建人',
    //   dataIndex: 'adminName',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
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
          查看
      </a>,
      <AddModel boxref={ref} data={data}/>,
      <EndModel boxref={ref} data={data}/>,
      <a
        key="a"
        onClick={()=>CodeLibrary(data.id)}
      >
        码库
      </a>
      ],
    },
    
  ];
 
  //跳转到新建页面
  const Examine=(id)=>{
    history.push(`/coupon-management/coupon-list/construction?id=`+id);
    dispatch({
      type:'DetailList/fetchLookDetail',
      payload:{id:id}
    })
  }
 
  // 跳转到码库
  const CodeLibrary=(id)=>{
    history.push(`/coupon-management/coupon-list/coupon-codebase?id=`+id);
  }

  //导出
  const exportExcel = (searchConfig) => {
    couponList({}).then(res => {
      console.log('res',res)
        const data = res.data.map(item => {
          const { ...rest } = item;
          return {
            ...rest
          }
        });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([
          {
            couponName: '优惠券名称',
            couponType: '优惠券类型',
            useType: '使用范围',
            issueQuantity: '发行总金额（元）',
            issueQuantity: '发行总数量（张）',
            lqCouponQuantity: '已被领取',
            useCouponQuantity: '已被使用',
            activityTimeDisplay: '有效期',
            createTime: '创建时间',
            adminName: '创建人',
            couponStatus: '状态'
          },
          ...data
        ], {
          header: [
            'couponName',
            'couponType',
            'useType',
            'issueQuantity',
            'issueQuantity',
            'lqCouponQuantity',
            'useCouponQuantity',
            'activityTimeDisplay',
            'createTime',
            'adminName',
            'couponStatus',
          ],
          skipHeader: true
        });
        XLSX.utils.book_append_sheet(wb, ws, "file");
        XLSX.writeFile(wb, `${+new Date()}.xlsx`)
    })
  }

  return (
      <ProTable
        actionRef={ref}
        rowKey="id"
        options={false}
        params={{
          status: 1,
        }}
        request={couponList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          <Button onClick={()=>{ref.current.reload()}} key="refresh">
            刷新
          </Button>,
          <Button onClick={()=>{exportExcel(searchConfig)}} key="out">
            导出数据
          </Button>
          ],
        }}
        columns={columns}
        toolbar={{
          actions: [
            <Button
              key="primary"
              type="primary"
              onClick={() => {
                history.push('/coupon-management/coupon-list/construction')
              }}
            >
              新建优惠券
            </Button>,
          ]
        }}
      />
  );
};

const TableList= (props) =>{
  const { dispatch }=props
  return (
    <PageContainer>
      <Tabs
        centered
        defaultActiveKey="1"
        style={{
          background: '#fff',
          padding: 25
        }}
      >
        <TabPane tab="待提交" key="1">
          {message(1, 1,dispatch)}
        </TabPane>
        <TabPane tab="审核中" key="2">
          {message(1, 2,dispatch)}
        </TabPane>
        <TabPane tab="已通过" key="3">
          { message(1, 5,dispatch) }
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}

export default connect(({ DetailList}) => ({
  DetailList
}))(TableList);
