import React, { useState, useRef,useEffect } from 'react';
import { Form, Button, Modal,Tabs,Select} from 'antd';
import { FormattedMessage } from 'umi';
import { ModalForm,ProFormSelect,ProFormRadio} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import styles from '../style.less'
import {commonSpuList}  from '@/services/coupon-construction/coupon-common-spu-list';
import {classList} from '@/services/coupon-construction/coupon-class-list'
import BrandSelect from '@/components/brand-select'
import { history,connect } from 'umi';
const { TabPane } = Tabs;

const useSecond=(props)=>{
    const {id,dispatch,DetailList, UseScopeList}=props
    const columns = [
        {
            title: 'spuID',
            dataIndex: 'spuId',
        },
        {
            title: '商品图片',
            dataIndex: 'goodsImageUrl',
            valueType: 'text',
            hideInSearch: true,
            width:120,
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            valueType: 'text',
        },
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            valueType: 'text',
        },
        {
            title: '商品分类',
            dataIndex: 'gcId1',
            valueType: 'select',
            renderFormItem: () => (
            <Select
                placeholder="请选择商品类型"
                options={onselect}
              />
            ),
            hideInTable:true
        },
        {
            title: '商品分类',
            dataIndex: 'gcId1Display',
            valueType: 'text',
            hideInSearch:true
        },
        {
            title: '商品品牌',
            dataIndex: 'brandName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '商品品牌',
            dataIndex: 'brandId',
            renderFormItem: () => (<BrandSelect />),
            hideInTable: true,
        },
        {
            title: '可用库存',
            dataIndex: 'stockNum',
            hideInSearch: true,

        },
        {
            title: '销售价',
            dataIndex: 'goodsSalePrice',
            hideInSearch: true,
        }
    ];
    const columns2=[
       {
          title: '分类',
          dataIndex: 'unit',
       },
       {
        title: '操作',
        valueType: 'text',
        render:(text, record, _, action)=>[
            <a onClick={()=>delType(record.key)}>删除</a>
        ]
     }
    ]
    const columns3= [
        {
            title: 'spuID',
            dataIndex: 'spuId',
        },
        {
            title: '商品图片',
            dataIndex: 'goodsImageUrl', 
            valueType: 'text',
            width:50,
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            valueType: 'text',
        },
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            valueType: 'text',
        },
        {
            title: '商品分类',
            dataIndex: 'gcId1Display',
            valueType: 'text',
        },
        {
            title: '商品品牌',
            dataIndex: 'brandName',
            valueType: 'text',
        },
        {
            title: '可用库存',
            dataIndex: 'stockNum',
        },
        {
            title: '销售价',
            dataIndex: 'goodsSalePrice',
        },
        {
            title: '操作',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>delGoods(record.spuId)}>删除</a>
            ]
         }
    ];
    //删除品类
    const delType=key=>{
        console.log('key',key)
        setCates([])
        dispatch({
            type:'UseScopeList/fetchLookUnit',
            payload:{
                unit:''
            }
        })
    }
    
    //删除商品
    const  delGoods=val=>{
        setGoods(goods.filter(ele=>(
            ele.spuId!=val
        )))
        let arr =  UseScopeList.spuIds.split(',')
        dispatch({
            type:'UseScopeList/fetchLookSpuIds',
            payload:{
                spuIds:arr.filter(ele=>(
                            ele!=val
                        )).toString()
            }
        })
       
    }
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading,setLoading]=useState(true)
    const [flag,setFlag]=useState(true)
    const [goods,setGoods]=useState([])
    const [cates,setCates]=useState([])
    const [position,setPosition]=useState()
    const [onselect,setOnselect]=useState([])
    const [spuIds,setSpuIds]=useState('')
    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setLoading(false)
        dispatch({
            type:'UseScopeList/fetchLookSpuIds',
            payload:{
                spuIds:spuIds
            }
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //拼接spuIds
    const onIpute=(res)=>{
        setGoods(res.selectedRows)
        let spuIds=''
        goods.map(ele=>{
            spuIds+=ele.spuId+','
        })
        spuIds=spuIds.substring(0,spuIds.length-1)
       setSpuIds(spuIds)
    }
    const onCate=()=>{
        setFlag(true)
    }
    //品类下拉接口调用
    useEffect(()=>{
        classList({gcParentId:0}).then(res=>{
            setOnselect(res.data.map(ele=>(
                {label:ele.gcName,value:ele.id}
            )))
        })
    },[])
    return(
        <div className={styles.unfold}>
            <Form.Item label={<FormattedMessage id="formandbasic-form.commodity"/>}>
               <ProFormRadio.Group
                    name="goodsType"
                    fieldProps={{
                    value: (parseInt(id)==id )&&DetailList.data?.goodsType||position,
                    onChange: (e) => setPosition(e.target.value),
                    }}
                    options={[
                    {
                        label:<FormattedMessage id="formandbasic-form.allGoods" />,
                        value: 1,
                    },
                    {
                        label: <FormattedMessage id="formandbasic-form.assignGoods" />,
                        value: 2,
                    },
                    {
                        label: <FormattedMessage id="formandbasic-form.assignClass" />,
                        value: 3,
                    },
                    ]}
                />
                {
                    position==2||(parseInt(id)==id )&&DetailList.data?.goodsType==2?
                       <>
                       {
                           (parseInt(id)==id)?
                           <ProTable
                                toolBarRender={false}
                                search={false}
                                rowKey="spuId"
                                columns={columns}
                                dataSource={DetailList.data?.spuInfo}
                            />
                           :
                           <>
                             <Button type="primary" className={styles.popupBtn} onClick={showModal}>
                                选择商品
                            </Button>
                            
                            <Modal width={1200}  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <ProTable
                                    rowKey="spuId"
                                    options={false}
                                    params={{
                                        pageSize: 3,
                                    }}
                                    style={{display:loading?'block':'none'}}
                                    request={commonSpuList}
                                    actionRef={actionRef}
                                    search={{
                                        defaultCollapsed: false,
                                        labelWidth: 100,
                                        optionRender: (searchConfig, formProps, dom) => [
                                            ...dom.reverse(),
                                        ],
                                    }}
                                    columns={columns}
                                    rowSelection={{}}
                                    tableAlertOptionRender={onIpute}
                                />
                            </Modal>
                            <ProTable
                                toolBarRender={false}
                                search={false}
                                rowKey="spuId"
                                columns={columns3}
                                dataSource={goods}
                                style={{display:loading?'none':'block'}}
                            />
                           </>
                       }
                       </>
                    :null
                }
                {
                    position==3||(parseInt(id)==id)&&DetailList.data?.goodsType==3?
                        <>
                        {
                            (parseInt(id)==id)?
                            <ProTable
                                toolBarRender={false}
                                search={false}
                                rowKey="spuId"
                                columns={columns2}
                                params={{
                                    gcParentId:DetailList.data?.classId
                                }}
                                request={classList}
                            />:
                            <>
                            <ModalForm
                                title="选择品类"
                                trigger={<Button className={styles.popupBtn} type="primary" onClick={onCate}>选择品类</Button>}
                                submitter={{
                                render: (props, defaultDoms) => {
                                    return [
                                    ...defaultDoms
                                    ];
                                },
                                }}
                                style={{display:flag?'block':'none'}}
                                onFinish={async (values) => {
                                console.log('values',values);
                                dispatch({
                                    type:'UseScopeList/fetchLookUnit',
                                    payload:{
                                        unit:values.unit
                                    }
                                })
                                setCates([
                                    {
                                        key: values.unit,
                                        unit: onselect.filter(ele=>(
                                            ele.value==values.unit
                                        ))[0].label
                                    }
                                    ])
                                    console.log('cates',cates)
                                setFlag(false)
                                message.success('提交成功');
                                return true;
                                }}
                            >
                                <ProFormSelect
                                    name="unit"
                                    options = {onselect}
                                    placeholder="美妆个护"
                                />
                            </ModalForm>

                            <ProTable
                                search={false}
                                toolBarRender={false}
                                columns={columns2}
                                dataSource={cates}
                                style={{display:flag?'none':'block'}}
                            />
                            </>
                        }
                        </>
                    :null
                }

            <ProFormRadio.Group
                name="memberType"
                label="可用人群"
                options={[
                  {
                    label: '全部会员',
                    value: 1,
                  },
                  {
                    label: '新会员',
                    value: 2,
                  }
                ]}
              />
            </Form.Item>
        </div>
    )
}
export default connect(({ DetailList,UseScopeList}) => ({
    UseScopeList,
    DetailList
  }))(useSecond);