import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Switch, Input,InputNumber,message} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { chooseWholesaleList } from '@/services/intensive-activity-management/penny-activity';
import { PlusOutlined } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'
import ProTable from '@ant-design/pro-table';
import { ModalForm,ProFormText } from '@ant-design/pro-form';
import _ from 'lodash'
import moment from 'moment';
import EndModel from './end-model'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex',flexDirection:'column' }}>
    <div>{content(value, onChange)}</div>
    <div>{right(value)}</div>
  </div>
)

const GoosModel=(props)=>{
  const {visible,setVisible,onClose,callback,keyId}=props
  const [goosList,setGoosList]=useState()
  const [keys,setKeys]=useState()
  const [dataList,setDataList]=useState([])
  const actionRef = useRef();
  const columns = [
      {
          title: 'spuID',
          dataIndex: 'spuId',
          hideInSearch:true,
      },
      {
          title: 'skuID',
          dataIndex: 'skuId',
          hideInSearch:true,
      },
      {
          title: '商品分类',
          dataIndex: 'gcName',
          valueType: 'text',
          ellipsis:true,
          hideInSearch:true
      },
      {
          title: '商品主图',
          dataIndex: 'imageUrl',
          valueType: 'image',
          ellipsis:true,
          hideInSearch:true
      },
      {
          title: '商品名称',
          dataIndex: 'goodsName',
          valueType: 'text',
          ellipsis:true,
          hideInSearch:true
      },
      {
          title: '商品规格',
          dataIndex: 'skuName',
          valueType: 'text',
          ellipsis:true,
          hideInSearch:true
      },
      {
          title: '批发供货价',
          dataIndex: 'wholesaleSupplyPrice',
          hideInSearch: true,
      },
      {
          title: '集约活动名称',
          dataIndex: 'name',
          valueType: 'text',
          ellipsis:true,
      },
      {
          title: '集约活动ID',
          dataIndex: 'wsId',
          valueType: 'text',
          hideInSearch:true
      },
      {
          title: '活动开始时间',
          dataIndex: 'wholesaleStartTime',
          valueType: 'dateRange',
          hideInTable:true,
      },
      {
          title: '集约活动开始时间',
          dataIndex: 'wholesaleStartTime',
          valueType: 'text',
          hideInSearch:true,
          render:(_)=>{return <p>{moment(_*1000).format('YYYY-MM-DD HH:mm:ss')}</p>}
      },
      {
          title: '采购单下单截止时间',
          dataIndex: 'endTimeAdvancePayment',
          valueType: 'text',
          hideInSearch:true,
          render:(_)=>{return <p>{moment(_*1000).format('YYYY-MM-DD HH:mm:ss')}</p>}
      },
      {
          title: '活动状态',
          dataIndex: 'wholesaleStatus',
          valueType: 'select',
          hideInTable:true,
          valueEnum: {
              0: '全部',
              1: '待开始',
              2: '进行中',
          },
      },
      {
          title: '集约活动状态',
          dataIndex: 'wholesaleStatusDesc',
          valueType: 'text',
          hideInSearch: true,
      },
      {
          title: '集约库存',
          dataIndex: 'totalStockNum',
          hideInSearch: true,
      },
      {
          title: '集采箱规单位量',
          dataIndex: 'batchNumber',
          hideInSearch: true,
          render:(_,data)=>{
            return <p>{_}{data?.unit}/{data?.wsUnit}</p>
          }
      },
      {
          title: '单次起订量',
          dataIndex: 'minNum',
          hideInSearch: true,
          render:(_,data)=>{
            return <p>{_}/{data?.wsUnit}</p>
          }
    },
  ];
  const onsubmit = (values) => {
    callback(goosList)
    setVisible(false)
  };
  useEffect(()=>{
    setKeys(keyId.map(ele=>(ele.skuId)))
  },[])
  const postData=(data)=>{
    dataList.push(...data)
    setDataList(dataList)
    return data
  }
  return (
      <ModalForm
          onVisibleChange={setVisible}
          visible={visible}
          width={1000}
          modalProps={{
          forceRender: true,
          destroyOnClose: true,
          onCancel: () => {
              onClose();
          }
          }}
          submitter={{
          render: (props, defaultDoms) => {
              return [
                  <Button type="primary" key="submit" onClick={() => {
                      props.form?.submit?.()
                  }}>
                   提交
                  </Button>,
                  <Button type="primary" key="cancel" onClick={() =>{setVisible(false)}}>
                   返回
                  </Button>
              ];
          },
          }}
          onFinish={async (values) => {
              await onsubmit(values);
          }}
          {...formItemLayout}
      >
      <ProTable
          rowKey="skuId"
          options={false}
          request={chooseWholesaleList}
          actionRef={actionRef}
          search={{
              defaultCollapsed: false,
              labelWidth: 100,
              optionRender: (searchConfig, formProps, dom) => [
                  ...dom.reverse(),
              ],
          }}
          postData={postData}
          columns={columns}
          rowSelection={{
              preserveSelectedRowKeys: true,
              onChange: (_, val) => {
                const arr=[]
                _.forEach(item=>{
                 const obj=dataList.find(ele=>{
                   return ele.skuId==item
                  })
                  if(obj){
                    arr.push(obj)
                  }

                })
                setGoosList(arr)
                setKeys(_)
              },
              selectedRowKeys:keys
          }}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
          }}
      />
      </ModalForm>
  )
}

