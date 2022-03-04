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
  const [dataList,setDataList]=useState([])
  const actionRef = useRef();
  const [keys,setKeys]=useState()
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
        if(goosList){
          callback(goosList)
        }
        setVisible(false)
  };
  useEffect(()=>{
    setKeys(keyId.map(ele=>(ele.wsId)))
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
          rowKey="wsId"
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
                   return ele.wsId==item
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
     setEditableKeys(detailList?.map(item => item.wsId))
    }   
  },[id,detailList])

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
        return <p>{moment(data.wholesaleStartTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTimeAdvancePayment*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
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
      dataIndex: 'wsPrice',
      hideInSearch: true,
      render: (_)=> {
        return <p>{amountTransform(_, '/').toFixed(2)}元/包</p>
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
      valueType: 'digit',
      renderFormItem: (_) =>{
        return <FromWrap
        content={(value, onChange) =><InputNumber
                  min="0.01"
                  max={amountTransform(_?.entry?.wsPrice, '/')}
                  precision='2'
                  stringMode
                  value={value}
                  onChange={onChange}
                />
        }
        right={(value) =><p>元/包</p>}
        />
      },
      render: (_,r) =>{
        return <p>{_}%</p>
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
          <span key='dele'>
            {
              record.wholesaleStatusDesc=='待开始'&&
              <a onClick={()=>{setPennyId({wsId:record.wsId,type:1});setEndVisible(true)}}>删除&nbsp;&nbsp;</a>
            }
          </span>,
          <span key='stop'>
              {
                record.status!=0?
                <a key='detail' onClick={()=>{setPennyId({wsId:record.wsId,type:2});setEndVisible(true)}}>禁用</a>
                :
                <a key='start' onClick={()=>{setPennyId({wsId:record.wsId,type:3});setEndVisible(true)}}>启用</a>
              }
          </span>
      ]
      },
      editable:false,
    }
  ]; 

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
        rowKey="wsId"
        name="table"
        actionRef={ref}
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
            <p>共{dataSource?.length}款商品</p>
        ]}
        style={{marginBottom:'30px'}}
        pagination={{
          pageSize: 5
        }}
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
          setEditableKeys(arr.map(item => item.wsId))
        }}
        keyId={dataSource}
        onClose={()=>{}}
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
