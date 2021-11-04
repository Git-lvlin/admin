import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { addConfig,updateConfig,findById,configTest,findFunctions } from '@/services/resource'
import ProForm, { ProFormText, ProFormRadio,ProFormDateTimeRangePicker,ProFormTextArea,ProFormDependency,ProFormSelect } from '@ant-design/pro-form';
import { FormattedMessage, formatMessage } from 'umi';
import DiscountsModel from './discounts-model'
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { history,connect } from 'umi';
import styles from './style.less'
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span:3 },
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
      sourceField:'',
      destField:'',
      functionName:'',
      format:''
    }
  ]
  const data2=[
    {
      id:1,
      dataCode:'',
      sql:'',
      orderNo:'',
      resultType:'',
      express:''
    }
  ]
  const data3=[
    {
      id:1,
      field:'',
      encryptType:'',
    }
  ]


export default (props) =>{
  const [dataSource, setDataSource] = useState(data);
  const [dataSource2, setDataSource2] = useState(data2);
  const [dataSource3, setDataSource3] = useState(data3);
  const [editableKeys, setEditableRowKeys] = useState(() =>data.map((item) => item.id));
  const [editableKeys2, setEditableRowKeys2] = useState(() =>data2.map((item) => item.id));
  const [editableKeys3, setEditableRowKeys3] = useState(() =>data3.map((item) => item.id));
  const [onselect,setOnselect]=useState([])
  const [form] = Form.useForm();
  const [boardData,setBoardData]=useState()
  let id = props.location.query.id
  let edtil = props.location.query.edtil
  let edit = props.location.query.edit
 
  useEffect(() => {
    findFunctions({}).then(res=>{
      const data={}
      res.data.map((ele)=>(
        data[ele.functionName]=ele.functionName
      ))
      setOnselect(data)
    })
    if(id){
      findById({id:id}).then(res=>{
        setBoardData(res.data)
        if(edit){
          setEditableRowKeys(res.data.requestFormatList.map((item,index) => index))
          setEditableRowKeys2(res.data.sqlConfigs.map((item,index) => index))
          setEditableRowKeys3(res.data.sensitiveFields.map((item,index) => index))
        }
        setDataSource(res.data.requestFormatList.map((ele,index)=>{return {id:index,...ele}}))
        setDataSource2(res.data.sqlConfigs)
        setDataSource3(res.data.sensitiveFields)
        form.setFieldsValue({
          ...res.data
        })
      })
    }
  }, [])
  const onsubmit=values=>{
    const {...rest}=values
    const params={
      requestFormatList:dataSource,
      sqlConfigs:dataSource2,
      sensitiveFields:dataSource3,
      ...rest
    }
    if(dataSource.length==0){
      delete params.requestFormatList
    }
    if(dataSource2.length==0){
      delete params.sqlConfigs
    }
    if(dataSource3.length==0){
      delete params.sensitiveFields
    }
    if(id){
      updateConfig({id:id,...params}).then(res=>{
        if(res.code==0){
          message.success('编辑成功');
          history.push('/dc-management/data-board')
        }
      })
    }else{
      addConfig(params).then(res=>{
        if(res.code==0){
          message.success('添加成功');
          history.push('/dc-management/data-board')
        }
      })
    }
  }

 
  const columns = [
    {
      title: '源字段',
      dataIndex: 'sourceField',
    },
    {
      title: '目标字段',
      dataIndex: 'destField',
      valueType: 'text',
    },
    {
      title: '转换函数',
      dataIndex: 'functionName',
      valueType: 'select',
      valueEnum: onselect,
      fieldProps: {
        placeholder: '请选择'
      },
    },
     {
      title: '格式串',
      dataIndex: 'format',
      valueType: 'text',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
      hideInTable:id&&edtil?true:false,
    },
  ];
  const columns2 = [
    {
      title: '数据集编码',
      dataIndex: 'dataCode',
    },
    {
      title: 'SQL',
      dataIndex: 'sql',
      valueType: 'text',
      width:400,
      renderFormItem: (_,r) => {
        return  <TextArea
                    name="sql"
                />
        },
      render: (_,r) =>{
        return <p>{_}</p>
      }
    },
    {
      title: '顺序',
      dataIndex: 'orderNo',
      valueType: 'text',
    },
    {
      title: '数据类型',
      dataIndex: 'resultType',
      valueType: 'select',
      valueEnum: {
        1:'Value',
        2: 'Map',
        3: 'List',
        4: 'Page',
      },
      fieldProps: {
        placeholder: '请选择'
      },
    },
    {
      title: '表达式',
      dataIndex: 'express',
      valueType: 'text',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource2(dataSource2.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
      hideInTable:id&&edtil?true:false,
    },
  ];
  const columns3 = [
    {
      title: '字段名',
      dataIndex: 'field',
    },
    {
      title: '脱敏类型',
      dataIndex: 'encryptType',
      valueType: 'select',
      valueEnum: {
        1:'手机号码',
        2: '身份证号',
      },
      fieldProps: {
        placeholder: '请选择'
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource3(dataSource3.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
      hideInTable:id&&edtil?true:false,
    },
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
              edtil?null:
              <>
              <DiscountsModel 
                InterFace={configTest}
              />
              <Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                props.form?.submit?.()
              }}>
                保存
              </Button>
              </>
            }
            </>
            ];
          }
        }}
        className={styles.data_board_configuration}
      >
        <ProFormText
            width="md"
            name="reportCode"
            label="接口编码"
            placeholder="输入接口编码"
            rules={[{ required: true, message: '请输入接口编码' }]}
            readonly={id&&edtil}
          />
          <ProFormText
            width="md"
            name="remark"
            label="接口说明"
            placeholder="输入接口说明"
            rules={[{ required: true, message: '请输入接口说明' }]}
            readonly={id&&edtil}
        />


          <EditableProTable
            headerTitle="入参格式化"
            columns={columns}
            name="table"
            rowKey="id"
            controlled
            recordCreatorProps={id&&edtil?false:{
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now(),
              }),
            }}
            value={dataSource}
            onChange={setDataSource}
            editable={{
              type: 'multiple',
              editableKeys:id&&edtil?[]:editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                setDataSource(recordList);
              },
              onChange: setEditableRowKeys,
            }}
            className={styles.back}
          /> 


          <EditableProTable
            headerTitle="SQL配置"
            columns={columns2}
            name="table"
            rowKey="id"
            recordCreatorProps={id&&edtil?false:{
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now(),
              }),
            }}
            controlled
            value={dataSource2}
            onChange={setDataSource2}
            editable={{
              type: 'multiple',
              editableKeys:id&&edtil?[]:editableKeys2,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                setDataSource2(recordList);
              },
              onChange: setEditableRowKeys2,
            }}
            className={styles.back}
          /> 


          <EditableProTable
            headerTitle="脱敏设置"
            columns={columns3}
            name="table"
            rowKey="id"
            recordCreatorProps={id&&edtil?false:{
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now(),
              }),
            }}
            controlled
            value={dataSource3}
            onChange={setDataSource3}
            editable={{
              type: 'multiple',
              editableKeys:id&&edtil?[]:editableKeys3,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: (record, recordList) => {
                setDataSource3(recordList);
              },
              onChange: setEditableRowKeys3,
            }}
            className={styles.back}
          /> 
          {
            id&&edtil?
             <Form.Item
              label="出参模板（FreeMarKer）"
              rules={[{ required: true, message: '请填写模板' }]}
              >
              <pre className={styles.line_feed}>
                {
                  boardData?.responseTemplate
                }
              </pre>
              </Form.Item>
           :
           <ProFormTextArea
              name="responseTemplate"
              label="出参模板（FreeMarKer）"
              rules={[{ required: true, message: '请填写模板' }]}
              placeholder="请输入"
              readonly={id&&edtil}
            />
          }
      </ProForm>
      </PageContainer>
  )
}
