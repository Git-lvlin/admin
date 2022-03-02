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

const GoosModel=(props)=>{
  const {visible,setVisible,onClose,callback}=props
  const [goosList,setGoosList]=useState()
  const actionRef = useRef();
  const columns = [
      {
          title: 'spuID',
          dataIndex: 'spuId',
      },
      {
          title: 'skuID',
          dataIndex: 'skuId',
      },
      {
          title: '商品名称',
          dataIndex: 'goodsName',
          valueType: 'text',
          ellipsis:true,
          hideInSearch:true
      },
      {
          title: '集约活动名称',
          dataIndex: 'name',
          valueType: 'text',
          ellipsis:true,
          hideInSearch:true
      },
      {
          title: '集约活动ID',
          dataIndex: 'wsId',
          valueType: 'text',
          hideInSearch:true
      },
      {
          title: '选择集约活动',
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
          title: '集约价(元)',
          dataIndex: 'price',
          hideInSearch: true,
          render: (_)=> amountTransform(_, '/').toFixed(2)
      },
      {
          title: '集约库存',
          dataIndex: 'totalStockNum',
          hideInSearch: true,
      },
  ];
  const onsubmit = (values) => {
    callback(goosList)
    setVisible(false)
  };
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
          columns={columns}
          rowSelection={{
              preserveSelectedRowKeys: true,
              onChange: (_, val) => {
                setGoosList(val)
              }
          }}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
      />
      </ModalForm>
  )
}

export default (props) => {
  const {callback,id,falg,detailList,submi}=props
  const ref=useRef()
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableKeys] = useState([])
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    if(!falg){
     setDataSource(detailList?.skus)
     setEditableKeys(detailList?.skus.map(item => item.id))
    }
    if(submi){
      setEditableKeys([])
    }
   
  },[falg,submi])

  const columns= [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      editable:false
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      editable:false
    },
    {
      title: '基本信息',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_,data)=>{
        return <div style={{display:'flex'}}>
                <Image src={data.imageUrl} alt="" width='50px' height='50px' />
                <div style={{marginLeft:'10px'}}>
                  <p style={{fontSize:'14px'}}>{data.goodsName}</p>
                  <p style={{fontSize:'12px'}}>规格：{data.skuName}</p>
                </div>
            </div>
      }
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
      title: '集约活动时段',
      dataIndex: 'wholesaleStartTime',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_,data)=>{
        return <p>{moment(data.wholesaleStartTime*1000).format('YYYY-MM-DD HH:mm:ss')}-{moment(data.endTimeAdvancePayment*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
      }
    },
    {
      title: '集约活动状态',
      dataIndex: 'wholesaleStatusDesc',
      valueType: 'text',
      editable:false
    },
    {
      title: '集约单次限量',
      dataIndex: 'minNum',
      hideInSearch: true,
      editable:false,
      render: (_,data)=> {
        return <p>{data?.minNum} - {data?.maxNum}包</p>
      },
    },
    {
      title: '集约价',
      dataIndex: 'intensivePrice',
      hideInSearch: true,
      render: (_)=> {
        return <p>{amountTransform(_, '/').toFixed(2)}包</p>
      },
      editable:false
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
      title: '活动价',
      dataIndex: 'price',
      hideInSearch: true,
      render: (text, record, _, action) =>{
        return <>
                  <InputNumber
                    min="0.01"
                    max="99999.99"
                    precision='2'
                    value={text}
                    stringMode
                  />
                  <p>元/包</p>
               </>
                }

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
    },
    },
    {
      title: '操作',
      valueType: 'text',
      render:(text, record, _, action)=>{
        return [
          <a key='dele' onClick={()=>delGoods(record.id)}>删除</a>,
          <a key='stop' onClick={()=>stopGoods(record.id)}>禁用</a>
      ]
      },
      editable:false,
      hideInTable:id&&falg
    }
  ]; 
  // 删除商品
  const  delGoods=val=>{
    const arr=dataSource.filter(ele=>(
          ele.id!=val
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

  }

  return (
    <>
    <ProFormText
      width="md"
      name="price"
      label='活动商品'
      rules={[{ required: true, message: '请选择活动商品' }]}
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
            <p>共{dataSource.length}款商品</p>
        ]}
        style={{marginBottom:'30px',display:id&&falg?'none':'block'}}
    />

    {
      visible&&<GoosModel
        title={'添加秒约商品'}  
        visible={visible} 
        setVisible={setVisible}
        callback={(val)=>{
          console.log('val',val)
          const arr = [];
          val.forEach(item => {
            arr.push({
              ...item,
              status:1,
              intensivePrice:item.price,
              price:0
            })
          })
          // detailList?.skus.map(ele=>{
          //     arr.map(item=>{
          //       if(item.skuId==ele.skuId){
          //         item.id=ele.id
          //         item.stockNum=ele.stockNum
          //         item.probability=ele.probability
          //         item.status=ele.status
          //         delete item.add
          //       }
          //     })
          // })
          // if(!id&&falg){
          //   dataSource?.map(ele=>{
          //     arr.map(item=>{
          //       if(item.skuId==ele.skuId){
          //         item.stockNum=ele.stockNum
          //         item.probability=ele.probability
          //         item.status=ele.status
          //       }
          //     })
          //    })
          // }
          // let arr2=_.uniqWith([...dataSource,...arr], _.isEqual)
          setDataSource(arr)
          callback(arr)
          setEditableKeys(arr.map(item => item.skuId))
        }}
        onClose={()=>{}}
      />
    }

    <ProTable
        toolBarRender={false}
        search={false}
        rowKey="skuId"
        columns={columns}
        dataSource={detailList?.skus}
        style={{display:id&&falg?'block':'none'}}
    />
    </>
    
  );
};
