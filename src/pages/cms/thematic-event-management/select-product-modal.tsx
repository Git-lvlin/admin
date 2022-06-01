import { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import BrandSelect from '@/components/brand-select'
import GcCascader from '@/components/gc-cascader'
import { ModalForm } from '@ant-design/pro-form';
import _ from 'lodash'

export default (props) => {
    const { visible, setVisible, callback,hideAll, title = '选择活动商品',goodsSaleType, apolloConfig,keyId,detailList} = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const [keys,setKeys]=useState()
    const [goosList,setGoosList]=useState()
    const [dataList,setDataList]=useState([])
  
    const formItemLayout = {
      labelCol: { span: 6 },
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
        title: 'spuID',
        dataIndex: 'spuId',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入spuID'
        }
      },
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
        render: (_, records) => (
          <div style={{ display: 'flex' }}>
            <img width="50" height="50" src={records.imageUrl} />
            <div style={{ marginLeft: 10, wordBreak: 'break-all' }}>{_}</div>
          </div>
        )
      },
      {
        title: '供应商家ID',
        dataIndex: 'supplierId',
        valueType: 'text',
        hideInTable: true,
      },
      {
        title: '结算模式',
        dataIndex: 'settleType',
        valueType: 'select',
        hideInTable: true,
        valueEnum: {
          1: '佣金模式',
          2: '底价模式',
        },
      },
      {
        title: '商品分类',
        dataIndex: 'gcId',
        renderFormItem: () => (<GcCascader />),
        hideInTable: true,
      },
      {
        title: '商品品牌',
        dataIndex: 'brandId',
        renderFormItem: () => (<BrandSelect />),
        hideInTable: true,
      },
      {
        title: '供货价(元)',
        dataIndex: 'retailSupplyPriceDisplay',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '秒约价(元)',
        dataIndex: 'salePriceDisplay',
        valueType: 'text',
        hideInSearch: true,
  
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
        valueType: 'text',
        hideInSearch: true,
      },
    ];
  
    const onsubmit = (values) => {
      if(goosList){
        callback(goosList)
      }
      setVisible(false)
    };
    useEffect(()=>{
    //   const arr=[]
    //   keyId.map(ele=>{
    //     if(ele.skuId){
    //       arr.push(ele.skuId)
    //     }
    //   })
    //   setKeys(arr)
    },[])
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
        onFinish={async (values) => {
          await onsubmit(values);
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
            apolloConfig:apolloConfig?apolloConfig:''
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