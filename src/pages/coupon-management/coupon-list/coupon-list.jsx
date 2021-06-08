import React, { useState, useRef } from 'react';
import { Button, Input, Space,Form,message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import XLSX from 'xlsx'
import { couponList } from '@/services/coupon-management/coupon-list';
import { couponAddQuantity } from '@/services/coupon-management/coupon-add-quantity';
import { couponEnd } from '@/services/coupon-management/coupon-end';
import  ProForm,{ ModalForm,ProFormSelect} from '@ant-design/pro-form';
import { history,connect } from 'umi';


const TableList = (props) => {
  const ref=useRef()
  const { dispatch,Detail }=props
  const [discounts,setDiscounts]=useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [records,setRecords]=useState(0)
  const onDiscounts=e=>{
    setDiscounts(e.target.value)
  }
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
      title: '使用范围',
      dataIndex: 'useType',
      valueEnum: {
        1: '秒约商品',
        2: '集约商品',
      },
      hideInSearch: true,
    },
    // {
    //   title: '发行总金额（元）',
    //   dataIndex: 'issueQuantity',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    {
      title: '发行总数量（张）',
      dataIndex: 'issueQuantity',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '已被领取',
      dataIndex: 'lqCouponQuantity',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '已被使用',
      dataIndex: 'useCouponQuantity',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '有效期',
      dataIndex: 'activityTimeDisplay',
      valueType: 'text',
      hideInSearch: true,
      width:120
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'adminName',
      valueType: 'text',
      hideInSearch: true,
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
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (text, record, _, action) => [
      <a
          key="a"
          onClick={()=>Examine(record.id)}
        >
          查看
      </a>,

      <ModalForm
        title="增发优惠券"
        key="model1"
        onVisibleChange={setVisible}
        visible={visible}
        trigger={record.couponStatus==3||record.couponStatus==4?null:<a onClick={()=>Additional(record)}>增发</a>}
        submitter={{
        render: (props, defaultDoms) => {
            return [
            ...defaultDoms
            ];
        },
        }}
        onFinish={async (values) => {
        console.log('values',values);
        console.log('id',record)
        couponAddQuantity({id:record.id,issueQuantity:values.issueQuantity}).then(res=>{
          if(res.code==0){
            setVisible(false)
            ref.current.reload();
            message.success('增加成功');
            return true;
          }
        })
        }}
    >
       <p>当前总发行量：<span>{records}</span> 张</p>
       <ProForm.Group>
           <Form.Item  name="issueQuantity" label="新增发行量">
              <Input onChange={onDiscounts} value={discounts} style={{width:'250px'}}/>    
          </Form.Item>
          <span>张</span>
        </ProForm.Group>
      <p>更新后总发行量:<span style={{margin:'0 20px'}}>{discounts&&parseInt(discounts)+records}</span>张</p>
    </ModalForm>,

    <ModalForm
        title="操作提示"
        key="model2"
        onVisibleChange={setVisible2}
        visible={visible2}
        trigger={record.couponStatus==3||record.couponStatus==4?null:<a onClick={Termination}>终止</a>}
        submitter={{
        render: (props, defaultDoms) => {
            return [
            ...defaultDoms
            ];
        },
        }}
        onFinish={async (values) => {
        console.log('values',values);
        couponEnd({id:record.id}).then(res=>{
          if(res.code==0){
            setVisible2(false)
            return true;
          }
        })
       
        }}
    >
       <p>确定要终止所选优惠券活动吗？</p>
    </ModalForm>,
    
      <a
        key="a"
        onClick={()=>CodeLibrary(record.id)}
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
  //增发
  const Additional=(record)=>{
      setRecords(record.issueQuantity)
      setDiscounts('')
      setVisible(true)
  }
  //终止
  const Termination=()=>{
      setVisible2(true)
  }
  // 跳转到码库
  const CodeLibrary=(id)=>{
    history.push(`/coupon-management/coupon-list/coupon-codebase?id=`+id);
  }


//导出
const exportExcel = (searchConfig) => {
  // console.log('searchConfig',searchConfig.form.getFieldsValue())
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
    <PageContainer>
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
    </PageContainer>

  );
};

export default connect(({ DetailList}) => ({
  DetailList
}))(TableList);