export default (props) => {
  const {callback,id,detailList}=props
  const ref=useRef()
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableKeys] = useState([])
  const [visible, setVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [pennyId,setPennyId]=useState()
  useEffect(()=>{
    if(id){
      detailList&&setDataSource(detailList.map(ele=>({...ele,price:amountTransform(ele.price,'/')})))
     setEditableKeys(detailList?.map(item => item.skuId))
    }   
  },[id,detailList])

  const columns= [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      editable:false,
      hideInSearch:true,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      editable:false,
      hideInSearch:true,
    },
    {
      title: '商品分类',
      dataIndex: 'gcName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
      editable:false
    },
    {
      title: '商品主图',
      dataIndex: 'imageUrl',
      valueType: 'image',
      ellipsis:true,
      hideInSearch:true,
      editable:false
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
      editable:false
    },
    {
      title: '商品规格',
      dataIndex: 'skuName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
      editable:false
    },
    {
      title: '批发供货价',
      dataIndex: 'wholesaleSupplyPrice',
      hideInSearch: true,
      editable:false
    },
    {
      title: '集约活动名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
      editable:false
    },
    {
      title: '集约活动ID',
      dataIndex: 'wsId',
      valueType: 'text',
      hideInSearch:true,
      editable:false
    },
    {
      title: '集约活动状态',
      dataIndex: 'wholesaleStatusDesc',
      valueType: 'text',
      editable:false
    },
    {
      title: '集约活动开始时间',
      dataIndex: 'wholesaleStartTime',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_)=>{return <p>{moment(_*1000).format('YYYY-MM-DD HH:mm:ss')}</p>}
    },
    {
      title: '采购单下单截止时间',
      dataIndex: 'endTimeAdvancePayment',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_)=>{return <p>{moment(_*1000).format('YYYY-MM-DD HH:mm:ss')}</p>}
    },
    {
      title: '集约库存',
      dataIndex: 'totalStockNum',
      hideInSearch: true,
      editable:false,
      render: (_)=> {
        return <p>{_}包</p>
      },
    },
    {
      title: '集采箱规单位量',
      dataIndex: 'batchNumber',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{_}{data?.unit}/{data?.wsUnit}</p>
      },
      editable:false
    },
    {
      title: '单次起订量',
      dataIndex: 'minNum',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{_}/{data?.wsUnit}</p>
      },
      editable:false
    },
    {
      title: '最大限购量',
      dataIndex: 'maxNum',
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: '活动价',
      dataIndex: 'price',
      hideInSearch: true,
      valueType: 'digit',
      renderFormItem: (_) =>{
        return <FromWrap
        content={(value, onChange) =><InputNumber
                  min="0.00"
                  precision='2'
                  stringMode
                  value={value}
                  onChange={onChange}
                />
        }
        right={(value) =><p>元/盒</p>}
        />
      },
      render: (_,r) =>{
        return <p>{_}</p>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      editable:false,
      valueEnum: {
        0: '已禁用',
        1: '已启用',
      }
    },
    {
      title: '操作',
      valueType: 'text',
      render:(text, record, _, action)=>{
        return [
          <a style={{display:'block'}} key='dele' onClick={()=>{setPennyId({skuId:record.skuId,type:1});setEndVisible(true)}}>删除</a>,
          <a style={{display:'block'}} key='detail' onClick={()=>{setPennyId({skuId:record.skuId,type:2});setEndVisible(true)}}>禁用</a>,
          <a style={{display:'block'}} key='start' onClick={()=>{setPennyId({skuId:record.skuId,type:3});setEndVisible(true)}}>启用</a>
      ]
      },
      editable:false,
    }
  ]; 
  // 删除商品
  const  delGoods=val=>{
    const arr=dataSource.filter(ele=>(
          ele.skuId!=val
    ))
    // let sum=0
    // arr.map(ele=>{
    //   if(ele.status){
    //     sum+=parseInt(ele.probability)
    //   }
    // })
    // setSubmi(sum)
    setDataSource(arr) 
    callback(arr)
  }

  const stopGoods=val=>{
//     const arr=dataSource.map(ele=>(
//       ele.skuId!=val
// ))
  }

  return (
    <>
    <ProFormText
      width="md"
      name="price"
      label={<p><span style={{color:'red',fontSize:'15px'}}>* </span>活动商品</p>}
      fieldProps={{
        value:<Button key='add' type="primary" onClick={()=>{
                setVisible(true)
              }}>
                  选择活动商品
              </Button>
      }}
      readonly={true}
    />
    <EditableProTable
        rowKey="skuId"
        name="table"
        value={dataSource}
        actionRef={ref}
        recordCreatorProps={false}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
            callback(recordList)
          },
        }}
        toolBarRender={()=>[
            <p>共{dataSource?.length}款商品</p>
        ]}
        style={{marginBottom:'30px'}}
    />

    {
      visible&&<GoosModel
        title={'添加秒约商品'}  
        visible={visible} 
        setVisible={setVisible}
        callback={(val)=>{
          const arr = [];
          val.forEach(item => {
            arr.push({
              ...item,
              status:1,
              wsPrice:item.price,
              price:0
            })
          })
          setDataSource(arr)
          callback(arr)
          setEditableKeys(arr.map(item => item.skuId))
        }}
        onClose={()=>{}}
        keyId={dataSource}
      />
    }
    {
        endVisible&&<EndModel 
        visible={endVisible} 
        setVisible={setEndVisible}  
        pennyId={pennyId} 
        callback={(arr)=>{
          ref.current.reload()
          setPennyId(null)
          setDataSource(arr) 
          callback(arr)
        }}
        onClose={()=>{ref.current.reload();setPennyId(null)}}
        dataSource={dataSource}
        />
      }
    </>
    
  );
};
