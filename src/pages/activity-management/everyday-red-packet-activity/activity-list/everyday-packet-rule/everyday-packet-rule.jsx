import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { editSignRedPacketConfig,getSignRedPacketConfig } from '@/services/sign-activity-management/get-sign-red-packet-config';
import ProForm, { ProFormText, ProFormRadio, ProFormDateRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage, formatMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import styles from './style.less'

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
  const [dataSource, setDataSource] = useState([]);
  const [option,setOption]=useState()
  const [save,setSave]=useState(false)
  const [form] = Form.useForm();
  const [cont,setCont]=useState()
  const user=JSON.parse(window.localStorage.getItem('user'))
  const [editableKeys, setEditableKeys] = useState([])
  const [detailList,setDetailList]=useState()

  useEffect(() => {
    //   getSignRedPacketConfig({}).then(res=>{
    //     if(res.code==0){
    //       setDetailList(res.data)
    //       const data={
    //         title:'当天红包金额'
    //       }
    //       res.data?.fixRedPacketConfigResList.map((ele,index)=>{
    //         data[`changeValue${index+1}`]=parseInt(ele.changeValue)/100
    //         data['typeId']=1
    //       })
    //       if(res.data?.fixRedPacketConfigResList.length<1){
    //         for (let index = 0; index < 15; index++) {
    //           data[`changeValue${index+1}`]=' '
    //           data['typeId']=1
    //         }
    //       }
    //       const data2={
    //         title:'连续签到额外奖励金额'
    //       }
    //       res.data?.extraPacketConfigResList.map((ele,index)=>{
    //         data2[`changeValue${index+1}`]=parseInt(ele.changeValue)/100
    //         data2['typeId']=2
    //       })
    //       if(res.data?.extraPacketConfigResList.length<1){
    //         for (let index = 0; index < 15; index++) {
    //           data2[`changeValue${index+1}`]=' '
    //           data2['typeId']=2
    //         }
    //       }
    //       setDataSource([{...data},{...data2}])
    //       const arr=[]
    //       res.data?.exTimeList.map(ele=>{
    //         arr.push({
    //           value: ele,
    //           label: `${ele}${parseInt(ele)>=0?'天':''}`
    //         })
    //       })
    //       setOption(arr)
    //     }
    //     form.setFieldsValue({
    //       exTimeStr:res.data.exTime,
    //       ...res.data
    //     })
    //   })
  }, [save,cont])
  const onsubmit=values=>{
    setSave(true)
    // values.status=1
    // editSignRedPacketConfig({...values}).then(res=>{
    //   if(res.code==0){
    //     message.success('编辑成功'); 
    //     setCont(Date.now())
    //   }
    // })
  }
  const columns = [
    {
      title: '连续获得天数',
      dataIndex: 'title',
      editable:false,
    },
    {
      title: '第1天',
      dataIndex: 'changeValue1',
      valueType: 'text',
      renderFormItem: (_,r) => {
        return    <ProFormSelect
                    width="md"
                    name="changeValue1"
                    initialValue='1'
                    // options={option}
                />
        },
      render: (_,r) =>{
        return <p>{_}</p>
      }
    },
    {
      title: '第2天',
      dataIndex: 'changeValue2',
      valueType: 'text',
      renderFormItem: (_,r) => {
        return    <ProFormSelect
                    width="md"
                    name="changeValue2"
                    initialValue='1'
                    // options={option}
                />
        },
      render: (_,r) =>{
        return <p>{_}</p>
      }
    }, {
      title: '第3天',
      dataIndex: 'changeValue3',
      valueType: 'text',
      renderFormItem: (_,r) => {
        return    <ProFormSelect
                    width="md"
                    name="changeValue3"
                    initialValue='1'
                    // options={option}
                />
        },
      render: (_,r) =>{
        return <p>{_}</p>
      }
    }
  ];
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
                  save?<Button type="primary" onClick={() => { setEditableKeys(dataSource.map(item => item.typeId)), setSave(false) }}>编辑</Button>
                  :<Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                    props.form?.submit?.()
                    setEditableKeys([])
                  }}>
                    保存
                  </Button>
                }
              </>     
            ];
          }
        }}
        className={styles.everyday_packet_rule}
      >
        <ProFormText
              width="md"
              name="exTimeStr"
              label="活动名称"
              placeholder="输入活动名称"
              rules={[{ required: true, message: '请输入活动名称' }]}
              readonly={save}
          />
        <ProFormDateRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
            name="dateRange"
            fieldProps={{
               disabledDate:(current)=>disabledDate(current),
               showTime:{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
              },
              format:"YYYY-MM-DD HH:mm"
            }}
            readonly={save}
            placeholder={[
                formatMessage({
                    id: 'formandbasic-form.placeholder.start',
                }),
                formatMessage({
                    id: 'formandbasic-form.placeholder.end',
                }),
            ]}
        />
                    
        <EditableProTable
            rowKey="typeId"
            headerTitle="每日首单红包发放金额(元）"
            extra="提示：中断或连续3天获得了红包重新按第一天金额发放，每次领取的红包不累计，三天的红包金额只可按面值递增选择，不可以选择一样的面值。"
            name="table"
            value={dataSource}
            recordCreatorProps={false}
            columns={columns}
            editable={{
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                setDataSource(recordList)
              }
            }}
            style={{marginBottom:'30px'}}
        />
          <ProFormText
              width={120}
              label="领取条件"
              fieldProps={{
                value: "每日首次下单成功（不含盲盒以及店主采购订单）"
              }}
              readonly
            />
            {
              save?
               <Form.Item
                label="活动规则"
              >
              <pre className={styles.line_feed}>
                {
                  detailList?.remark
                }
              </pre>
              </Form.Item>
                :
              <ProFormTextArea
                name="remark"
                label="活动规则"
                placeholder="列如玩法规则、红包有效期、简单的用户协议"
                rules={[
                  { required: true, message: '请输入活动规则' },
                ]}
                readonly={save}
                fieldProps={
                  {
                    autoSize:true
                  }
                }
            />
            }
      </ProForm>
      </PageContainer>
  )
}
