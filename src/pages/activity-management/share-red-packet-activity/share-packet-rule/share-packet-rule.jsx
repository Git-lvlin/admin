import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { couponEverydaySub,couponEverydayEdit,couponEverydayDetail,couponEverydaySelList } from '@/services/activity-management/everyday-red-packet-activity';
import ProForm, { ProFormText, ProFormRadio,ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage, formatMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { history,connect } from 'umi';
import styles from './style.less'
import EndModel from './end-model'

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

  const data=[
    {
      id:1,
      title:'每人奖励红包金额',
    }
  ]


export default (props) =>{
  const [dataSource, setDataSource] = useState(() => data);
  const [editableKeys, setEditableRowKeys] = useState(() =>
    data.map((item) => item.id),
  );
  const [onselect,setOnselect]=useState([])
  const [onselect2,setOnselect2]=useState([])
  const [onselect3,setOnselect3]=useState([])
  const [falg,setFalg]=useState(true)
  const [form] = Form.useForm();
  const [detailList,setDetailList]=useState()
  const [visible, setVisible] = useState(false);
  let id = props.location.query.id
 
  useEffect(() => {
    if(!dataSource[0].couponIdOne){
      couponEverydaySelList({}).then(res=>{
        const data={}
        res.data.map(ele=>(
          data[ele.couponId]=ele.name
        ))
        setOnselect(data)
      })
    }else if(dataSource[0].couponIdTwo){
      couponEverydaySelList({couponId:dataSource[0].couponIdTwo}).then(res=>{
        const data={}
        res.data.map(ele=>(
          data[ele.couponId]=ele.name
        ))
        setOnselect3(data)
      })
    }else if(dataSource[0].couponIdOne){
      couponEverydaySelList({couponId:dataSource[0].couponIdOne}).then(res=>{
        const data={}
        res.data.map(ele=>(
          data[ele.couponId]=ele.name
        ))
        setOnselect2(data)
      })
    }


    if(id){
    couponEverydayDetail({id:id}).then(res=>{
      const list=[
        {
          id:1,
          title:'当天红包金额',
          couponIdOne:res.data.couponOneDisplay,
          couponIdTwo:res.data.couponTwoDisplay,
          couponIdThree:res.data.couponThreeDisplay
        }
      ]
      setDetailList({data:res.data,scopeList:list})
      form.setFieldsValue({
        dateRange: [res.data?.activityStartTime, res.data?.activityEndTime],
        ...res.data
      })
    })
    }
  }, [falg,dataSource])
  const onsubmit=values=>{
      values.activityStartTime = values.dateRange ? values.dateRange[0] : null
      values.activityEndTime= values.dateRange ? values.dateRange[1] : null
      delete values.dateRange
      if(id){
        couponEverydayEdit({id:id,...values}).then(res=>{
          if(res.code==0){
            message.success('编辑成功');
            history.push('/activity-management/everyday-red-packet-activity/activity-list')
          }
        })
      }else{
        values.couponIdOne=dataSource[0].couponIdOne
        values.couponIdTwo=dataSource[0].couponIdTwo
        values.couponIdThree=dataSource[0].couponIdThree
        couponEverydaySub({...values}).then(res=>{
          if(res.code==0){
            message.success('添加成功'); 
            history.push('/activity-management/everyday-red-packet-activity/activity-list')
          }
        })
      }

  }

 
  const columns = [
    {
      title: '邀请人数',
      dataIndex: 'title',
      editable:false,
    },
    {
      title: '累计推荐1-3人',
      dataIndex: 'couponIdOne',
      valueType: 'select',
      valueEnum: onselect,
      fieldProps: {
        placeholder: '请选择'
      },
    },
    {
      title: '累计推荐4-9人',
      dataIndex: 'couponIdTwo',
      valueType: 'select',
      valueEnum: onselect2,
      fieldProps: {
        placeholder: '请选择'
      },
    }, {
      title: '累计推荐10人以上',
      dataIndex: 'couponIdThree',
      valueType: 'select',
      valueEnum: onselect3,
      fieldProps: {
        placeholder: '请选择'
      },
    }
  ];
  const columns2 = [
    {
      title: '邀请人数',
      dataIndex: 'title'
    },
    {
      title: '累计推荐1-3人',
      dataIndex: 'couponIdOne',
      valueType: 'text'
    },
    {
      title: '累计推荐4-9人',
      dataIndex: 'couponIdTwo',
      valueType: 'text'
    }, 
    {
      title: '累计推荐10人以上',
      dataIndex: 'couponIdThree',
      valueType: 'text'
    }
  ];
  // const disabledDate=(current)=>{
  //   return current && current < moment().startOf('day');
  // }
  return (
    <PageContainer>
      <ProForm
        form={form}
        onFinish={async (values)=>{
            await  onsubmit(values);
          return true;
         } }
         {...formItemLayout} 
        submitter={{
          render: (props, doms) => {
            return [
              <>
                {
                  id?
                  <>
                    {
                      detailList?.data?.status==1?
                      <>
                        {
                          falg?<Button style={{marginLeft:'80px'}} type="primary" onClick={() => { setFalg(false) }}>编辑</Button>
                          :<>
                            <Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                              props.form?.submit?.()
                            }}>
                              保存
                            </Button>
                            <Button style={{margin:'30px'}} type="default" onClick={()=>setVisible(true)}>
                              终止活动
                            </Button>
                          </>
                        }
                      </> 
                      :null
                    }
                  </>
                  :<Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                    props.form?.submit?.()
                  }}>
                    保存
                  </Button>
                }
                <Button type="default" style={{marginLeft:'80px'}} onClick={() => { history.goBack() }}>返回</Button>
              </>  
            ];
          }
        }}
        className={styles.invite_packet_rule}
      >
        <ProFormText
              width="md"
              name="name"
              label="活动名称"
              placeholder="输入活动名称"
              rules={[{ required: true, message: '请输入活动名称' }]}
              readonly={id&&falg}
              fieldProps={{
                maxLength:50
              }}
          />
         <ProFormDateTimeRangePicker
            width="md"
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
            name="dateRange"
            fieldProps={{
              //  disabledDate:(current)=>disabledDate(current),
               showTime:{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
              },
              format:"YYYY-MM-DD HH:mm"
            }}
            readonly={id&&falg}
            placeholder={[
            formatMessage({
                id: 'formandbasic-form.placeholder.start',
            }),
            formatMessage({
                id: 'formandbasic-form.placeholder.end',
            }),
            ]}
        />
          {
            id?<EditableProTable
                headerTitle="奖励金额(元）"
                rowKey="id"
                // search={false}
                columns={columns2}
                value={detailList?.scopeList}
                recordCreatorProps={false}
                />
             :<EditableProTable
                headerTitle="奖励金额(元）"
                columns={columns}
                name="table"
                rowKey="id"
                recordCreatorProps={false}
                value={dataSource}
                onChange={setDataSource}
                editable={{
                  type: 'multiple',
                  editableKeys,
                  actionRender: (row, config, defaultDoms) => {
                    return [defaultDoms.delete];
                  },
                  onValuesChange: (record, recordList) => {
                    setDataSource(recordList);
                  },
                  onChange: setEditableRowKeys,
                }}
              />  
          }
          {
            (!falg)||(!id)?<p className={styles.hint2}>提示：您必须先在运营后台“红包管理"中创建好”分享领红包“类型的红包后，且创建的红包可领有效期必须大于活动有效期，这里才可以选择到创建的红包。</p>
            :null
          }
          <ProFormText
              width={120}
              label="领取条件"
              fieldProps={{
                value: "在活动中分享新用户注册成功时"
              }}
              readonly
            />
            <ProFormText
              width="md"
              name="num"
              label="最多可推荐人数"
              readonly={id&&falg}
              extra={'超出此人数，不再发放奖励'}
          />
            {
              id&&falg?
               <Form.Item
                label="活动规则"
              >
              <pre className={styles.line_feed}>
                {
                  detailList?.data?.activityRule
                }
              </pre>
              </Form.Item>
                :
              <ProFormTextArea
                name="activityRule"
                label="活动规则"
                placeholder="列如玩法规则、红包有效期、简单的用户协议"
                rules={[
                  { required: true, message: '请输入活动规则' },
                ]}
                readonly={id&&falg}
                fieldProps={{
                 maxLength:1000
                }}
            />
            }

          {
            id&&falg?
            <p className={styles.back}>最近一次操作人：{detailList?.data?.adminName}     {detailList?.data?.updateTime}</p>
            :null
          }  
      </ProForm>

      {
        visible&&<EndModel visible={visible} setVisible={setVisible}  endId={id}/>
      }
      </PageContainer>
  )
}
