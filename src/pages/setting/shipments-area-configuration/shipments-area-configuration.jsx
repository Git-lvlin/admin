import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Checkbox,message, Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import AddressMultiCascader from '@/components/address-multi-cascader'
import { latedeliveryAreaIndex,addLateDeliveryDesc,addLatedeliveryArea,updateLatedeliveryAreaStatus } from '@/services/setting/shipments-area-configuration'
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormRadio,ProFormDependency } from '@ant-design/pro-form';
import { history,connect } from 'umi';
import { getAreaData } from '@/utils/utils'
import DeleModel from './dele-model'


const formItemLayout = {
    labelCol: { span: 1 },
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

export default () => {
    const ref=useRef()
    const [tips, setTips] = useState('');
    const [selectKeys, setSelectKeys] = useState([]);
    const [uncheckableItemValues, setUncheckableItemValues] = useState([]);
    const [disabledItemValues, setDisabledItemValues] = useState([]);
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm();
    const [position,setPosition]=useState()
    const [cityData,setCityData]=useState()
    const columns= [
      {
        title: '省份',
        dataIndex: 'provinceName',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '城市',
        dataIndex: 'cityName',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '地区/县城',
        dataIndex: 'districtName',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'text',
        render: (_) => {
          return <span style={{ color: _ === 1 ? 'green' : 'red' }}>{_ === 1 ? '启用' : '禁用'}</span>
        },
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          '1': '启用',
          '2': '禁用'
        },
        hideInTable: true,
      },
      {
        title: '操作',
        valueType: 'option',
        render: (_, data) => [
          <a onClick={() => { changeStatus(data) }}>{data.status === 1 ? '禁用' : '启用'}</a>,
          <a onClick={() => { deleteArea(data) }}>删除</a>
        ]
      }, 
    ];
    const deleteArea = (data) => {
      setVisible(true)
      setCityData(data)
    }
    const changeStatus = (data) => {
      updateLatedeliveryAreaStatus({
          type: data.status === 1 ? 2 : 1,
          id: data.cityId,
        }, { showSuccess: true })
          .then(res => {
            if (res.code === 0) {
                ref.current.reload();
            }
          })
      }
    const getUncheckableItemValues = () => {
        latedeliveryAreaIndex({
          page: 1,
          size: 9999,
        }).then(res => {
          // const keys = res.data.records.map(item => item.regionId)
          // setDisabledItemValues(keys)
        })
      }
    const setArea = () => {
        if (selectKeys.length === 0) {
          message.error('请选择要添加的区域')
          return;
        }
        console.log('getAreaData(selectKeys)',getAreaData(selectKeys))
        addLatedeliveryArea({
          lateDeliveryArea: getAreaData(selectKeys).map(item => ({ ...item, areaName: item.provinceName+'|'+item.cityName+'|'+item.regionName })),
        }, { showSuccess: true }).then(res => {
          if (res.code === 0) {
            ref.current.reload();
            getUncheckableItemValues();
            document.querySelector('.tips').click()
          }
        })
      }
    const onsubmit = (values) => {
        addLateDeliveryDesc({lateDeliveryDesc:values.lateDeliveryDesc},{ showSuccess: true }).then(res=>{
          if (res.code === 0) {
            ref.current.reload();
          }
        })
    }
    const postData = (data) => {
      const tips=`共 ${data.provinceNum} 个省份   ${data.cityNum} 个城市 ${data.districtNum} 个地区/县城  其中已启用地区/县城 ${data.openDistrictNum} 个 已禁用地区/县城 ${data.closeDistrictNum} 个`
      setTips(tips)
      form.setFieldsValue({
        isAll:data.isAll,
        lateDeliveryDesc:data.lateDeliveryDesc
      })
      return data.records;
    } 
    return (
      <PageContainer>
        <div style={{ backgroundColor: '#fff', padding: 30 }}>
            <h6>异常情况下商品发货时间不确定的区域配置</h6>
            <p style={{margin:'20px 0 0 0'}}>对商品发货地或收货地在已开启状态的配置区域内时，确认订单展示给用户设置的提示文案。设置后立即生效</p> 
        </div>

        <ProForm
            name="configuration"
            form={form}
            onFinish={async (values) => {
                await onsubmit(values);
                return true;
            }}
            submitter={false}
            style={{background:'#fff',padding:"20px 0 20px 100px"}}
            {...formItemLayout}
            >
        <Space>
          <ProFormText
            width={1000}
            label="发货时间不确定提示文案"
            placeholder="请输入疫情、极端天气等原因致使发货时间不确定时展示在用户下单页面的提示文案，5-60个字符"
            name="lateDeliveryDesc"
            fieldProps={{
                minLength:5,
                maxLength: 60,
            }}
            labelCol={5}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
            确定
            </Button>
          </Form.Item>
        </Space>
        <ProFormRadio.Group
          name="isAll"
          label="请选择区域"
          options={[
          {
              label:"指定部分地区",
              value: 0,
          },
          {
              label: "全国所有地区（即所有商品下单时都提示）",
              value: 1,
          },
          ]}
          fieldProps={{
            onChange: (e) => {
              console.log('e',e)
              setPosition(e.target.value)
              if(e.target.value===1){
                addLatedeliveryArea({lateDeliveryArea:[]})
              }
            },
            value:position
          }}
        />
          {/* <ProFormDependency name={['isAll']}>
          {({ isAll }) => {
              if(isAll==1) return null
              if(position==0||!isAll||isAll==0){
                  return <> */}
                      <AddressMultiCascader
                          style={{ width: 130,marginLeft:'30px' }}
                          value={selectKeys}
                          placeholder="添加地区"
                          renderValue={() => <span style={{ color: '#8e8e93' }}>添加地区</span>}
                          renderExtraFooter={() => <div style={{ padding: 10, textAlign: 'right' }}><Button type="primary" onClick={() => { setArea() }}>确定</Button></div>}
                          onChange={setSelectKeys}
                          uncheckableItemValues={uncheckableItemValues}
                          disabledItemValues={disabledItemValues}
                          onClose={() => { setSelectKeys([]) }}
                      />
                      <ProTable
                          actionRef={ref}
                          rowKey="id"
                          options={false}
                          request={latedeliveryAreaIndex}
                          toolBarRender={() => <div className="tips">{tips}</div>}
                          search={false}
                          columns={columns}
                          postData={postData}
                      />
                      {/* </>
              }
          }}
          </ProFormDependency> */}
        </ProForm>
        {visible&&
          <DeleModel 
            visible={visible} 
            cityData={cityData}
            setVisible={setVisible} 
          />
        }
    </PageContainer>
    );
  };