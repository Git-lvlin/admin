import { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { getQyzBuyConfig,
  personDivide,
  aboutMachine,
  againRentChange,
} from '@/services/hydrogen-atom-management/hydrogen-atom-configuration';
import { Divider, Form, Button, Descriptions } from 'antd';
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import ProForm, {
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import moment from 'moment'
import ConfirmModel from './confirm-model'

type activityItem={
    id:number;
    buyType: number;
    suggestCommission: number;
    agentCompanyCommission: number;
    businessDeptCommission: number;
    provinceAgentCommission: number;
    cityAgentCommission: number;
}

type buyConfigItem={
    id:number;
    commission: string;
    describe: string;
    DividedAmount: number;
}


export default () => {
    const ref=useRef<ActionType>()
    const [dataDetail,setDataDetail]=useState<buyConfigItem>()
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
            <p key='money'>交易款金额：{amountTransform(detail?.salePrice,'/').toFixed(2)}元</p>
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
            <p key='money'>租金金额：{amountTransform(rent,'/').toFixed(2)}元 / 月</p>
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
              {amountTransform(rentDetail?.monthRentMoney,'/').toFixed(2)}元 / 月，{(((rentDetail?.monthRentMoney/moment().daysInMonth()))/100).toFixed(2)}元 / 天（四舍五入）
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