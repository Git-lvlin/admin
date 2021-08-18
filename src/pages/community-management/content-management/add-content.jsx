import React, { useState,useEffect,useRef } from 'react';
import { miniCircleList } from '@/services/community-management/circle-admin-circle-list';
import { listSystemVirtualMember } from '@/services/community-management/memberinfo-list-system-virtual-member';
import ProForm, { ProFormTextArea,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import { message, Form,Button,Modal,Space,Image } from 'antd';
import GcCascader from '@/components/gc-cascader'
import ProTable from '@ant-design/pro-table';
import * as api from '@/services/product-management/product-list';
import { releaseDynamic } from '@/services/community-management/dynamic-release-dynamic';
import Upload from '@/components/upload';

export default props => {
  const [onselect,setOnselect]=useState([])
  const [virtual,setVirtual]=useState([])
  const actionRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading,setLoading]=useState(true)
  const [spuIdsArr,setSpuIdsArr]=useState([])
  //会员昵称下拉接口调用
  useEffect(()=>{
    miniCircleList({}).then(res=>{
          setOnselect(res.data.map(ele=>(
              {label:ele.name,value:ele.id}
          )))
      })
    listSystemVirtualMember({}).then(res=>{
        setVirtual(res.data.map(ele=>(
            {label:ele.nickName,value:ele.id}
        )))
    })
  },[])
  const tailLayout = {
    wrapperCol: { offset: 1, span: 16 },
  };
  const showModal = () => {
    setIsModalVisible(true);
    setLoading(true)
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false)
  };
  const handleCancel = () => {
      setIsModalVisible(false);
  };
  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '图片',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={50} height={50} />,
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称'
      }
    },
    {
      title: '商品分类',
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
      hideInTable: true,
    },
    {
      title: '商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '秒约价',
      dataIndex: 'goodsSaleMinPrice',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
    }
  ];
  const onIpute=(res)=>{
    if(res.selectedRows.length>=2){
      message.error('只能选择一个商品');
      return
    }
    setSpuIdsArr(res.selectedRows)
  }
  return (
    <Form
        onFinish={async (values) => {
          if(spuIdsArr.length>0){
            values.sourceData={
              icon:spuIdsArr[0]?.goodsImageUrl,
              title:spuIdsArr[0]?.goodsName,
              amount:spuIdsArr[0]?.goodsSaleMinPrice,
              subtitle:'',
              params:{
                orderType:2,
                spuId:spuIdsArr[0]?.spuId,
                objectId:'',
                activityId:'',
                wsId:''
              }
            }
            values.sourceType=spuIdsArr.length>0?1:0
            values.sourceId=spuIdsArr[0]?.spuId
          } 
          releaseDynamic(values).then(res=>{
            if(res.code==0){
              message.success('发布成功');
              history.push('/community-management/content-management')
            }
          })
        }}
        submitter={{
          render: (props, doms) => {
            return [
              <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                保存
              </Button>,
              <Button type="default" onClick={()=>history.goBack()}>
                返回
              </Button>,
              
            ];
          }
        }}
        style={{ padding:'50px',background:'#fff' }}
      >
         <ProFormSelect
            width="md"
            name="userId"
            label="会员昵称"
            options={virtual}
            placeholder="请选择会员昵称"
            rules={[{ required: true, message: '请选择会员昵称' }]}
        />
         <ProFormSelect
            width="md"
            name="circleId"
            label="发布圈子"
            options = {onselect}
            placeholder="请选择发布圈子"
            rules={[{ required: true, message: '请选择发布圈子' }]}
        />
        <ProFormTextArea
            width="md"
            name="content"
            label="分享想法"
            placeholder="用户可编辑500个字。"
            rules={[
              { required: true, message: '请输入分享想法' },
              { validator:(rule,value,callback)=>{
                return new Promise(async (resolve, reject) => {
                if(value&&value.length>500){
                  await reject('最多500个字')
                }else {
                  await resolve()
              }
              })
              }}
            ]}
        />
        <Form.Item label="添加照片" name="images">
         <Upload code={204} multiple maxCount={100} accept="image/*"/>
        </Form.Item>
        <Form.Item label="添加商品">
          <Button type="primary"  onClick={showModal}>
              选择商品
          </Button>
          
          <Modal key="id" width={1200}  visible={isModalVisible}  onCancel={handleCancel} footer={null}>
              <ProTable
                  rowKey="id"
                  options={false}
                  params={{
                    selectType: 1,
                    goodsState:1,
                    pageSize:10
                  }}
                  style={{display:loading?'block':'none'}}
                  request={api.productList}
                  actionRef={actionRef}
                  search={{
                      defaultCollapsed: false,
                      labelWidth: 100,
                      optionRender: (searchConfig, formProps, dom) => [
                          ...dom.reverse(),
                      ],
                  }}
                  toolBarRender={() => [
                    <Button type="primary" style={{marginLeft:'-1100px'}} disabled={spuIdsArr&&spuIdsArr.length>0?false:true}  onClick={handleOk}>
                        确定
                    </Button>
                  ]}
                  columns={columns}
                  rowSelection={{
                    hideSelectAll:true
                  }}
                  tableAlertOptionRender={onIpute}
              />
          </Modal>
          <div style={{background:'#F2F2F2',padding:'20px',marginTop:'20px', display:loading?'none':'block'}}>
            <Space>
              <Image width={100} src={spuIdsArr&&spuIdsArr[0]?.goodsImageUrl} />
               <div>
               <p>{spuIdsArr&&spuIdsArr[0]?.goodsName}</p>
               <p>{spuIdsArr&&spuIdsArr[0]?.specName}</p>
               <p>￥ {spuIdsArr&&spuIdsArr[0]?.goodsSaleMinPrice}</p>
               </div>
            </Space>
          </div>
        </Form.Item>
        <Form.Item {...tailLayout} style={{marginTop:'120px'}}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button style={{marginLeft:'20px'}} type="default" onClick={()=>history.goBack()}>
            返回
          </Button>
      </Form.Item>
      </Form>
  );
};
