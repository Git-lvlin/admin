import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,message} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { productPage,productUpdateStatus,productDelete,productEdit,productAdd } from '@/services/sign-activity-management/sign-red-packet-product';
import { PageContainer } from '@ant-design/pro-layout';
import DiscountsModel from './discounts-model'
import { amountTransform } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons';
import SelectProductModal from '@/components/select-product-modal'


export default () => {
  const ref=useRef()
  const [onoff,setOnoff]=useState(false)
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm()
  const [spuIds,setSpuIds]=useState()
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
      dataIndex: 'spuId',
      valueType: 'text',
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImageUrl',
      valueType: 'image',
      hideInSearch:true,
      // render:(_,data)=>{
      //   return <Image src={data.images[0]} alt="" width='50px' height='50px' />
      // }
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
    },
    {
      title: '商品分类',
      dataIndex: 'gcId1Display',
      valueType: 'text',
      hideInSearch:true,
      ellipsis:true
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: '销售价',
      dataIndex: 'goodsSalePrice',
      hideInSearch:true,
      render: (_)=> amountTransform(_, '/').toFixed(2)
    },
    {
      title: '零售供货价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch:true,
      render: (_)=> amountTransform(_, '/').toFixed(2)
    },
    {
      title: '满减金额',
      dataIndex: 'maxDeduction',
      hideInSearch: true,
    },
    {
      title: '开启状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data) => {
        return <ProFormSwitch name="Switch"
          fieldProps={{
            checked: data.status,
            onChange:(bol)=>{onFF(bol,data.id)}
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
            spuId={data.spuId}
            InterFace={productEdit} 
            boxref={ref}
          />,
          <a onClick={()=>{
            productDelete({ids:[data.id]}).then(res=>{
              if(res.code==0){
                ref.current.reload()
              }
            })
          }}>删除</a>
      ],
    },
    
  ];
  const onFF=(bol,id)=>{
    productUpdateStatus({ids:[id],status:bol}).then(res=>{
      if(res.code==0){
        message.success('设置成功');
        ref.current.reload()
      }
    })
}
const onIpute=(res)=>{
  console.log('res',res.selectedRowKeys)
  setSpuIds(res.selectedRowKeys)
}
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        rowKey="id"
        headerTitle="签到红包可用商品配置"
        options={false}
        request={productPage}
        // dataSource={spuIdsArr}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
        // rowSelection={{}}
        // tableAlertOptionRender={onIpute}
        toolBarRender={()=>[
            // <Button  onClick={()=>{
            //   setOnoff(false)
            //   // productUpdateStatus({ids:'',status:false}).then(res=>{
            //   //   if(res.code==0){
            //   //     message.success('关闭成功');
            //   //   }
            //   // })
            // }} type="primary">
            //     关闭全部商品
            // </Button>, 
            // <Button  onClick={()=>{
            //   setOnoff(true)
            //   // productUpdateStatus({ids:"",status:true}).then(res=>{
            //   //   if(res.code==0){
            //   //     message.success('开启成功');
            //   //   }
            //   // })
            // }} type="primary">
            //     开启全部商品
            // </Button>,
             <Button type="primary" onClick={()=>setVisible(true)}>
                <PlusOutlined />
                添加秒约商品
            </Button>,
            <SelectProductModal 
              title={'添加秒约商品'}  
              visible={visible} 
              setVisible={setVisible} 
              callback={(val)=>{
                console.log('val',val)
                const arr = [];
                val.forEach(item => {
                  arr.push(item.spuId)
                })
                productAdd({addList:arr}).then(res=>{
                  if(res.code==0){
                    message.success('新增商品成功');
                    ref.current.reload()
                  }
                })
                // setDataSource([...dataSource,...arr])
              }}
            />
        ]}
        columns={columns}
      />
      </PageContainer>
  );
};
