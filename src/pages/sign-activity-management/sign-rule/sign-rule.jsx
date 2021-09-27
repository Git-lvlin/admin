import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { couponCrowdSub,couponCrowdDetail,couponCrowdEdit } from '@/services/crowd-management/coupon-crowd';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage, formatMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
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
  const id = props.location.query.id
  const [dataSource, setDataSource] = useState([]);
  const [save,setSave]=useState(true)
  const [form] = Form.useForm();
  const [editableKeys, setEditableKeys] = useState([])
  const ref=useRef()

  const defaultData= [
    {
      id: '624748504',
      title: '当天红包金额',
      decs: '这个活动真好玩',
    },
    {
      id: '624691229',
      title: '连续签到额外奖励金额',
    },
  ]
  const onsubmit=values=>{
    setSave(true)
  }
  const columns = [
    {
      title: '签到时间',
      dataIndex: 'title',
      editable:false,
    },
    {
      title: '第1天',
      dataIndex: '1',
      valueType: 'text',
    },
    {
      title: '第2天',
      dataIndex: '2',
      valueType: 'text',
    }, {
      title: '第3天',
      dataIndex: '3',
      valueType: 'text',
    }, {
      title: '第4天',
      dataIndex: '4',
      valueType: 'text',
    }, {
      title: '第5天',
      dataIndex: '5',
      valueType: 'text',
    }, {
      title: '第6天',
      dataIndex: '6',
      valueType: 'text',
    }, {
      title: '第7天',
      dataIndex: '7',
      valueType: 'text',
    }, {
      title: '第8天',
      dataIndex: '8',
      valueType: 'text',
    }, {
      title: '第9天',
      dataIndex: '9',
      valueType: 'text',
    }, {
      title: '第10天',
      dataIndex: '10',
      valueType: 'text',
    }, {
      title: '第11天',
      dataIndex: '11',
      valueType: 'text',
    }, {
      title: '第12天',
      dataIndex: '12',
      valueType: 'text',
    }, {
      title: '第13天',
      dataIndex: '13',
      valueType: 'text',
    }, {
      title: '第14天',
      dataIndex: '14',
      valueType: 'text',
    },
    {
      title: '第15天',
      dataIndex: '15',
      valueType: 'text',
    }
  ];
  const submit = () => {
    setEditableKeys([])
  }
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
                  <Button type="primary" onClick={() => { setEditableKeys(defaultData.map(item => item.id)), setSave(false) }}>编辑</Button>,
                  <Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                    props.form?.submit?.()
                    submit() 
                  }}>
                    保存
                  </Button>
            ];
          }
        }}
        className={styles.sign_rule}
      >
            
        <EditableProTable
            rowKey="id"
            headerTitle="签到红包金额设置(元）"
            maxLength={5}
            name="table"
            value={defaultData}
            // onChange={setDataSource}
            recordCreatorProps={false}
            columns={columns}
            // request={async () => ({
            //   data: defaultData
            // })}
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
        {
          save?  <>
          <ProFormText
              width={120}
              label="红包有效期"
              name="1"
              readonly
              initialValue="永久有效"
            />
          <ProFormText
              width={120}
              label="可领人群"
              name="2"
              readonly
              initialValue="全部用户"
            />
          <ProFormText
              width={120}
              label="发放时间"
              name="3"
              readonly
              initialValue="每天签到成功时"
            />
          <ProFormText
              width={120}
              label="活动规则"
              name="4"
              readonly
              initialValue={"1.连续签到每天依次可获得相应红包；"}
            />
          <ProFormText
              width={120}
              label="活动状态"
              name="6"
              readonly
              initialValue={"开启"}
          />
          <ProFormText
              width={120}
              label="最近一次操作人"
              name="7"
              readonly
              initialValue={"admin     2021/09/16"}
          />
        </>
        : <>
        <ProFormSelect
              width="md"
              name="userId"
              label="红包有效期"
              placeholder="请选择会员昵称"
              extra="超出有效期后将清空用户过期的红包"
              rules={[{ required: true, message: '请选择会员昵称' }]}
              initialValue='perpetual'
              options={[
                { 
                  value: 1,
                  label: '1天'
                }, 
                {
                  value: 2,
                  label: '2天'
                },
                {
                  value: 3,
                  label: '3天'
                },
                {
                  value: 7,
                  label: '7天'
                },
                {
                  value: 15,
                  label: '15天'
                },
                {
                  value: 30,
                  label: '30天'
                },
                {
                  value: 90,
                  label: '90天'
                },
                {
                  value: 180,
                  label: '180天'
                },
                {
                  value: 360,
                  label: '360天'
                },
                {
                  value: 'perpetual',
                  label: '永久有效'
                },
              ]}
          />
          <ProFormRadio.Group
              name="allType"
              label="可领人群"
              options={[
                  {
                    label: '全部用户',
                    value: 1
                  }
              ]}
          />
          <ProFormText
              width={120}
              label="发放时间"
              name="limitQuantity"
              readonly
              initialValue="每天签到成功时"
            />
          <ProFormTextArea
              width="md"
              name="content"
              label="活动规则"
              placeholder="列如玩法规则、红包有效期、简单的用户协议"
              rules={[
                { required: true, message: '请输入活动规则' },
              ]}
          />
           <ProFormText
              width={120}
              label="生效时间"
              name="emdiQuantity"
              readonly
              initialValue="修改后马上生效"
            />
          <ProFormRadio.Group
              name="linkType"
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
          />
          <p className={styles.hint}>提示：关闭活动后，将清空用户账户里的红包记录，请谨慎操作。</p>
      </>
    }
       
      </ProForm>
      </PageContainer>
  )
}
