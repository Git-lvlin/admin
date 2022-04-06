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
import ProForm, { ProFormText, ProFormRadio,ProFormDateRangePicker,ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect,DrawerForm } from '@ant-design/pro-form';
import moment from 'moment';
import styles from './style.less'
import { PageContainer } from '@/components/PageContainer';


const formItemLayout = {
  labelCol: { span: 4 },
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
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

export default (props) => {
  const {setVisible,visible,onClose,callback,id}=props
  const [detailList,setDetailList]=useState()
  const [goosList,setGoosList]=useState()
  const [submi,setSubmi]=useState(false)
  const [form] = Form.useForm()
  const [falg,setFalg]=useState(true)
  const [del,setDel]=useState('')
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
          inviteNum:res.data.content?.accessGain.inviteFriends.inviteNum,
          signInNum:res.data.content?.accessGain.signIn.signInNum,
          consumeNum:res.data.content?.accessGain.orderConsume.consumeNum,
          dayGainMax:res.data.content?.accessGain.inviteFriends.dayGainMax,
          ruleText:res.data.content?.ruleText,
          validiteType:res.data.content?.validiteType,
          validiteHour:res.data.content?.validiteHour,
          redeemEarlyDay:res.data.content?.redeemEarlyDay,
          maxPrizeNum:res.data.content?.maxPrizeNum,
          prizeNotice:res.data.content?.prizeNotice,
          imgUrl:res.data.content?.imgUrl,
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
  const checkConfirm2 = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length > 1000) {
        await reject('活动规则不超过1000个字符')
      }else {
        await resolve()
      }
    })
  }
  const checkConfirm3 = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length > 6) {
        await reject('奖品名，6个字以内')
      }else {
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
      // let sum=0
      goosList?.forEach(item => {
        arr.push({
          id: item.add?0:item.id,
          probability: item.probability,
          status: item.status?1:0,
          skuId: item.skuId,
          spuId: item.spuId,
          stockNum: item.stockNum,
          baseStockNum:item.baseStockNum,
          goodsName: item.goodsName,
          imageUrl: item.imageUrl,
          salePrice: item.salePrice,
          retailSupplyPrice: item.retailSupplyPrice,
        })
      })
      if(del){
        values.skus=arr
      }else{
        values.skus=arr.length>0&&arr||detailList?.skus
      }
      // values.skus.map(ele=>{
      //   sum+=parseInt(ele.probability)
      // })
    // if(sum<100||sum>100){
    //   message.error('商品中奖概率之和必须等于100')
    // }else{
      if(values.skus.length==0){
        message.error('中奖商品不能为空');
      }else{
        saveActiveConfig(values).then(res=>{
          if (res.code == 0) {
            setVisible(false)
            callback(true)
            if(id){
              setDel(false)
              message.success('编辑成功');
            }else{
              message.success('提交成功');
              setDel(false)
            }
           
          }
        })
      }

    // }
      
    } catch (error) {
      console.log('error',error)
    }
  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <PageContainer>
       <DrawerForm
        title={id?'详情':'盲盒规则配置'}
        onVisibleChange={setVisible}
        visible={visible}
        width={1400}
        form={form}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          onClose: () => {
            onClose();
          }
        }}
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
                       <div>
                       {
                         falg?<Button key='edit' type="primary"  onClick={()=>{
                           setFalg(false)
                          }}>
                         编辑
                        </Button>
                        :<Button  type="primary" key="submit" onClick={() => {
                          props.form?.submit?.()
                          setSubmi(true)
                        }}>
                          保存
                        </Button>
                       }
                       </div>
                       :null
                     }
                  </>
                  :
                    <Button type="primary" key="submit" onClick={() => {
                      props.form?.submit?.()
                      setSubmi(true)
                    }}>
                      保存
                    </Button>
                 }
               </Space>
              ];
            }
          }
        }
        onFinish={async (values)=>{
          await  onsubmit(values);
        }}
        initialValues={{
          prizeNotice:[{
            imageUrl: '',
            name: ''
          }],
          ruleItems: [{
            imageUrl: '',
            name: ''
          }]
        }}
        className={styles.bindBoxRuleSet}
        {...formItemLayout}
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
               disabledDate:(current)=>disabledDate(current),
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
        <Form.Item
          label="活动封面"
          name="imgUrl"
          rules={[{ required: true, message: '请上传活动封面' }]}
        >
          <FromWrap
            content={(value, onChange) => <Upload multiple value={value} disabled={id&&falg} onChange={onChange}   maxCount={1} accept="image/*"  proportion={{width: 670,height: 284,}} />}
            right={(value) => {
              return (
                <dl>
                  <dd>670 x 284</dd>
                </dl>
              )
            }}
          />
        </Form.Item>
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
                rules={[{ required: true, message: '请设置兑奖有效期' }]}
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
                rules={[{ required: true, message: '请设置中奖次数' }]}
            />
            <span>次，当天总计达到此中奖次数，后面的人不再中奖</span>
        </ProForm.Group>

        {/* 奖品设置 */}
        <PrizeSet
          submi={submi}
          detailList={detailList}
          id={id} 
          falg={falg} 
          callback={(val)=>{
            setGoosList(val)
            setDel(true)
          }}
        />
        

        {/* 奖品预告 */}
        <Form.Item label={<div className={styles.box}><span className={styles.mark}>*</span>奖品预告（尺寸200x156）</div>}>
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
                        extra={fields.length !== 1 &&
                          <Button style={{ marginLeft: 10, width: 80 }} onClick={() => { remove(field.name) }} type="primary" danger>
                            删除
                          </Button>}
                      >
                        <ProForm.Group>
                          <Form.Item  key="1" {...field} name={[field.name, 'imageUrl']} fieldKey={[field.fieldKey, 'imageUrl']}>
                            <Upload dimension={{width:200,height:156}} code={204} multiple maxCount={1} accept="image/*" size={1 * 1024} />
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
                            rules={[
                              { required: true, message: '请设置奖品预告' },
                              {validator: checkConfirm3}
                            ]}
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
              rules={[
                { required: true, message: '请备注活动规则' },
                {validator: checkConfirm2}
              ]}
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
          initialValue={1}
      />
      {
        id&&falg?null
        :<p className={styles.hint}>提示：关闭活动后，将清空用户的账户记录，请谨慎操作。</p>
      }
      </DrawerForm>
    </PageContainer>
  );
};


