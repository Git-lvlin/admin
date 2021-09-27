import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select} from 'antd';
import ProTable from '@ant-design/pro-table';
import {commonSpuList}  from '@/services/coupon-construction/coupon-common-spu-list';
import BrandSelect from '@/components/brand-select'
import { amountTransform } from '@/utils/utils'




export default (props)=>{
    const { callback }=props
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading,setLoading]=useState(true)
    const columns = [
        {
            title: 'spuID',
            dataIndex: 'spuId',
        },
        {
            title: '商品图片',
            dataIndex: 'goodsImageUrl',
            valueType: 'image',
            hideInSearch: true
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            valueType: 'text',
            ellipsis:true
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
            render: (_)=> amountTransform(_, '/').toFixed(2)
        }
    ];
    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setLoading(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                选择商品
            </Button>
            
            <Modal key="id" width={1200}  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <ProTable
                    rowKey="id"
                    options={false}
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
                    rowSelection={{
                        preserveSelectedRowKeys: true,
                        onChange: (_, val) => {
                            callback(val)
                        }
                      }}
                />
            </Modal>
        </>
    )
}