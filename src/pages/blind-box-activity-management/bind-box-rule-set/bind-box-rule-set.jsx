import React, { useState, useEffect } from 'react';
import { Input, Form, Divider, message, Button,List, Space,Avatar } from 'antd';
import { FormattedMessage, formatMessage,history } from 'umi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import GainType from './gain-type/gain-type'
import PeriodValidity from './period-validity/period-validity'
import PrizeSet from './prize-set/prize-set'
import Upload from '@/components/upload';
import { saveActiveConfig } from '@/services/blind-box-activity-management/blindbox-save-active-config';
import { getActiveConfigById } from '@/services/blind-box-activity-management/blindbox-get-active-config-list';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import moment from 'moment';
import styles from './style.less'
import { PageContainer } from '@ant-design/pro-layout';
const FormItem = Form.Item;

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

export default (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [detailList,setDetailList]=useState()
  const [form] = Form.useForm()
  const [falg,setFalg]=useState(true)
  let id = props.location.query.id
  useEffect(() => {
    if (id) {
      getActiveConfigById({id:id}).then(res=>{
        setDetailList(res.data)
        form.setFieldsValue({
          switch1:res.data.content?.accessGain.inviteFriends.switch,
          switch2:res.data.content?.accessGain.signIn.switch,
          switch3:res.data.content?.accessGain.orderConsume.switch,
          probability1:res.data.content?.accessGain.inviteFriends.probability,
          probability2:res.data.content?.accessGain.signIn.probability,
          probability3:res.data.content?.accessGain.orderConsume.probability,
          dayGainMax:res.data.content?.accessGain.inviteFriends.dayGainMax,
          ruleText:res.data.content?.ruleText,
          validiteType:res.data.content?.validiteType,
          validiteHour:res.data.content?.validiteHour,
          redeemEarlyDay:res.data.content?.redeemEarlyDay,
          maxPrizeNum:res.data.content?.maxPrizeNum,
          prizeNotice:res.data.content?.prizeNotice,
          dateRange: [ moment(res.data.startTime*1000).format('YYYY-MM-DD HH:mm:ss'), moment(res.data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')],
          ...res.data
        })
      })
    } 
  }, [])
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length > 50) {
        await reject('红包名称不超过50个字符')
      } else if (value&&/[^\u4e00-\u9fa5\0-9]/.test(value)) {
        await reject('只能输入汉字')
      } else {
        await resolve()
      }
    })
  }
  const onsubmit = (values) => {
    try {
      values.id=id||0
      values.startTime=values.dateRange ?values.dateRange[0]:null
      values.endTime=values.dateRange ?values.dateRange[1]:null
      values.validiteHour=values.validiteType?values.validiteHour:0
      values.accessGain={
        inviteFriends:{
          switch:values.switch1,
          inviteNum:values.inviteNum,
          prizeNum:1,
          dayGainMax:values.dayGainMax,
          probability:values.probability1
        },
        signIn:{
          switch:values.switch2,
          signInNum:values.signInNum,
          prizeNum:1,
          probability:values.probability2
        },
        orderConsume:{
          switch:values.switch3,
          consumeNum:values.consumeNum,
          prizeNum:1,
          probability:values.probability3
        }
      }
      const arr = [];
      dataSource.forEach(item => {
        arr.push({
          id: item.add?0:item.id,
          probability: item.probability,
          status: item.status?1:0,
          skuId: item.skuId,
          spuId: item.spuId,
          stockNum: item.stockNum,
          goodsName: item.goodsName,
          imageUrl: item.imageUrl,
          salePrice: item.salePrice,
          retailSupplyPrice: item.retailSupplyPrice,
        })
      })
      
      values.skus=arr.length>0&&arr||detailList?.skus
    } catch (error) {
      console.log('error',error)
    }
 
    saveActiveConfig(values).then(res=>{
      if (res.code == 0) {
        history.push('/blind-box-activity-management/blind-box-management-list')
        if(id){
          message.success('编辑成功');
        }else{
          message.success('提交成功');
        }
       
      }
    })
  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <PageContainer>
      <ProForm
        form={form}
        {...formItemLayout}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
               <Space>
                 {
                  id?
                  <>
                     {
                       detailList?.status==1?
                       <>
                       {
                         falg?<Button style={{marginLeft:'80px'}} type="primary"  onClick={()=>{setFalg(false)}}>
                         编辑
                        </Button>
                        :<Button style={{marginLeft:'80px'}} type="primary" key="submit" onClick={() => {
                          props.form?.submit?.()
                        }}>
                          保存
                        </Button>
                       }
                       </>
                       :null
                     }
                  </>
                  :
                    <Button style={{marginLeft:'80px'}} type="primary" key="submit" onClick={() => {
                      props.form?.submit?.()
                    }}>
                      保存
                    </Button>
                 }
               </Space>
              ];
            }
          }
        }
        onFinish={async (values) => {
            await onsubmit(values);
            return true;
        }
        }
        className={styles.bindBoxRuleSet}
        initialValues={{
          ruleItems: [{
            imageUrl: '',
            name: ''
          }]
        }}
      >
        {/* 活动名称 */}
        <ProFormText
            width={250}
            label="活动名称"
            placeholder="输入活动名称"
            name="name"
            readonly={id&&falg}
            rules={[
              { required: true, message: '请输入活动名称' },
            ]}
        />
        {/* 活动时间 */}
        <ProFormDateTimeRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
            name="dateRange"
            extra="提示：活动时间不能和其他盲盒活动时间重叠"
            fieldProps={{
               disabledDate:(current)=>disabledDate(current)
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
        <PeriodValidity id={id} falg={falg}/>
        <ProFormText
            width={120}
            label="盲盒中奖后兑奖有效期"
            readonly
            fieldProps={{
              value:' '
           }}
        />
        <div className={styles.unfold}>
            <ProForm.Group>
            <span>中奖后</span>
            <ProFormText
                width={120}
                name="redeemEarlyDay"
                readonly={id} 
            />
            <span>天内有效</span>
            </ProForm.Group>
            <p className={styles.give}>超出有效期后将不能再兑换中奖的奖品</p>
        </div>

        {/* 开盲盒机会获取途径 */}
        <GainType id={id} falg={falg}/>

        {/* 中奖次数 */}
        <ProForm.Group>
            <span className={styles.back}>每天可中奖最高总次数</span>
            <ProFormText 
                name="maxPrizeNum"
                width={100}
                rules={[
                    {validator: checkConfirm}
                ]} 
                readonly={id&&falg}
            />
            <span>次，当天总计达到此中奖次数，后面的人不再中奖</span>
        </ProForm.Group>

        {/* 奖品设置 */}
        <PrizeSet detailList={detailList} id={id} falg={falg} callback={(val)=>{
          setDataSource(val)
        }}/>
        

        {/* 奖品预告 */}
        <Form.Item label="奖品预告（尺寸72x56）" rules={[{ required: true, message: '请设置奖品预告' }]}>
          {
            id&&falg?
            <List
              itemLayout="horizontal"
              dataSource={detailList?.content?.prizeNotice}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.imageUrl} />}
                    title={<p>{item.name}</p>}
                  />
                </List.Item>
              )}
            />
            : <Form.List name="prizeNotice">
            {(fields, { add, remove }) => (
              <>
                <List
                  bordered
                  itemLayout="horizontal"
                >
                  {fields.map((field) => {
                    return (
                      <List.Item
                        key={field.key}
                      >
                        <ProForm.Group>
                          <Form.Item key="1" {...field} name={[field.name, 'imageUrl']} fieldKey={[field.fieldKey, 'imageUrl']}>
                            <Upload dimension={{width:72,height:56}} code={204} multiple maxCount={1} accept="image/*" size={1 * 1024} />
                          </Form.Item>
                          &nbsp;
                          <ProFormText
                            {...field}
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            placeholder='奖品名，6个字以内'
                            key="2"
                            fieldProps={{
                              style: {
                                width: 328
                              }
                            }}
                          />
                        </ProForm.Group>
                      </List.Item>
                    )
                  })}
                </List>
                <Button icon={<PlusOutlined />} style={{ marginTop: 10 }} onClick={() => { add() }}>
                  添加更多
                </Button>
              </>
            )}
          </Form.List>
          }
         
          </Form.Item>

        {/* 活动规则 */}
        {
          id&&falg?
          <Form.Item
            label="活动规则"
          >
          <pre className={styles.line_feed}>
            {
              detailList?.content?.ruleText
            }
          </pre>
          </Form.Item>
        :<ProFormTextArea 
              label='活动规则'
              name="ruleText"
              style={{ minHeight: 32, marginTop: 15 }}
              placeholder='列如玩法规则、简单的用户协议'
              rules={[{ required: true, message: '请备注活动规则' }]}
              rows={4}
              readonly={id&&falg}
          />
        }

      
       
        {
          id&&falg?
          <p className={styles.back}>最近一次操作人：{detailList?.lastEditor}     {moment(detailList?.updateTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
          :null
        }
        
        {/* 活动状态 */}
        <ProFormRadio.Group
          name="status"
          label='活动状态'
          options={[
              {
                  label:'开启',
                  value: 1,
              },
              {
                  label: '关闭',
                  value: 0,
              }
          ]}
          readonly={id&&falg}
      />
      {
        id&&falg?null
        :<p className={styles.hint}>提示：关闭活动后，将清空用户的账户记录，请谨慎操作。</p>
      }
      </ProForm >
    </PageContainer>
  );
};


