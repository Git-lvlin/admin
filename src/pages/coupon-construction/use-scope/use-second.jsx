import React, { useState, useRef,useEffect } from 'react';
import { Form, Button, Modal,Select, message} from 'antd';
import { FormattedMessage } from 'umi';
import { ModalForm,ProFormSelect,ProFormRadio} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import styles from '../style.less'
import {commonSpuList}  from '@/services/coupon-construction/coupon-common-spu-list';
import {classList} from '@/services/coupon-construction/coupon-class-list'
import BrandSelect from '@/components/brand-select'
import { connect } from 'umi';
    
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
            valueType: 'image',
            hideInSearch: true,
            ellipsis:true
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
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
          dataIndex: 'gcName',
       },
       {
        title: '操作',
        valueType: 'text',
        render:(text, record, _, action)=>[
            <a onClick={()=>delType(record.id)}>删除</a>
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
            valueType: 'image',
            ellipsis:true
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
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
    // 删除品类
    const delType=id=>{
        dispatch({
            type:'UseScopeList/fetchLookUnit',
            payload:{
                unit:null
            }
        })
        dispatch({
            type:'UseScopeList/fetchLookUnitArr',
            payload:{
                unitArr:[]
            }
        })
        setFlag(true)
    }
    
    // 删除商品
    const  delGoods=val=>{
        console.log('val',val)
        console.log('spuIdsArr',UseScopeList.UseScopeObje.spuIdsArr)
        const arr = UseScopeList.UseScopeObje.spuIds.split(',')
        dispatch({
            type:'UseScopeList/fetchLookSpuIds',
            payload:{
                spuIds:arr.filter(ele=>(
                    ele!=val
                )).toString()
            }
        })
        dispatch({
            type:'UseScopeList/fetchLookSpuIdsArr',
            payload:{
                spuIdsArr:UseScopeList.UseScopeObje.spuIdsArr.filter(ele=>(
                            ele.spuId!=val
                ))
            }
        })
       
    }
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading,setLoading]=useState(true)
    const [flag,setFlag]=useState(true)
    const [spuIdsArr,setSpuIdsArr]=useState([])
    const [position,setPosition]=useState()
    const [onselect,setOnselect]=useState([])
    const [spuIds,setSpuIds]=useState('')
    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };
    useEffect(()=>{
        setTimeout(()=>{
            if(id){
                dispatch({
                    type:'UseScopeList/fetchLookSpuIds',
                    payload:{
                        spuIds:DetailList.data&&DetailList.data?.spuIds
                    }
                })
                dispatch({
                    type:'UseScopeList/fetchLookSpuIdsArr',
                    payload:{
                        spuIdsArr:DetailList.data&&DetailList.data?.spuInfo
                    }
                })
                dispatch({
                    type:'UseScopeList/fetchLookUnit',
                    payload:{
                        unit:DetailList.data&&DetailList.data?.classInfo.id
                    }
                })
                dispatch({
                    type:'UseScopeList/fetchLookUnitArr',
                    payload:{
                        unitArr:DetailList.data&&[DetailList.data?.classInfo]
                    }
                })
            }
        },1000) 
    },[])
    const handleOk = () => {
        setIsModalVisible(false);
        setLoading(false)
        dispatch({
            type:'UseScopeList/fetchLookSpuIds',
            payload:{
                spuIds
            }
        })
        dispatch({
            type:'UseScopeList/fetchLookSpuIdsArr',
            payload:{
                spuIdsArr
            }
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onIpute=(res)=>{
       setSpuIds(res.selectedRowKeys.toString())
       setSpuIdsArr(res.selectedRows)
    }
    const onCate=()=>{
        setFlag(true)
    }
    //商品分类
    useEffect(()=>{
        classList({gcParentId:0}).then(res=>{
            setOnselect(res.data.map(ele=>(
                {label:ele.gcName,value:ele.id}
            )))
        })
    },[])
    return(
        <Form.Item className={styles.unfold}>
            <ProFormRadio.Group
                name="goodsType"
                label={<FormattedMessage id="formandbasic-form.commodity"/>}
                // rules={[{ required: true, message: '请选择商品范围' }]}
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
                        <Button type="primary" className={styles.popupBtn} onClick={showModal}>
                            选择商品
                        </Button>
                        
                        <Modal key="id" width={1200}  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <ProTable
                                rowKey="id"
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
                            dataSource={UseScopeList.UseScopeObje.spuIdsArr}
                            style={{display:isModalVisible?'none':'block'}}
                        />
                    </>
                :null
            }
            {
                position==3||(parseInt(id)==id)&&DetailList.data?.goodsType==3?
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
                            dispatch({
                                type:'UseScopeList/fetchLookUnitArr',
                                payload:{
                                    unitArr:[
                                        {
                                            id: values.unit,
                                            gcName: onselect.filter(ele=>(
                                                ele.value==values.unit
                                            ))[0].label
                                        }
                                        ]
                                }
                            })
                            setFlag(false)
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
                            dataSource={UseScopeList.UseScopeObje.unitArr}
                            // style={{display:flag?'block':'none'}}
                        />
                        </>
                :null
            }
        </Form.Item>
    )
}
export default connect(({ DetailList,UseScopeList}) => ({
    UseScopeList,
    DetailList
  }))(useSecond);