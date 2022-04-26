import { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { getQyzBuyConfig,
  personDivide,
  aboutMachine,
  againRentChange,
  againRentNoticeTime,
  againRentNoticeContent,
  supplyRentNoticeTime,
  supplyRentNoticeConten,
  firestRent,
  buySend,
  rentSend
} from '@/services/hydrogen-atom-management/hydrogen-atom-configuration';
import { PageContainer } from '@/components/PageContainer';
import { Divider, Form, Button,Descriptions,message,Select,Typography } from 'antd';
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormTimePicker,
  ProFormCheckbox
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import moment from 'moment'
import ConfirmModel from './confirm-model'
const { Option } = Select;
const { Title } = Typography;

type activityItem={
    id:number;
    buyType: number;
    suggestCommission: number;
    agentCompanyCommission: number;
    businessDeptCommission: number;
    provinceAgentCommission: number;
    cityAgentCommission: number;
}

const formItemLayout = {
  labelCol: { span: 7 },
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




const Configuration=(props) => {
    const ref=useRef<ActionType>()
    const [dataDetail,setDataDetail]=useState()
    const [detail,setDetail]=useState()
    const [dataList,setDataList]=useState()
    const [rent,setRent]=useState()
    const [rentDetail,setRentDetail]=useState()
    const formRef=useRef()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false);
    const [paramsType,setParamsType]=useState()
    useEffect(()=>{
      getQyzBuyConfig({}).then(res=>{
        if(res.code==0){
          const data=[
            {id:1,commission:'直推人',describe:'直接推荐人，以约购社区推荐关系计算，社区店主才有',DividedAmount:res.data?.suggestCommission },
            {id:2,commission:'运营中心',describe:'平台运营中心，以区/县为单位',DividedAmount:res.data?.agentCompanyCommission },
            {id:3,commission:'汇能健康事业部',describe:'以省为单位的实体',DividedAmount:res.data?.businessDeptCommission },
            {id:4,commission:'汇智能通省加盟商',describe:'简称 ‘省代’',DividedAmount:res.data?.provinceAgentCommission },
            {id:5,commission:'汇智能通市加盟商',describe:'简称 ‘市代’',DividedAmount:res.data?.cityAgentCommission },
          ]
          setDataDetail(data)
          setDetail(res.data)
        }
      })

      personDivide({}).then(res=>{
        if(res.code==0){
          setDataList(JSON.parse(res.data?.value).records)
          setRent(JSON.parse(res.data?.value).rent)
        }
      })

      aboutMachine({}).then(res=>{
        if(res.code==0){
          setRentDetail(JSON.parse(res.data?.value))
        }
      })

      againRentChange({}).then(res=>{
        if(res.code==0){
          const datail=JSON.parse(res.data?.value)
          form.setFieldsValue({
            month:datail?.afterMonth?.month,
            arrive:amountTransform(datail?.afterMonth?.arrive,'/'),
            rentCheap:amountTransform(datail?.afterMonth?.rentCheap,'/'),
            arrive2:amountTransform(datail?.other?.arrive,'/'),
            rentCheap2:amountTransform(datail?.other?.rentCheap,'/'),
            code:res.data?.code
          })
        }
      })
    },[])
    const columns:ProColumns<activityItem>[]= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '提成对象',
        dataIndex: 'commission',
        valueType: 'text',
      },
      {
        title: '描述',
        dataIndex: 'describe',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '分成金额（元）',
        dataIndex: 'DividedAmount',
        valueType: 'text',
        hideInSearch: true,
        render:(_)=>{
          return <p>{amountTransform(_,'/').toFixed(2)}</p>
        }
      }
    ];

    const columns2:ProColumns<activityItem>[]= [
      {
        title: '序号',
        dataIndex:'code',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '提成对象',
        dataIndex: 'dividePerson',
        valueType: 'text',
      },
      {
        title: '描述',
        dataIndex: 'describe',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '分成金额（元）',
        dataIndex: 'divideMoney',
        valueType: 'text',
        hideInSearch: true,
        render:(_)=>{
          return <p>{amountTransform(_,'/').toFixed(2)}</p>
        }
      }
    ];
    return (
        <div style={{background:'#fff',padding:'50px'}}>
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          headerTitle="购买_氢原子交易款的各个角色分成"
          toolBarRender={()=>[
            <p>交易款金额：{amountTransform(detail?.salePrice,'/').toFixed(2)}元</p>
          ]}
          search={false}
          columns={columns}
          pagination={false}
          dataSource={dataDetail}
          style={{marginBottom:'50px'}}
        />
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          headerTitle="租赁_氢原子租金款的各个角色提成比例"
          toolBarRender={()=>[
            <p>租金金额：{amountTransform(rent,'/').toFixed(2)}元 / 月</p>
          ]}
          search={false}
          columns={columns2}
          pagination={false}
          dataSource={dataList}
          style={{marginBottom:'50px'}}
        />
        <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right',  display: 'inline-block' }}>
        <Descriptions.Item label="扫码启动使用机器需支付金额">
              {amountTransform(rentDetail?.startMoney,'/').toFixed(2)}元，对应使用时长：{rentDetail?.useTime}分钟。使用机器支付的费用不分成，固定结算到平台账户
            </Descriptions.Item>
        </Descriptions>
        <Descriptions column={2} style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 200, display: 'inline-block' }}>
            <Descriptions.Item label="氢原子机器押金金额">
              {amountTransform(rentDetail?.deposit,'/').toFixed(2)}元
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'right', width: 230, display: 'inline-block' }} label="氢原子机器首次缴租最低缴租天数">{rentDetail?.firstRentDay}天</Descriptions.Item>
            <Descriptions.Item label="氢原子机器租金金额">
              {amountTransform(rentDetail?.monthRentMoney,'/').toFixed(2)}元 / 月，{((rentDetail?.monthRentMoney/moment().daysInMonth()).toFixed(2))/100}元 / 天（四舍五入）
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'right', width: 230, display: 'inline-block' }} label="氢原子机器首次启用后免租期天数">
              <p>{rentDetail?.firstFreeRentDay}天</p>
              <p style={{color:'#FBB336'}}>（从机器激活的次日算起）</p>
            </Descriptions.Item>
            <Descriptions.Item label="氢原子机器自动确认收货时间">
              {rentDetail?.autoConfirmTime}天
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'right', width: 400, display: 'inline-block' }} label="氢原子机器租赁时租金可逾期天数（租约逾期至停用天数）">
              {rentDetail?.exceedStopDay}天
              <p style={{color:'#FBB336'}}>（从机器租约到期日的次日算起）</p>
            </Descriptions.Item>
        </Descriptions>

        <Divider style={{ margin: '20px 0' }} />

        <ProForm<{
          month: number;
          arrive: number;
          rentCheap: number;
          arrive2: number;
          rentCheap2: number;
            }>
          onFinish={async (values) => {
            setVisible(true)
            setParamsType(values)
          }}
          submitter={{
            render: (props, defaultDoms) => {
                return [];
            },
            }}
          formRef={formRef}
          form={form}
        >
          <ProForm.Group>
            <p><span style={{color:'#FF4D99',fontSize:'20px'}}>*</span>第2次缴租金优惠配置：从机器过免租期往后的</p>
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 2,
                  label: '2',
                },
                {
                  value: 3,
                  label: '3',
                },
                {
                  value: 4,
                  label: '4',
                },
                {
                  value: 5,
                  label: '5',
                },
                {
                  value: 6,
                  label: '6',
                },
                {
                  value: 7,
                  label: '7',
                },
                {
                  value: 8,
                  label: '8',
                },
                {
                  value: 9,
                  label: '9',
                }        
              ]}
              name="month"
              rules={[{ required: true, message: '请选择月份' }]}
            />
            <p>月内： </p>
            <p style={{color:'#FBB336'}}>（实际缴租时先增加优惠金额，然后再按照配置优惠）</p>
          </ProForm.Group>

          <ProForm.Group>
            <p>上月集约金额达到</p>
            <ProFormText
              name='arrive'
              width="md"
              placeholder="请输入要求的金额"
              fieldProps={{
                addonAfter:'元'
              }}
              rules={[
                { required: true, message: '请输入要求的金额' },
                () => ({
                  validator(_, value) {
                    if (value&&!/^\d+\.?\d*$/g.test(value) || value < 0 || value > 999999.99 || `${value}`?.split?.('.')?.[1]?.length > 2) {
                      return Promise.reject(new Error('请输入0.00-999999.99,保留2位小数'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
            />
            <p>时，缴租租金优惠</p>
            <ProFormText
              name='rentCheap'
              width="md"
              placeholder="请输入金额"
              fieldProps={{
                addonAfter:'元'
              }}
              rules={[
                { required: true, message: '请输入金额' },
                () => ({
                  validator(_, value) {
                    if (value&&!/^\d+\.?\d*$/g.test(value) || value < 0 || value > amountTransform(rentDetail?.monthRentMoney,'/') || `${value}`?.split?.('.')?.[1]?.length > 2) {
                      return Promise.reject(new Error('请输入0.00-每月租金金额（含0），保留2位小数'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
              extra={<span style={{color:'#FBB336'}}>此部分不参与分成</span>}
            />
            <p>（服务费）</p>
          </ProForm.Group>

          <p>其他时间：</p>

          <ProForm.Group>
            <p>上月集约金额达到</p>
            <ProFormText
              name='arrive2'
              width="md"
              placeholder="请输入要求的金额"
              fieldProps={{
                addonAfter:'元'
              }}
              rules={[
                { required: true, message: '请输入要求的金额' },
                () => ({
                  validator(_, value) {
                    if (value&&!/^\d+\.?\d*$/g.test(value) || value <0 || value > 999999.99 || `${value}`?.split?.('.')?.[1]?.length > 2) {
                      return Promise.reject(new Error('请输入0.00-999999.99,保留2位小数'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
            />
            <p>时，缴租租金优惠</p>
            <ProFormText
              name='rentCheap2'
              width="md"
              placeholder="请输入金额"
              fieldProps={{
                addonAfter:'元'
              }}
              rules={[
                { required: true, message: '请输入金额' },
                () => ({
                  validator(_, value) {
                    if (value&&!/^\d+\.?\d*$/g.test(value) || value < 0 || value > amountTransform(rentDetail?.monthRentMoney,'/') || `${value}`?.split?.('.')?.[1]?.length > 2) {
                      return Promise.reject(new Error('请输入0.00-每月租金金额（含0），保留2位小数'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
              extra={<span style={{color:'#FBB336'}}>此部分不参与分成</span>}
            />
            <p>（服务费）</p>
            <ProFormText
              name='code'
              hidden
            />
            <Form.Item>
            <Button type="primary" onClick={()=>{
              formRef?.current.submit()
            }}>
              确定
            </Button>
          </Form.Item>
          </ProForm.Group>
        </ProForm>
        {visible && <ConfirmModel
          visible={visible}
          setVisible={setVisible}
          paramsType={paramsType}
          callback={()=>{ setParamsType(null)}}
          onClose={() =>{ setParamsType(null)}}
        />}
        </div>
    );
  };

const MessageNotification=(props) => {
  const formRef2=useRef()
  const formRef3=useRef()
  const formRef4=useRef()
  const formRef5=useRef()
  const formRef6=useRef()
  const formRef7=useRef()
  const formRef8=useRef()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const [form4] = Form.useForm()
  const [form5] = Form.useForm()
  const [form6] = Form.useForm()
  const [form7] = Form.useForm()
  const [form8] = Form.useForm()
  const [visible, setVisible] = useState(false);
  const [paramsType,setParamsType]=useState()
  const [onselect,setOnselect]=useState([])
  useEffect(()=>{
    againRentNoticeTime({}).then(res=>{
      if(res.code==0){
        const datail=JSON.parse(res.data?.value)
        form2.setFieldsValue({
          days:datail?.days.split(','),
          time:moment(datail?.time, 'HH:mm:ss'),
          code:res.data?.code
        })
      }
    })

    againRentNoticeContent({}).then(res=>{
      if(res.code==0){
        form3.setFieldsValue({
          value:res.data?.value,
          code:res.data?.code
        })
      }
    })
    
    supplyRentNoticeTime({}).then(res=>{
      if(res.code==0){
        const datail=JSON.parse(res.data?.value)
        form4.setFieldsValue({
          days:datail?.days.split(','),
          time:moment(datail?.time, 'HH:mm:ss'),
          code:res.data?.code
        })
      }
    })

    supplyRentNoticeConten({}).then(res=>{
      if(res.code==0){
        form5.setFieldsValue({
          value:res.data?.value,
          code:res.data?.code
        })
      }
    })

    firestRent({}).then(res=>{
      if(res.code==0){
        const datail=JSON.parse(res.data?.value)
        form6.setFieldsValue({
          remindTime:datail?.remindTime,
          content:datail?.content
        })
      }
    })

    buySend({}).then(res=>{
      if(res.code==0){
        const datail=JSON.parse(res.data?.value)
        form7.setFieldsValue({
          remindTime:datail?.remindTime,
          content:datail?.content
        })
      }
    })

    rentSend({}).then(res=>{
      if(res.code==0){
        const datail=JSON.parse(res.data?.value)
        form8.setFieldsValue({
          remindTime:datail?.remindTime,
          content:datail?.content
        })
      }
    })
  },[])
  const content =()=>{
    const children=[]
    for (let index = 1; index < moment().daysInMonth()+1; index++) {
      if(`${index}`.length==1){
        children.push(<Option style={{}} key={index}>{`0${index}`}</Option>)
      }else{
        children.push(<Option key={index}>{index}</Option>)
      }
      
    }
    return children
  }
  const tagRender=(props)=>{
    const { label, value, closable, onClose } = props;
    return (
      <p
        style={{ marginRight: 3 }}
      >
        每月 {label}日
      </p>
    );
  }
  
  return (
      <div style={{background:'#fff',padding:'50px'}}>
      <Title style={{ marginBottom: 10 }} level={5}>续租</Title>
      <ProForm<{
        days:[],
        time:string
          }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form2}
        formRef={formRef2}
        {...formItemLayout}
      >
        <ProForm.Group>
          <Form.Item labelCol={6} name='days' label="通知时间" rules={[{ required: true, message: '请输入通知时间' }]}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '400px' }}
              placeholder="请选择提醒的通知时间"
              tagRender={tagRender}
            >
              {content()}
            </Select>
          </Form.Item>
          <ProFormTimePicker width={200} name="time"/>
          <Form.Item>
          <ProFormText
            name='code'
            hidden
          />
          <Button type="primary" style={{ marginLeft:'200px' }} onClick={()=>{
            formRef2?.current.submit()
          }}>
            确定
          </Button>
        </Form.Item>
        </ProForm.Group>
      </ProForm>

      <ProForm<{
          value:string
        }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form3}
        formRef={formRef3}
        {...formItemLayout}
      >
        <ProForm.Group>
          <ProFormText
            name='value'
            width={800}
            label="通知文案"
            placeholder="请输入通知店主续租消息的文案，6-200个字符"
            rules={[
              { required: true, message: '请输入通知文案' },
              () => ({
                validator(_, value) {
                  if (value&&value.length<6) {
                    return Promise.reject(new Error('请输入6-200个字符'));
                  }
                  return Promise.resolve();
                },
              })
            ]}
            fieldProps={{
              maxLength:200
            }}
            labelCol={5}
            extra={<p>此处设置站内信文案，<span style={{color:'#DBD0AC'}}>$(参数名)样式为消息参数不可拆散或修改</span></p>}
          />
          <ProFormText
            name='code'
            hidden
          />
          <Form.Item>
          <Button type="primary" onClick={()=>{
            formRef3?.current.submit()
          }}>
            确定
          </Button>
        </Form.Item>
        </ProForm.Group>
      </ProForm>

      <Divider style={{ margin: '0 0 20px 0' }} />
      <Title style={{ marginBottom: 10 }} level={5}>欠费补租</Title>
      <ProForm<{
        days:[],
        time:string
          }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form4}
        formRef={formRef4}
        {...formItemLayout}
      >
        <ProForm.Group>
          <Form.Item labelCol={6} name='days' label="通知时间" rules={[{ required: true, message: '请输入通知时间' }]}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '400px' }}
              placeholder="请选择提醒的通知时间"
              tagRender={tagRender}
            >
              {content()}
            </Select>
          </Form.Item>
          <ProFormTimePicker width={200} name="time"/>
          <ProFormCheckbox.Group
            name="joinShopType"
            options={[
              {
                label: '给客服发送短信和站内信',
                value: 1,
              },
            ]}
            initialValue={[1]}
          />
          <ProFormText
            name='value'
            placeholder='接收短信的手机号码'
          />
          <ProFormSelect
            name="unit"
            // options = {onselect}
            placeholder="选择接收站内信管理员"
          />
          <ProFormText
            name='code'
            hidden
          />
          <Form.Item>
          <Button type="primary" style={{ marginLeft:'170px' }} onClick={()=>{
            formRef4?.current.submit()
          }}>
            确定
          </Button>
        </Form.Item>
        </ProForm.Group>
      </ProForm>

      <ProForm<{
        value:string
          }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form5}
        formRef={formRef5}
        {...formItemLayout}
      >
        <ProFormText
          name='value'
          width={800}
          label="用户通知文案"
          placeholder="请输入通知店主补租消息的文案，6-200个字符"
          rules={[
            { required: true, message: '请输入通知文案' },
            () => ({
              validator(_, value) {
                if (value&&value.length<6) {
                  return Promise.reject(new Error('请输入6-200个字符'));
                }
                return Promise.resolve();
              },
            })
          ]}
          fieldProps={{
            maxLength:200
          }}
          labelCol={5}
          extra={<p>此处设置站内信文案，<span style={{color:'#DBD0AC'}}>$(参数名)样式为消息参数不可拆散或修改</span></p>}
        />
        <ProForm.Group>
          <ProFormText
            name='value'
            width={800}
            label="客服通知文案"
            placeholder="请输入通知客服需店主补租消息的文案，6-200个字符"
            rules={[
              { required: true, message: '请输入通知文案' },
              () => ({
                validator(_, value) {
                  if (value&&value.length<6) {
                    return Promise.reject(new Error('请输入6-200个字符'));
                  }
                  return Promise.resolve();
                },
              })
            ]}
            fieldProps={{
              maxLength:200
            }}
            labelCol={5}
            extra={<p>此处设置站内信文案，<span style={{color:'#DBD0AC'}}>$(参数名)样式为消息参数不可拆散或修改</span></p>}
          />
          <ProFormText
            name='code'
            hidden
          />
          <Form.Item>
          <Button type="primary" onClick={()=>{
            formRef5?.current.submit()
          }}>
            确定
          </Button>
        </Form.Item>
        </ProForm.Group>
      </ProForm>

      <Divider style={{ margin: '0 0 20px 0' }} />
      <Title style={{ marginBottom: 10 }} level={5}>首次交租</Title>
      <ProForm<{
        days:[],
        time:string
          }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form6}
        formRef={formRef6}
        {...formItemLayout}
      >
        <ProFormText
          label="提醒时间"
          labelCol={1}
          width={400}
          name='remindTime'
          readonly
          rules={[{ required: true, message: '请输入提醒时间' }]}
        />
        <ProFormText
          name='content'
          width={800}
          label="通知文案"
          rules={[{ required: true, message: '请输入通知文案' }]}
          labelCol={5}
          extra={<p>此处设置站内信文案，<span style={{color:'#DBD0AC'}}>$(参数名)样式为消息参数不可拆散或修改</span></p>}
          readonly
        />
      </ProForm>
      <Divider style={{ margin: '0 0 20px 0' }} />
      <Title style={{ marginBottom: 10 }} level={5}>购买发货</Title>
      <ProForm<{
        days:[],
        time:string
          }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form7}
        formRef={formRef7}
        {...formItemLayout}
      >
        <ProFormText
          label="通知时间"
          labelCol={1}
          width={400}
          name='remindTime'
          readonly
          rules={[{ required: true, message: '请输入通知时间' }]}
        />
        <ProFormText
          name='content'
          width={800}
          label="通知文案"
          rules={[{ required: true, message: '请输入通知文案' }]}
          labelCol={5}
          extra={<p>此处设置站内信文案，<span style={{color:'#DBD0AC'}}>$(参数名)样式为消息参数不可拆散或修改</span></p>}
          readonly
        />
      </ProForm>
      <Divider style={{ margin: '0 0 20px 0' }} />
      <Title style={{ marginBottom: 10 }} level={5}>租赁发货</Title>
      <ProForm<{
        days:[],
        time:string
          }>
        onFinish={async (values) => {
          setVisible(true)
          setParamsType(values)
        }}
        submitter={{
          render: (props, defaultDoms) => {
              return [];
          },
          }}
        form={form8}
        formRef={formRef8}
        {...formItemLayout}
      >
        <ProFormText
          label="通知时间"
          labelCol={1}
          width={400}
          name='remindTime'
          readonly
          rules={[{ required: true, message: '请输入通知时间' }]}
        />
        <ProFormText
          name='content'
          width={800}
          label="通知文案"
          rules={[{ required: true, message: '请输入通知文案' }]}
          labelCol={5}
          extra={<p>此处设置站内信文案，<span style={{color:'#DBD0AC'}}>$(参数名)样式为消息参数不可拆散或修改</span></p>}
          readonly
        />
      </ProForm>
      <Divider style={{ margin: '0 0 20px 0' }} />
      <p style={{color:'#F8A618',fontWeight:'bold'}}>所有设置完成，立即生效！</p>
      {visible && <ConfirmModel
        visible={visible}
        setVisible={setVisible}
        paramsType={paramsType}
        callback={()=>{ setParamsType(null)}}
        onClose={() =>{ setParamsType(null)}}
      />}
      </div>
  );
};



  export default ()=>{
    const [activeKey, setActiveKey] = useState<string>('1')
    return (
      <PageContainer title=" ">
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="基础配置">
          {
            activeKey == '1' && <Configuration storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="消息通知">
          {
            activeKey == '2' && <MessageNotification  storeType={activeKey} />
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
    )
} 


