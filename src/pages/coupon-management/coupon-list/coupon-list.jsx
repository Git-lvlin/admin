import React, { useState, useRef } from 'react';
import { Button,Tabs} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import XLSX from 'xlsx'
import { couponList } from '@/services/coupon-management/coupon-list';
import DeleteModal from '@/components/DeleteModal'
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
    {
      title: '面值',
      dataIndex: 'couponAmountDisplay',
      hideInSearch: true,
    },
    {
      title: '发行方式',
      dataIndex: 'issueType',
      valueEnum: {
        1: '会员领取券',
        2: '系统发放券'
      },
    },
    {
      title: '发行总金额（元）',
      dataIndex: 'issueAmount',
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
    {
      title: '有效期',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      hideInSearch: true,
      ellipsis:true
    },
    {
      title: '审核状态',
      dataIndex: 'couponVerifyStatus',
      valueType: 'select',
      valueEnum: {
        1: '待提交',
        2: '审核驳回',
        3: '审核中',
        4: '已通过'
      },
      hideInSearch:true
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
      },
      hideInSearch:type!=4,
      hideInTable:true
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
      <a key="a" onClick={()=>{ Examine(data.id) }}>
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
      />,
      <a key="a" onClick={()=>{ look(data.id)}}>
        {
          type==3||type==4?
          '查看'
          :null
        } 
      </a>,
       <a key="a" onClick={()=>{ look(data.id)}}>
       {
          type==3?
          '撤回'
          :null
       }
      </a>,
      // <AddModel boxref={ref} data={data}/>,
      <EndModel type={type} boxref={ref} data={data}/>,
      <a key="a" onClick={()=>CodeLibrary(data.id)}>
        {
           type==4?
           '码库'
           :null
        }
      </a>
      ],
    },
    
  ];
 
  //编辑
  const Examine=(id)=>{
    history.push(`/coupon-management/coupon-list/construction?id=`+id);
    dispatch({
      type:'DetailList/fetchLookDetail',
      payload:{id:id}
    })
  }
  //查看
  const look=(id)=>{
    history.push(`/coupon-management/coupon-list/list-details?id=`+id);
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
          couponVerifyStatus: type,
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
      />
  );
};

const TableList= (props) =>{
  const { dispatch }=props
  const [visible, setVisible] = useState(false);
  return (
    <PageContainer>
      <ModalForm
        title="新建优惠券"
        onVisibleChange={setVisible}
        visible={visible}
        trigger={ <Button
          key="primary"
          type="primary"
          style={{marginBottom:'20px'}}
          onClick={() =>setVisible(true)}
        >
          新建优惠券
        </Button>}
        submitter={{
        render: (props, defaultDoms) => {
            return [
            ...defaultDoms
            ];
        },
        }}
        onFinish={async (values) => {
          console.log('values',values);
          setVisible(false)
        }}
      >
        <ProFormRadio.Group
          name="activityTimeType"
          fieldProps={{
            onChange: (e) =>{
                history.push('/coupon-management/coupon-list/construction?type='+e.target.value)
            },
          }}
          options={[
            {
              label: '会员领取券',
              value: 1,
            },
            {
              label: '系统发放券',
              value: 2,
            }
          ]}
        />
      </ModalForm>
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
        <TabPane tab="审核中" key="3">
          {message(3, 3)}
        </TabPane>
        <TabPane tab="已通过" key="4">
          { message(4, 4) }
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}

export default connect(({ DetailList}) => ({
  DetailList
}))(TableList);
