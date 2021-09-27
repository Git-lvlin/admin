import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import DiscountsModel from './discounts-model'
import DeleteModal from '@/components/DeleteModal'
import GoosModel from './goos-model'


export default () => {
  const ref=useRef()
  const [spuIdsArr,setSpuIdsArr]=useState([])
  const [onoff,setOnoff]=useState(false)
  const columns= [
    {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
    },
    {
      title: 'SPUID',
      dataIndex: 'dynamicId',
      valueType: 'text',
    },
    {
      title: '商品图片',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch:true,
      // render:(_,data)=>{
      //   return <Image src={data.images[0]} alt="" width='50px' height='50px' />
      // }
    },
    {
      title: '商品名称',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '商品分类',
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch:true,
      ellipsis:true
    },
    {
      title: '可用库存',
      dataIndex: 'images',
      valueType: 'image',
      hideInSearch:true,
     
    },
    {
      title: '销售价',
      key: 'dateRange',
      dataIndex: 'createTime',
      hideInSearch:true
    },
    {
      title: '零售供货价',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '满减金额',
      dataIndex: 'state',
      hideInSearch: true,
      valueEnum: {
        0:'未审核',
        1:'已审核',
        2:'审核拒绝'
    },
    },
    {
      title: '开启状态',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      render:(_,r) => {
        return <ProFormSwitch name="Switch"
          fieldProps={{
            checked: onoff,
            // onChange:(bol)=>{onTop(bol,r.id)
          }
        }
        />
    },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, data) => [
          <DiscountsModel 
            record={data}
            state={1}  
            label={'通过'}  
            text={'确认要通过该帖子的发布吗？'} 
            // InterFace={auditDynamic} 
            title={'审核确认'}
            boxref={ref}
          />,
          <DeleteModal
            record={data} 
            boxref={ref} 
            label1={'删除'}
            text={'确定要删除该商品吗？'} 
            // InterFace={couponDelSub}
            blok={1}
            title={'操作确认'}
            />
      ],
    },
    
  ];
 useEffect(()=>{
//   if(type==0){
//     checkAuditDynamicSwitch({}).then(res=>{
//       setCheck(res.data)
//     })
//   }
 },[]) 
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        rowKey="id"
        headerTitle="签到红包可用商品配置"
        options={false}
        params={{
        //   auditStatus:type,
        }}
        // request={adminList}
        dataSource={spuIdsArr}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
        toolBarRender={()=>[
            <Button  onClick={()=>setOnoff(false)} type="primary">
                关闭全部商品
            </Button>,
            <Button  onClick={()=>setOnoff(true)} type="primary">
                开启全部商品
            </Button>,
            <GoosModel callback={(val)=>setSpuIdsArr(val)}/>
        ]}
        columns={columns}
      />
      </PageContainer>
  );
};
