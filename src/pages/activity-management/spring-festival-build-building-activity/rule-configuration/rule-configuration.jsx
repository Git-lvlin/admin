import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber,Spin,Space,Descriptions, Badge} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { couponInviteSub,couponInviteEdit,couponInviteDetail,couponInviteSelList } from '@/services/activity-management/share-red-packet-activity';
import ProForm, { ProFormText, ProFormRadio,ProFormDateTimeRangePicker,ProFormTextArea,ProFormDatePicker,ProFormSelect} from '@ant-design/pro-form';
import { FormattedMessage, formatMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { history,connect } from 'umi';
import styles from './style.less'
import EndModel from './end-model'
import Upload from '@/components/upload';
import ProCard from '@ant-design/pro-card';

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
  const [dataSource, setDataSource] = useState();
  const [onselect,setOnselect]=useState([])
  const [falg,setFalg]=useState(true)
  const [form] = Form.useForm();
  const [detailList,setDetailList]=useState()
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referrerNum1,setReferrerNum1]=useState()
  const [referrerNum2,setReferrerNum2]=useState()
  const [referrerNum3,setReferrerNum3]=useState()
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
     try {
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
        values.inviteSecond=referrerNum1
        values.inviteThird=parseInt(referrerNum1+1)
        values.inviteFour=referrerNum2
        values.inviteFive=parseInt(referrerNum2+1)
        couponInviteSub({...values}).then(res=>{
          if(res.code==0){
            message.success('添加成功'); 
            history.push('/activity-management/share-red-packet-activity/activity-list')
          }
        })
      }
       
     } catch (error) {
       console.log('error',error)
     }

  }
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
                <Button type="default" style={{marginLeft:'80px'}} onClick={() => { history.goBack() }}>返回</Button>
              </>  
            ];
          }
        }}
        className={styles.rule_configuration}
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
          {
            id&&falg?
            <ProFormText
              width="md"
              name="dateRange"
              label="活动时间"
              rules={[{ required: true, message: '请选择活动时间' }]}
              readonly
              fieldProps={{
                value:detailList?.data?.activityStartTime +' 至 '+detailList?.data?.activityEndTime
              }}
            />  
          : <ProFormDateTimeRangePicker
              width="md"
              label='活动时间'
              rules={[{ required: true, message: '请选择活动时间' }]}
              name="dateRange"
              fieldProps={{
                showTime:{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
                },
                format:"YYYY-MM-DD HH:mm"
              }}
              placeholder={[
              formatMessage({
                  id: 'formandbasic-form.placeholder.start',
              }),
              formatMessage({
                  id: 'formandbasic-form.placeholder.end',
              }),
              ]}
          />
          }
          <ProCard
            title={<p><span style={{color:'red'}}>*</span> 奖励设置(元）</p>}
            headerBordered
            split='horizontal'
            className={styles.list}
          >
            <ProCard split="horizontal">
              <ProCard split="horizontal">
                <ProCard split='vertical'>
                  <ProCard colSpan="110px" layout="center" style={{background:'#EFF0F4'}}>挑战楼层</ProCard>
                  <ProCard layout="center">
                    <Space>
                      <sapn>3-</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'100px'}} placeholder="____________" bordered={false} />
                      </Form.Item>
                      <span>层</span>
                    </Space>
                  </ProCard>
                  <ProCard layout="center">
                    <Space>
                      <sapn>10-</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'100px'}} placeholder="____________" bordered={false} />
                      </Form.Item>
                      <span>层</span>
                    </Space>
                  </ProCard>
                  <ProCard layout="center">
                    <Space>
                      <sapn>16-</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'100px'}} placeholder="____________" bordered={false} />
                      </Form.Item>
                      <span>层</span>
                    </Space>
                  </ProCard>
                  <ProCard layout="center">
                  <Space>
                      <sapn>21-</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'100px'}} placeholder="____________" bordered={false} />
                      </Form.Item>
                      <span>层</span>
                    </Space>
                  </ProCard>
                </ProCard>
                <ProCard split="vertical">
                  <ProCard layout="center" style={{background:'#EFF0F4'}}>普惠奖</ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                </ProCard>
                <ProCard split="vertical">
                  <ProCard layout="center" style={{background:'#EFF0F4'}}>幸运奖</ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                  <ProCard style={{width:'400px',textAlign:'center'}}>
                    <Space>
                      <sapn>概率</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <span>%</span>
                    </Space>
                    <Space>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                      <Form.Item
                        name="cen"
                      >
                       <Input style={{width:'80px'}} placeholder="_________" bordered={false} />
                      </Form.Item>
                    </Space>
                  </ProCard>
                </ProCard>
                <ProCard split="vertical">
                  <ProCard colSpan="110px" layout="center" style={{background:'#EFF0F4'}}>幸运大奖</ProCard>
                  <ProCard layout="center">
                    <Space>
                      <sapn>每天产生一名</sapn>
                      <Form.Item
                        name="cen"
                      >
                      <Input style={{width:'100px'}} placeholder="____________" bordered={false} />
                      </Form.Item>
                      <span>元，从给的店主名单中随机选已经中过幸运大奖的不会重复中此奖</span>
                    </Space>
                    <Button style={{marginLeft:'200px'}} type="primary">上传名单</Button>
                  </ProCard>
                </ProCard>
                <ProCard split="vertical">
                  <ProCard layout="center" colSpan="110px" style={{background:'#EFF0F4'}}>未中奖</ProCard>
                  <ProCard layout="center">概率10%</ProCard>
                  <ProCard layout="center">概率10%</ProCard>
                  <ProCard layout="center">概率10%</ProCard>
                  <ProCard layout="center">概率10%</ProCard>
                </ProCard>
              </ProCard>
            </ProCard>
          </ProCard>
          <ProFormText
            width="sm"
            name="maxNum"
            label="最高累计限额"
            rules={[{ required: true, message: '请输入' }]}
            readonly={!falg||id}
            fieldProps={{
              addonAfter:"元"
            }}
          />
          <ProFormText
            width="sm"
            label="每天限额"
            name="maxNum"
            readonly={!falg||id}
            rules={[{ required: true, message: '请输入' }]}
            fieldProps={{
              addonAfter:"元"
            }}
          />
          <ProFormText
            width="sm"
            name="maxNum"
            label="每人赠送游戏机会"
            readonly={!falg||id}
            rules={[{ required: true, message: '请输入' }]}
            fieldProps={{
              addonAfter:"次"
            }}
            />
          <ProFormDatePicker
            label="能提现有效期"
            name="expireTime"
            rules={[{ required: true, message: '请选择一个日期' }]}
          />
          <ProForm.Group>
          <ProFormSelect
            name="signInNum"
            initialValue={1}
            labelCol={3}
            width="sm"
            label='每邀请'
            rules={[{ required: true, message: '请选择' }]}
            options={[
                {
                    value: 1,
                    label: '1个新用户',
                },
                {
                    value: 2,
                    label: '2个新用户',
                },
                {
                    value: 3,
                    label: '3个新用户',
                },
                {
                    value: 4,
                    label: '4个新用户',
                },
                {
                    value: 5,
                    label: '5个新用户',
                },
                {
                    value: 6,
                    label: '6个新用户',
                }
            ]}
            readonly={!falg||id}
          />
          <span>奖励游戏机会</span>
          <ProFormSelect
              name="signInNum"
              initialValue={1}
              width="sm"
              // labelCol={3}
              // label=''
              rules={[{ required: true, message: '请选择' }]}
              options={[
                  {
                      value: 1,
                      label: '1次',
                  },
                  {
                      value: 2,
                      label: '2次',
                  },
                  {
                      value: 3,
                      label: '3次',
                  },
                  {
                      value: 4,
                      label: '4次',
                  },
                  {
                      value: 5,
                      label: '5次',
                  },
                  {
                      value: 6,
                      label: '6次',
                  }
              ]}
              readonly={!falg||id}
          />
        </ProForm.Group>
           <ProFormText
            width="sm"
            name="maxNum"
            label="获得机会有效期"
            readonly={!falg||id}
            rules={[{ required: true, message: '请输入' }]}
            fieldProps={{
              addonAfter:"小时"
            }}
            />
          <ProFormText
            width="sm"
            name="maxNum"
            label="试玩次数"
            readonly={!falg||id}
            rules={[{ required: true, message: '请输入' }]}
            fieldProps={{
              addonAfter:"次"
            }}
            />
          <ProFormText
            width="lg"
            name="maxNum"
            label="被邀请人玩游戏"
            readonly={!falg||id}
            rules={[{ required: true, message: '请输入' }]}
            fieldProps={{
              addonBefore:'每有1个新用户参与游戏，奖励游戏机会',
              addonAfter:"次"
            }}
            />
          <ProFormText
            width="sm"
            name="maxNum"
            label="参与活动"
            // labelCol={3}
            readonly={!falg||id}
            rules={[{ required: true, message: '请输入' }]}
            fieldProps={{
              addonAfter:"人数"
            }}
            />
          <Form.Item
            label="活动封面"
            name="bannerImage"
            rules={[{ required: true, message: '请上传封面' }]}
          >
            <FromWrap
              content={(value, onChange) => <Upload multiple value={value} disabled={id&&falg} onChange={onChange}   maxCount={1} accept="image/*"  proportion={{width: 670,height: 284,}} />}
              right={(value) => {
                return (
                  <dl>
                    <dd>宽 670 x 高 284</dd>
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
                name="activityStatus"
                label="活动状态"
                options={[
                    {
                      label: '进行中',
                      value: 2
                    },
                    {
                      label: '未开始',
                      value: 3
                    },
                    {
                      label: '已结束',
                      value: 4
                    },
                    {
                      label: '已终止',
                      value: 5
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
