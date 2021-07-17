import React, { useState, useRef,useEffect } from 'react';
import { DatePicker, Input, Form, Divider, message,Button,Space,Tag } from 'antd';
import ProTable,{ EditableProTable,ActionType } from '@ant-design/pro-table';
import ProForm, {
    ProFormText,
    ProFormRadio,
    ProFormFieldSet
  } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { couponCrowdSub,couponCrowdDetail,couponCrowdEdit } from '@/services/crowd-management/coupon-crowd';
import { history} from 'umi';
import CrowdModel from './crowd-model'


const waitTime = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

export default (props) =>{
  const id = props.location.query.id
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [falg,setFalg]=useState(false)
  const [falg1,setFalg1]=useState(false)
  const [falg2,setFalg2]=useState(false)
  const [falg3,setFalg3]=useState(false)
  const [levelId,setLevelId]=useState()
  const [detailData,setDetailData]=useState()
  const [form] = Form.useForm();
  const ref=useRef()
  const Callback=val=>{
    setLevelId(val)
  }
  useEffect(()=>{
    if(id){
      couponCrowdDetail({id:id}).then(res=>{
        form.setFieldsValue({name:res.data.name})
        console.log('res.data.crowdInfo',res.data.crowdInfo)
        const arr=[]
        res.data.crowdInfo.map(ele=>{
          arr.push({
            id:ele.crowdInfoId,
            state:ele.isContain,
            title:ele.type==1?'会员等级':ele.type==2?'消费次数':'累计消费',
            labels:ele.type==2?[ele.numStart,ele.numEnd]:ele.type==3&&[ele.moneyStart,ele.moneyEnd],
            userLevel:ele.userLevel,
            userLevelDisplay:ele.userLevelDisplay
          })
        })
        console.log('arr',arr)
        setDataSource(arr)
      })
    }
  },[])
  const onsubmit=values=>{
      try {
        dataSource.map(ele=>{
          if(ele.title=='会员等级'){
            values.userLevelInfo={
              isContain: ele.state||1,
              userLevel: levelId&&levelId.userLevel.toString()||ele.userLevel    
            }
          }else if(ele.title=='消费次数'){
            values.consumeNumInfo={
              isContain: ele.state||1,
              numStart: ele.labels[0],
              numEnd: ele.labels[1]
            }
          }else if(ele.title=='累计消费'){
            values.consumeLjInfo={
              isContain: ele.state||1,
              moneyStart: ele.labels[0],
              moneyEnd: ele.labels[1]
            }
          }
        })
      } catch (error) {
        console.log('error',error)
      }
      console.log('values',values);
      console.log('dataSource',dataSource)
      if(id){
        couponCrowdEdit({...values,id:id}).then(res=>{
          if(res.code==0){
            history.push('/coupon-management/coupon-crowd') 
            message.success('操作成功')
          }
        })
      }else{
        couponCrowdSub(values).then(res=>{
          if(res.code==0){
            history.push('/coupon-management/coupon-crowd')
            message.success('操作成功')
          }
        })
      }
  }
  const columns= [
    {
      title: '选项',
      dataIndex: 'title',
      width: '30%'
    },
    {
      title: '范围',
      key: 'state',
      dataIndex: 'state',
      renderFormItem: () => 
        <ProFormRadio.Group
          name="limitType"
          options={[
            { 
              label: '包含', value: 1, 
            }
            // { 
            //   label: '不包含', value: 2 
            // }
          ]}
        />,
        hideInTable:falg?false:true
    },
    {
      title: '范围',
      dataIndex: 'state',
      valueEnum: {
        1: '包含',
      },
      hideInTable:falg?true:false
    },
    {
      title: '条件',
      dataIndex: 'labels',
      width: '20%',
      renderFormItem: (_, { isEditable }) => {
        if(_.entry.title=='会员等级'){
        return <CrowdModel Callback={Callback}/>;
        }else if(_.entry.title=='消费次数'){
        return <ProFormFieldSet>
                  <Input style={{width:'100px'}} suffix="次" /> 
                  至 
                  <Input style={{width:'100px'}} suffix="次" />
                </ProFormFieldSet>;
        }
        return <ProFormFieldSet> 
                <Input name='min' style={{width:'100px'}} suffix="元" />
                 至 
                <Input name='max' style={{width:'100px'}} suffix="元" />
                </ProFormFieldSet>;
      },
      hideInTable:falg?false:true
    },
    {
      title: '条件',
      dataIndex: 'labels',
      render:(_, data)=>{
        console.log('data',data)
        if(data.title=='会员等级'){
          return <p>{data.userLevelDisplay}</p>;
          }else if(data.title=='消费次数'){
          return <p>{data.labels[0]}次 至 {data.labels[1]}次</p>
          }
          return <p>{data.labels[0]}元 至 {data.labels[1]}元</p>
      },
      hideInTable:falg?true:false
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: (_,record) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>
      ],
    }
  ];
  return (
      <>
      <ProForm
        form={form}
        onFinish={async (values)=>{
            await  onsubmit(values);
          return true;
         } }
        submitter={{
          render: (props, doms) => {
            return [
              <Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                props.form?.submit?.()
              }}>
                保存
              </Button>,
              <Button type="default"  key="rest" onClick={() => props.form?.resetFields()}>
                取消
              </Button>
            ];
          }
        }}
      >
        <ProCard
          title="基础设置"
          bordered
          headerBordered
          collapsible
          style={{
          minWidth: 800,
          maxWidth: '100%',
          }}
        >
          <ProFormText
            name="name"
            width="200px"
            label="群体名称"
            placeholder="请输入名称"
            rules={[
              { required: true, message: '请输入群体名称' },
              { validator:(rule,value,callback)=>{
                return new Promise(async (resolve, reject) => {
                if(value&&value.length>20){
                  await reject('群体名称不超过20个字符')
                }else {
                    await resolve()
                }
              })
              }}
            ]}
          />
        </ProCard>
        <ProCard
            title="选项设置"
            bordered
            headerBordered
            collapsible
            style={{
                minWidth: 800,
                maxWidth: '100%',
            }}
            >
            <h3 style={{background:'#fafafa',padding:'10px',color:'#ccc'}}>会员基本信息</h3>
            <Button 
                type={falg1?"primary":"default"}  
                onClick={() => {
                  setFalg(true)
                  if(!falg1){
                    setFalg1(true)
                  }else{
                    setFalg1(false)
                  }
                  
                  ref.current?.addEditRecord?.({
                  id: '1',
                  title: '会员等级',
                  });
                  }} 
                style={{margin:"20px 0 20px 0"}}
                >
                  会员等级
            </Button>
            <h3 style={{background:'#fafafa',padding:'10px',color:'#ccc'}}>会员消费情况</h3>
            <Button
              type={falg2?"primary":"default"}  
              onClick={() => {
                  setFalg(true)
                  if(!falg2){
                    setFalg2(true)
                  }else{
                    setFalg2(false)
                  }
                  ref.current?.addEditRecord?.({
                  id: '2',
                  title: '消费次数',
                  });
              }}
              >
                消费次数
            </Button>
            <Button 
              type={falg3?"primary":"default"}  
              style={{margin:"20px"}}
              onClick={() => {
                  setFalg(true)
                  if(!falg3){
                    setFalg3(true)
                  }else{
                    setFalg3(false)
                  }
                  ref.current?.addEditRecord?.({
                  id: '3',
                  title: '累计消费',
                  });
              }}>
                累计消费
            </Button>
        </ProCard>
        <ProCard
            title="群体设置"
            bordered
            headerBordered
            collapsible
            style={{
              minWidth: 800,
              maxWidth: '100%',
              marginTop:'20px'
            }}
          >
            <EditableProTable
                actionRef={ref}
                rowKey="id"
                options={false}
                recordCreatorProps={false}
                value={dataSource}
                onChange={setDataSource}
                editable={{
                  editableKeys,
                  onSave: async () => {
                    await waitTime(500);
                  },
                  onChange: setEditableRowKeys,
                  actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
                search={false}
                columns={columns}
            />
        </ProCard>
      </ProForm>
    </>
  )
}
