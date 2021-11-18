import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Checkbox} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import AddressMultiCascader from '@/components/address-multi-cascader'
// import { couponEverydayList } from '@/services/activity-management/everyday-red-packet-activity';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormRadio,ProFormDependency } from '@ant-design/pro-form';
import { history,connect } from 'umi';


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
    const [selectKeys, setSelectKeys] = useState([]);
    const [uncheckableItemValues, setUncheckableItemValues] = useState([]);
    const [disabledItemValues, setDisabledItemValues] = useState([]);
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
        dataIndex: 'regionName',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'text',
        render: (_) => {
          return <span style={{ color: _ === 'on' ? 'green' : 'red' }}>{_ === 'on' ? '启用' : '禁用'}</span>
        },
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          'on': '启用',
          'off': '禁用'
        },
        hideInTable: true,
      },
      {
        title: '操作',
        valueType: 'option',
        render: (_, data) => {
          return <a onClick={() => { changeStatus(data) }}>{data.status === 'on' ? '禁用' : '启用'}</a>
        }
      }, 
    ];
    const changeStatus = (data) => {
        changeApplicableArea({
          status: data.status === 'on' ? 'off' : 'on',
          regionId: data.regionId,
          cityId: data.cityId,
          provinceId: data.provinceId,
        }, { showSuccess: true })
          .then(res => {
            if (res.code === 0) {
                ref.current.reload();
            }
          })
      }
    const getUncheckableItemValues = () => {
        setUncheckableItemValues(window.yeahgo_area.filter(item => item.deep !== 3).map(item => item.id))
        getApplicableArea({
          page: 1,
          size: 9999,
        }).then(res => {
          const keys = res.data.records.map(item => item.regionId)
          setDisabledItemValues(keys)
        })
      }
    const setArea = () => {
        if (selectKeys.length === 0) {
          message.error('请选择要添加的区域')
          return;
        }
        setApplicableArea({
          areas: getAreaData(selectKeys).map(item => ({ ...item, status: 'on' })),
          append: true,
        }, { showSuccess: true }).then(res => {
          if (res.code === 0) {
            ref.current.reload();
            getUncheckableItemValues();
            document.querySelector('.tips').click()
          }
        })
      }
    const onsubmit = (values) => {
        console.log('values',values)
    }  
    return (
      <PageContainer>
        <div style={{ backgroundColor: '#fff', padding: 30 }}>
            <h6>异常情况下商品发货时间不确定的区域配置</h6>
            <p style={{margin:'20px 0 0 0'}}>对商品发货地或收货地在已开启状态的配置区域内时，确认订单展示给用户设置的提示文案。设置后立即生效</p> 
        </div>
        <ProForm
            name="customized_form_controls"
            layout="inline"
            onFinish={async (values) => {
                await onsubmit(values);
                return true;
            }}
            submitter={false}
            style={{background:'#fff',padding:"20px 0 20px 100px"}}
            // {...formItemLayout}
            >
            {/* <ProForm.Group> */}
                <ProFormText
                    width={1000}
                    label="发货时间不确定提示文案"
                    placeholder="请输入疫情、极端天气等原因致使发货时间不确定时展示在用户下单页面的提示文案，5-60个字符"
                    name="name"
                    fieldProps={{
                        minLength:5,
                        maxLength: 60,
                    }}
                />
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    确定
                    </Button>
                </Form.Item>
            {/* </ProForm.Group> */}
        </ProForm>

        <ProForm
            name="configuration"
            onFinish={async (values) => {
                await onsubmit(values);
                return true;
            }}
            submitter={false}
            style={{background:'#fff',padding:"20px 0 20px 100px"}}
            {...formItemLayout}
            >
        <ProFormRadio.Group
                    name="addsType"
                    label="请选择区域"
                    options={[
                    {
                        label:"指定部分地区",
                        value: 1,
                    },
                    {
                        label: "全国所有地区（即所有商品下单时都提示）",
                        value: 2,
                    },
                    ]}

                />
                <ProFormDependency name={['addsType']}>
                {({ addsType }) => {
                    if(addsType==2) return null
                    if(!addsType||addsType==1){
                        return <>
                                <AddressMultiCascader
                                    style={{ width: 130,marginLeft:'30px' }}
                                    value={selectKeys}
                                    placeholder="添加地区"
                                    renderValue={() => <span style={{ color: '#8e8e93' }}>添加地区</span>}
                                    cleanable={false}
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
                            //   request={couponEverydayList}
                                toolBarRender={()=>[
                                    <p>共 6 个省份   7 个城市 15 个地区/县城  其中已启用地区/县城 12 个 已禁用地区/县城 3 个</p>
                                ]}
                                search={false}
                                columns={columns}
                            />
                            </>
                    }
                }}
                </ProFormDependency>
            </ProForm>
        </PageContainer>
    );
  };