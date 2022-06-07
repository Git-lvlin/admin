import { useState, useRef, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { 
  buyPersonDivide,
  rentPersonDivide,
  aboutMachine,
  againRentChange,
  scanMachine
} from '@/services/hydrogen-atom-management/hydrogen-atom-configuration';
import { Divider, Form, Button, Descriptions } from 'antd';
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import ProForm, {
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { amountTransform } from '@/utils/utils'
import ConfirmModel from './confirm-model'
import type { ProFormInstance } from '@ant-design/pro-form';
import type { activityItem,buyConfigItem,detailItem,rentDetailItem,paramsTypeItem } from './data'


export default () => {
    const ref=useRef<ActionType>()
    const [dataDetail,setDataDetail]=useState<buyConfigItem[]>([])
    const [detail,setDetail]=useState<detailItem>()
    const [dataList,setDataList]=useState()
    const [rent,setRent]=useState()
    const [rentDetail,setRentDetail]=useState<rentDetailItem>()
    const [scanDetail,setScanDetail]=useState<rentDetailItem>()
    const formRef=useRef<ProFormInstance>()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false);
    const [paramsType,setParamsType]=useState<paramsTypeItem>()
    useEffect(()=>{
      buyPersonDivide({}).then(res=>{
        if(res.code==0){
          setDataDetail(JSON.parse(res.data?.value).records)
          setDetail(JSON.parse(res.data?.value).rent)
        }
      })

      rentPersonDivide({}).then(res=>{
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

      scanMachine({}).then(res=>{
        if(res.code==0){
          setScanDetail(JSON.parse(res.data?.value))
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
        dataIndex:'code',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '提成对象和对应分成项名称',
        dataIndex: 'item',
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
      },
      {
        title: '分成比例（%）',
        dataIndex: 'percent',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '分成说明',
        dataIndex: 'divideExplain',
        valueType: 'text',
        hideInSearch: true,
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
        dataIndex: 'item',
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
      },
      {
        title: '分成比例（%）',
        dataIndex: 'percent',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '分成说明',
        dataIndex: 'divideExplain',
        valueType: 'text',
        hideInSearch: true,
      }
    ];
    return (
        <div style={{background:'#fff',padding:'0 20px'}}>
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          headerTitle="购买_氢原子交易款的各个角色分成"
          toolBarRender={()=>[
            <p key='money'>交易款金额：{amountTransform(detail,'/').toFixed(2)}元</p>
          ]}
          search={false}
          columns={columns}
          pagination={false}
          dataSource={dataDetail}
          style={{marginBottom:'30px'}}
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
          style={{marginBottom:'30px'}}
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
              {amountTransform(rentDetail?.monthRentMoney,'/').toFixed(2)}元 / 月，固定按1月30天计算{((rentDetail?.monthRentMoney/30)/100).toFixed(2)}元 / 天（四舍五入）
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'right', width: 230, display: 'inline-block' }} label="氢原子机器首次启用后免租期天数">
              <p>{rentDetail?.firstFreeRentDay}天</p>
              <p style={{color:'#FBB336'}}>（从机器激活的次日算起）</p>
            </Descriptions.Item>
            <Descriptions.Item label="氢原子机器自动确认收货时间">
              {rentDetail?.autoConfirmTime}天
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ textAlign: 'right', width: 380, display: 'inline-block' }} label="氢原子机器租赁时租金可逾期天数（租约逾期至停用天数）">
              <ProFormText
                readonly
                fieldProps={{
                  value:rentDetail?.exceedStopDay
                }}
              />
              天
              <p style={{color:'#FBB336'}}>（从机器租约到期日的次日算起（除首次缴租外,指定续租可缴租时段即为可逾期天数：每月1日-5日））</p>
            </Descriptions.Item>
            <Descriptions.Item  label="对于租赁的氢原子">
              普通用户 可扫机器 {scanDetail?.member?.count} 次 / 天，每次间隔 {scanDetail?.member?.minute} 分钟
            </Descriptions.Item>
            <Descriptions.Item label="对于租赁的氢原子">
              绑定的店主 可扫机器 {scanDetail?.store?.count} 次 / 天{parseInt(scanDetail?.store?.minute)?<p>，每次间隔 {scanDetail?.store?.minute} 分钟</p>:null}
            </Descriptions.Item>
            <Descriptions.Item label="达到限制次数弹窗文案">
              您今日已启用 {scanDetail?.store?.count} 次，暂时无法启用！
            </Descriptions.Item>
            <Descriptions.Item label="达到限制间隔弹窗文案">
              距离最近启用时间小于 {scanDetail?.store?.count} 分钟，暂时无法启用！
            </Descriptions.Item>
        </Descriptions>

        <Divider style={{ margin: '10px 0' }} />

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
            <p><span style={{color:'#FF4D99',fontSize:'20px'}}>*</span>租赁店主集约业绩考核：缴纳第</p>
            <ProFormSelect
              width="xs"
              options={[
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
              initialValue={4}
              name="month"
              disabled
              rules={[{ required: true, message: '请选择月份' }]}
            />
            <p>个整月管理费时： </p>
          </ProForm.Group>
          <ProForm.Group>
            {/* <ProFormDependency name={['month']}>
                  {({ month }) => { 
                      return <p>最近{parseInt(month-1)}个整月任意1月集约金额未达到</p>
                }}
            </ProFormDependency> */}
            <p>最近3个整月任意1月集约金额未达到</p>
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
            <p>时，需额外缴纳</p>
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
              initialValue={0}
            />
            <p>额外管理费</p>
          </ProForm.Group>
            {/* <ProFormDependency name={['month']}>
                  {({ month }) => { 
                      return <p>第  {month}  个整月之后缴纳管理费时：</p>
                }}
            </ProFormDependency> */}
            <p>第  5  个整月之后缴纳管理费时：</p>
          <ProForm.Group>
            <p>上月集约金额未达到</p>
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
            <p>时，需额外缴纳</p>
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
              initialValue={0}
              extra={<span style={{color:'#FBB336'}}>此部分不参与分成</span>}
            />
            <p>额外管理费</p>
            <ProFormText
              name='code'
              hidden
            />
            <Form.Item>
            <Button type="primary" onClick={()=>{
              formRef?.current?.submit()
            }}>
              确定
            </Button>
          </Form.Item>
          </ProForm.Group>
        </ProForm>
        <p style={{color:'#F8A618',fontWeight:'bold'}}>说明：在 4 个整月前缴管理费不进行集约业绩考核</p>
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