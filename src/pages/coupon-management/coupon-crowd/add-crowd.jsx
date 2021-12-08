import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import ProForm, {
    ProFormText,
    ProFormFieldSet,
    ProFormDateRangePicker
  } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { couponCrowdSub,couponCrowdDetail,couponCrowdEdit } from '@/services/crowd-management/coupon-crowd';
import { history} from 'umi';
import CrowdModel from './crowd-model'
import  './style.less'


const formItemLayout = {
  labelCol: { span: 2 },
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

export default (props) =>{
  const id = props.location.query.id
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [falg1,setFalg1]=useState(false)
  const [falg2,setFalg2]=useState(false)
  const [levelId,setLevelId]=useState()
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const ref=useRef()
  const Callback=val=>{
    setLevelId(val)
  }
  useEffect(()=>{
    if(id){
      couponCrowdDetail({id:id}).then(res=>{
        form.setFieldsValue({name:res.data.name})
        const arr=[]
        res.data.crowdInfo.map(ele=>{
          if(ele.type==1){
            setFalg1(true)
          }else if(ele.type==2){
            setFalg2(true)
          }
          arr.push({
            id:ele.crowdInfoId,
            state:ele.isContain,
            title:ele.type==1?'指定用户':'消费次数',
            labels:[ele.numStart,ele.numEnd],
            userLevel:ele.userLevel,
            userLevelDisplay:ele.userLevelDisplay
          })
        })
        setDataSource(arr)
      })
    }
  },[])
  const onsubmit=values=>{
      try {
        dataSource.map(ele=>{
          if(ele.title=='指定用户'){
            values.userLevelInfo={
              isContain: ele.state||1,
              userLevel: levelId&&levelId.userLevel.toString()||ele.userLevel    
            }
          }else if(ele.title=='消费次数'){
            values.consumeNumInfo={
              isContain: ele.state||1,
              numStart: ele.labels[0],
              numEnd: ele.labels[1],
            }
          }
        })
      } catch (error) {
        console.log('error',error)
      }
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
      renderFormItem:(_,data)=>{
        return <p>{_.entry.title}</p>
      }
    },
    {
      title: '范围',
      key: 'state',
      dataIndex: 'state',
      valueType:'radio',
      valueEnum: {
        1: '包含',
        2: '不包含',
      },
    },
    {
      title: '条件',
      dataIndex: 'labels',
      renderFormItem: (_, row) => {
        if(_.entry.title=='指定用户'){
              if(levelId){
                return <>
                  <p className='grade'>{
                    levelId?.userLevel.map(ele=>{
                      return <span>V{ele}等级、</span>
                      })
                    }
                  </p>
                <Button onClick={()=>setVisible(true)}>选择用户</Button>
                {
                  visible&&<CrowdModel 
                  visible={visible}
                  title="选择用户"  
                  setVisible={setVisible}  
                  Callback={Callback}
                />
                }
                </>
              }else{
                return <>
                   <Button onClick={()=>setVisible(true)}>选择用户</Button>
                    {
                      visible&&<CrowdModel 
                      visible={visible}
                      title="选择用户" 
                      setVisible={setVisible}  
                      Callback={Callback}
                    />
                    }
                </>
              }
        }else if(_.entry.title=='消费次数'){
        return <ProFormFieldSet>
                  <Input className='nums' suffix="次" /> 
                  至 
                  <Input className='nums' suffix="次" />
                </ProFormFieldSet>;
        }
      },
      render: (_, row) =>{
        if(row.title=='指定用户'){
          return <>
            <Button onClick={()=>setVisible(true)}>查看用户</Button>
            {
              visible&&<CrowdModel 
              visible={visible}
              title="查看用户" 
              setVisible={setVisible}  
              Callback={Callback}
            />
            }
          </>
          }else if(row.title=='消费次数'){
            return <>
                    <p>{row.labels[0]}次 至 {row.labels[1]}次</p>
                  </>;
          }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: (_,record) => [
        <a
          key="delete"
          onClick={() => {
            if(record.title=='指定用户'){
              setFalg1(false)
            }else if(record.title=='消费次数'){
              setFalg2(false)
            }
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
              <Button type="default" key='goback' onClick={() => history.goBack()}>
                返回
              </Button>
              
            ];
          }
        }}
        {...formItemLayout}
      >
        <ProCard
          title="基础设置"
          bordered
          headerBordered
          collapsible
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
            className='sets'
            >
            <h4 className='memberMsg'>会员基本信息</h4>
            <Button 
                type={falg1?"primary":"default"}  
                onClick={() => {
                  setFalg1(true)
                  let falg=dataSource.some(ele=>ele.title=='指定用户')
                  if(dataSource.length==0||!falg){
                    ref.current?.addEditRecord?.({
                    id: '1',
                    title: '指定用户',
                    });
                  }else{
                    message.error('已有该选项')
                  }
                }}
                style={{margin:"20px 0 20px 50px"}}
                >
                  指定用户
            </Button>
            <h4 className='memberMsg'>会员消费情况</h4>
            <Button
              type={falg2?"primary":"default"}  
              style={{margin:"20px 0 20px 50px"}}
              onClick={() => {
                  setFalg2(true)
                  let falg=dataSource.some(ele=>ele.title=='消费次数')
                  if(dataSource.length==0||!falg){
                    ref.current?.addEditRecord?.({
                    id: '2',
                    title: '消费次数',
                    });
                  }else{
                    message.error('已有该选项')
                  }
              }}
              >
                消费次数
            </Button>
        </ProCard>
        <ProCard
            title="群体设置"
            bordered
            headerBordered
            collapsible
            className='sets'
            style={{marginTop:'20px'}}
          >
            <EditableProTable
              actionRef={ref}
              rowKey="id"
              options={false}
              recordCreatorProps={false}
              value={dataSource}
              onChange={setDataSource}
              maxLength={3}
              editable={{
                editableKeys,
                onChange: setEditableRowKeys,
                onlyAddOneLineAlertMessage:'不能同时新增多行',
                onSave: async (rowKey, data, row) => {
                },
                onCancel:async (rowKey, data, row) => {
                  if(rowKey==1){
                    setFalg1(false)
                  }else if(rowKey==2){
                    setFalg2(false)
                  }
                }
              }}
              search={false}
              columns={columns}
            />
        </ProCard>
      </ProForm>
    </>
  )
}
