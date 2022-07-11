import { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { ModalForm } from '@ant-design/pro-form';
import _ from 'lodash'
import { amountTransform } from '@/utils/utils'

export default (props) => {
    const { visible, setVisible, callback, title = '选择活动商品',goodsSaleType,keyId,detailList} = props;
    const [keys,setKeys]=useState()
    const [goosList,setGoosList]=useState([])
    const [dataList,setDataList]=useState([])
  
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
      layout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
    };
  
  
    const columns = [
      {
        title: 'skuID',
        dataIndex: 'skuId',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入skuID'
        }
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入商品名称'
        },
      },
      {
        title: '市场价',
        dataIndex: 'marketPrice',
        valueType: 'text',
        editable:false,
        render:(_)=>{
          return amountTransform(_,'/')
        },
        hideInSearch: true,
      },
      {
        title: '销售价',
        dataIndex: 'salePrice',
        valueType: 'text',
        editable:false,
        render:(_)=>{
          return amountTransform(_,'/')
        },
        hideInSearch: true,
      },
      {
        title: '平台亏盈',
        dataIndex: 'salePriceProfitLoss',
        valueType: 'text',
        editable:false,
        render:(_)=>{
          return amountTransform(_,'/')
        },
        hideInSearch: true,
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
        valueType: 'text',
        hideInSearch: true,
      },
    ];
  
    const onsubmit = () => {
        if(goosList.length>1){
          callback(goosList)
        }
        setVisible(false)
    };
    useEffect(()=>{
      const arr=[]
      keyId?.map(ele=>{
        if(ele.skuId){
          arr.push(ele.skuId)
        }
      })
      setKeys(arr)
    },[keyId])
    const postData=(data)=>{
      dataList.push(...data)
      setDataList(dataList)
      return data
    }
  
    return (
      <ModalForm
        title={title}
        modalProps={{
        }}
        onVisibleChange={setVisible}
        visible={visible}
        width={1200}
        onFinish={async () => {
          await onsubmit();
        }}
        labelAlign="right"
        {...formItemLayout}
      >
        <ProTable
          columns={columns}
          rowKey="skuId"
          options={false}
          request={productList}
          params={{
            goodsState: 1,
            goodsVerifyState: 1,
            hasStock: 1,
            goodsSaleType:goodsSaleType?2:'',
            NSubject:1
          }}
          postData={postData}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
            ],
          }}
          pagination={{
            pageSize: 10,
          }}
          rowSelection={{
            preserveSelectedRowKeys: true,
            onChange: (_, val) => {
              const arr=[]
              _.forEach(item=>{
               const obj=[...detailList,...dataList].find(ele=>{
                 return ele.skuId==item
                })
                if(obj){
                  arr.push(obj)
                }
  
              })
              setGoosList(arr)
              setKeys(_)
            },
            selectedRowKeys:keys
        }}
        />
      </ModalForm>
    );
  };