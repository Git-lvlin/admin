import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber,Spin} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { couponInviteSub,couponInviteEdit,couponInviteDetail,couponInviteSelList } from '@/services/activity-management/share-red-packet-activity';
import ProForm, { ProFormText, ProFormRadio,ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage, formatMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { history,connect } from 'umi';
import styles from './style.less'
import EndModel from './end-model'
import Upload from '@/components/upload';

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
  const [falg,setFalg]=useState(true)
  const [form] = Form.useForm();
  const [detailList,setDetailList]=useState()
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let id = props.location.query.id
  const FromWrap = ({ value, onChange, content, right }) => (
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
    </div>
  )
 
  useEffect(() => {
      couponInviteSelList({}).then(res=>{
        const data={}
        res.data.map(ele=>(
          data[ele.couponId]=ele.name
        ))
        setOnselect(data)
      })
    if(id){
      couponInviteDetail({id:id}).then(res=>{
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
  }, [falg,dataSource,loading])
  const onsubmit=values=>{
      values.activityStartTime = values.dateRange ? values.dateRange[0] : null
      values.activityEndTime= values.dateRange ? values.dateRange[1] : null
      delete values.dateRange
      if(id){
        couponInviteEdit({id:id,...values}).then(res=>{
          if(res.code==0){
            message.success('编辑成功');
            history.push('/activity-management/share-red-packet-activity/activity-list')
          }
        })
      }else{
        values.couponIdOne=dataSource[0].couponIdOne
        values.couponIdTwo=dataSource[0].couponIdTwo
        values.couponIdThree=dataSource[0].couponIdThree
        couponInviteSub({...values}).then(res=>{
          if(res.code==0){
            message.success('添加成功'); 
            history.push('/activity-management/share-red-packet-activity/activity-list')
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
      valueEnum: onselect,
      fieldProps: {
        placeholder: '请选择'
      },
    }, {
      title: '累计推荐10人以上',
      dataIndex: 'couponIdThree',
      valueType: 'select',
      valueEnum: onselect,
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
      <Spin spinning={loading}>
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
                          falg?<Button style={{marginLeft:'100px'}} type="primary" onClick={() => { setFalg(false) }}>编辑</Button>
                          :<>
                            <Button style={{margin:'100px'}} type="primary" key="submit" onClick={() => {
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
                  :<Button style={{margin:'100px'}} type="primary" key="submit" onClick={() => {
                    props.form?.submit?.()
                  }}>
                    保存
                  </Button>
                }
                <Button type="default" style={{marginLeft:'80px'}} onClick={() => { history.push('/activity-management/share-red-packet-activity/activity-list') }}>返回</Button>
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
                style={{marginLeft:'50px'}}
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
                style={{marginLeft:'50px'}}
              />  
          }
          {
            !id?<p className={styles.hint2}>提示：您必须先在运营后台“红包管理"中创建好”分享领红包“类型的红包后，且创建的红包可领有效期必须大于活动有效期，这里才可以选择到创建的红包。</p>
            :null
          }
          {
            !id&&<ProFormText
                    width="md"
                    name="maxNum"
                    label="最多可推荐人数"
                    readonly={id&&falg}
                    extra={'超出此人数，不再发放奖励'}
                    style={{marginTop:'20px'}}
                />
            }
          <ProFormText
              width={120}
              label="领取条件"
              fieldProps={{
                value: "在活动中分享新用户注册成功时"
              }}
              readonly
            />
          <Form.Item
            label="活动封面"
            name="bannerImage"
          >
            <FromWrap
              content={(value, onChange) => <Upload multiple value={value} disabled={id&&falg} onChange={onChange}   maxCount={1} accept="image/*"  proportion={{width: 50,height: 180,}} />}
              right={(value) => {
                return (
                  <dl>
                    <dd>50 x 180</dd>
                  </dl>
                )
              }}
            />
          </Form.Item>
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
            id&&falg&&<ProFormRadio.Group
                name="status"
                label="活动状态"
                options={[
                    {
                      label: '开启',
                      value: 1
                    },
                    {
                      label: '关闭',
                      value: 2
                    }
                ]}
                readonly={id&&falg}
              />
          }

          {
            id&&falg?
            <p className={styles.back}>最近一次操作人：{detailList?.data?.adminName}     {detailList?.data?.updateTime}</p>
            :null
          }  
       </ProForm>
      </Spin>
      {
        visible&&<EndModel visible={visible} setVisible={setVisible}  endId={id} canBlack={(e)=>{
          setLoading(e)
          setFalg(true)
        }}/>
      }
      </PageContainer>
  )
}
