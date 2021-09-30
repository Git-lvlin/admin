import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { editSignRedPacketConfig,getSignRedPacketConfig } from '@/services/sign-activity-management/get-sign-red-packet-config';
import ProForm, { ProFormText, ProFormRadio, ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
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
  const [save,setSave]=useState(true)
  const [form] = Form.useForm();
  const [cont,setCont]=useState()
  const user=JSON.parse(window.localStorage.getItem('user'))
  const [editableKeys, setEditableKeys] = useState([])
  const [detailList,setDetailList]=useState()

  useEffect(() => {
      getSignRedPacketConfig({}).then(res=>{
        if(res.code==0){
          setDetailList(res.data)
          const data={
            title:'当天红包金额'
          }
          res.data?.extraPacketConfigResList.map((ele,index)=>{
            data[`changeValue${index+1}`]=ele.changeValue
            data['typeId']=1
          })
          const data2={
            title:'连续签到额外奖励金额'
          }
          res.data?.fixRedPacketConfigResList.map((ele,index)=>{
            data2[`changeValue${index+1}`]=ele.changeValue
            data2['typeId']=2
          })
          setDataSource([{...data},{...data2}])
          const arr=[]
          res.data?.exTimeList.map(ele=>{
            arr.push({
              value: ele,
              label: `${ele}天`
            })
          })
          setOption(arr)
        }
        form.setFieldsValue({
          exTimeStr:res.data.exTime,
          ...res.data
        })
      })
  }, [save,cont])
  const onsubmit=values=>{
    setSave(true)
    const changeData=[
      {
        id:0,
        changeValue:dataSource[1].changeValue1
      },
      {
        id:1,
        changeValue:dataSource[1].changeValue2
      },
      {
        id:2,
        changeValue:dataSource[1].changeValue3
      },
      {
        id:3,
        changeValue:dataSource[1].changeValue4
      },
      {
        id:4,
        changeValue:dataSource[1].changeValue5
      },
      {
        id:5,
        changeValue:dataSource[1].changeValue6
      },
      {
        id:6,
        changeValue:dataSource[1].changeValue7
      },
      {
        id:7,
        changeValue:dataSource[1].changeValue8
      },
      {
        id:8,
        changeValue:dataSource[1].changeValue9
      },
      {
        id:9,
        changeValue:dataSource[1].changeValue10
      },
      {
        id:10,
        changeValue:dataSource[1].changeValue11
      },
      {
        id:11,
        changeValue:dataSource[1].changeValue12
      },
      {
        id:12,
        changeValue:dataSource[1].changeValue13
      },
      {
        id:13,
        changeValue:dataSource[1].changeValue14
      },
      {
        id:14,
        changeValue:dataSource[1].changeValue15
      },
      {
        id:15,
        changeValue:dataSource[0].changeValue1
      },
      {
        id:16,
        changeValue:dataSource[0].changeValue2
      }, {
        id:17,
        changeValue:dataSource[0].changeValue3
      }, {
        id:18,
        changeValue:dataSource[0].changeValue4
      }, {
        id:19,
        changeValue:dataSource[0].changeValue5
      }, {
        id:20,
        changeValue:dataSource[0].changeValue6
      }, {
        id:21,
        changeValue:dataSource[0].changeValue7
      }, {
        id:22,
        changeValue:dataSource[0].changeValue8
      }, {
        id:23,
        changeValue:dataSource[0].changeValue9
      }, {
        id:24,
        changeValue:dataSource[0].changeValue10
      }, {
        id:25,
        changeValue:dataSource[0].changeValue11
      }, {
        id:26,
        changeValue:dataSource[0].changeValue12
      },
      {
        id:27,
        changeValue:dataSource[0].changeValue13
      },
      {
        id:28,
        changeValue:dataSource[0].changeValue14
      },
      {
        id:29,
        changeValue:dataSource[0].changeValue15
      },

    ]
    editSignRedPacketConfig({handler:user.username,changeIds:changeData,...values}).then(res=>{
      if(res.code==0){
        message.success('编辑成功'); 
        setCont(Date.now())
      }
    })
  }
  const columns = [
    {
      title: '签到时间',
      dataIndex: 'title',
      editable:false,
    },
    {
      title: '第1天',
      dataIndex: 'changeValue1',
      valueType: 'text',
    },
    {
      title: '第2天',
      dataIndex: 'changeValue2',
      valueType: 'text',
    }, {
      title: '第3天',
      dataIndex: 'changeValue3',
      valueType: 'text',
    }, {
      title: '第4天',
      dataIndex: 'changeValue4',
      valueType: 'text',
    }, {
      title: '第5天',
      dataIndex: 'changeValue5',
      valueType: 'text',
    }, {
      title: '第6天',
      dataIndex: 'changeValue6',
      valueType: 'text',
    }, {
      title: '第7天',
      dataIndex: 'changeValue7',
      valueType: 'text',
    }, {
      title: '第8天',
      dataIndex: 'changeValue8',
      valueType: 'text',
    }, {
      title: '第9天',
      dataIndex: 'changeValue9',
      valueType: 'text',
    }, {
      title: '第10天',
      dataIndex: 'changeValue10',
      valueType: 'text',
    }, {
      title: '第11天',
      dataIndex: 'changeValue11',
      valueType: 'text',
    }, {
      title: '第12天',
      dataIndex: 'changeValue12',
      valueType: 'text',
    }, {
      title: '第13天',
      dataIndex: 'changeValue13',
      valueType: 'text',
    }, {
      title: '第14天',
      dataIndex: 'changeValue14',
      valueType: 'text',
    },
    {
      title: '第15天',
      dataIndex: 'changeValue15',
      valueType: 'text',
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
        className={styles.sign_rule}
      >
            
        <EditableProTable
            rowKey="typeId"
            headerTitle="签到红包金额设置(元）"
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
        <ProFormSelect
              width="md"
              name="exTimeStr"
              label="红包有效期"
              placeholder="请选择会员昵称"
              extra="超出有效期后将清空用户过期的红包"
              rules={[{ required: true, message: '请选择红包有效期' }]}
              initialValue='1'
              readonly={save}
              options={option}
          />
          <ProFormRadio.Group
              label="可领人群"
              options={[
                  {
                    label: '全部用户',
                    value: 1
                  }
              ]}
              fieldProps={{
                value: "全部用户"
              }}
              readonly
          />
          <ProFormText
              width={120}
              label="发放时间"
              fieldProps={{
                value: "每天签到成功时"
              }}
              readonly
            />
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
           <ProFormText
              width={120}
              label="生效时间"
              fieldProps={{
                value: "修改后马上生效"
              }}
              readonly
            />
          <ProFormRadio.Group
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
              readonly={save}
          />
          {
            save?
            <p className={styles.back}>最近一次操作人：{detailList?.lastHandler}      {detailList?.updateTime?moment(detailList?.updateTime*1000).format('YYYY-MM-DD HH:mm:ss'):null}</p>
            :null
          }
          
          {
            !save? <p className={styles.hint}>提示：关闭活动后，将清空用户账户里的红包记录，请谨慎操作。</p>
            :null
          }
         
       
      </ProForm>
      </PageContainer>
  )
}
