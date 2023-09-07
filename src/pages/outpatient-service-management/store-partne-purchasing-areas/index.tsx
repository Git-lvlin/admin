import { useState, useEffect, useRef, useMemo } from 'react'
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import { amountTransform } from '@/utils/utils'
import { provideGetListByParams } from '@/services/outpatient-service-management/store-partne-purchasing-areas'
import OperationModel from './operation-model'
import { Button, InputNumber } from 'antd';
import RangeNumberInput from '@/components/range-number-input'
import { PageContainer } from '@/components/PageContainer';
import FormModel from './form-model'
import AddGoods from './add-goods'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import ImportHistory from '@/components/ImportFile/import-history'
import Import from '@/components/ImportFile/import'
import { subAccountCheck } from '@/services/product-management/product-list'
import debounce from 'lodash/debounce';
import SplitConfig from '../procurement-zone/split-config'



type ThematicEventItem={
    id: number;
    sort: number;
    spuId: number;
    skuId: number;
    orderType: number;
    actPrice: number;
    editType: number;
    storeState: number;
    buyMinNum: number;
    divideState: number;
    divideInfoList?: null;
    tPlatformGain: number;
    createTime: string;
    updateTime: string;
    deleteTime: number;
    goodsName: string;
    supplierId: number;
    retailSupplyPrice: number;
    salePrice: number;
    stockNum: number;
    goodsState: number;
    goodsImageUrl: string;
    actPriceStr: number;
    storeStateStr: string;
    divideStateStr: string;
    tPlatformGainStr: number;
    retailSupplyPriceStr: number;
    salePriceStr: number;
    goodsStateStr: string;
}

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableKeys] = useState([])
  const [msgDetail, setMsgDetail] = useState();
  const [visible, setVisible] = useState(false);
  const [goodVisible, setGoodVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [importVisit, setImportVisit] = useState(false)
  const [divideVisible, setDivideVisible] = useState(false);
  const [visit, setVisit] = useState(false)
  const [recordList,setRecordList] = useState([])
  const [falge, setFalge] = useState(false)
  const [loding, setLoding] = useState(0)
  const [time,setTime]=useState<ThematicEventItem>()
  const ref= useRef<ActionType>()
  const [oldData,setOldData] = useState()

  const handleMenuClick = (key:string, data:ThematicEventItem) => {
    if (key === '1') {
      if(!falge){
        //点编辑时触发单行可编辑状态
        setEditableKeys([data?.skuId])
        setFalge(!falge)
        setOldData(data)
      }else if(falge&&data.skuId!=editableKeys[0]){
        //另外一行触发可编辑状态
        setEditableKeys([data?.skuId])
        setOldData(data)
      }else if(falge&&data.skuId==editableKeys[0]){
        //点保存时触发弹窗
        setFormVisible(true)

        if(recordList?.length){
          setMsgDetail([oldData,data])
          return
        }
        setMsgDetail([oldData,{}])
      }
    }
    
    if (key === '2') {
      setMsgDetail({ ...data, type:key })
      setVisible(true)
    }

    if (key === '3') {
      setMsgDetail({ ...data, type:key })
      setVisible(true)
    }

    if (key === '4') {
        setMsgDetail({ ...data, type:key })
        setVisible(true)
      }
  }

  useEffect(()=>{
    const params={
       ...time
    }
    provideGetListByParams(params).then(res=>{
        if(res.code==0){
            setDataSource(res.data.map(item=>({...item,actPrice:amountTransform(item.actPrice,'/').toFixed(2)})))
        }
    })
  },[loding,time])

  const debounceFetcher = useMemo(() => {
    const loadData = (value) => {
      const { recordList, record } = value;
      const getList = (list, salePriceProfitLoss) => {
        const arr = list.map(ele=>{
          if(ele?.skuId==record?.skuId){
            return {...ele,tPlatformGain:salePriceProfitLoss}
          }else{
            return {...ele}
          }
        })
        return arr;
      }
      const params={
        operateType:1,
        skuId:record?.skuId,
        retailSupplyPrice:record?.retailSupplyPrice,
        wholesaleTaxRate:record?.wholesaleTaxRate,
        salePrice:amountTransform(record?.actPrice,'*')
      }
      subAccountCheck(params).then(res => {
        const salePriceProfitLoss = res?.data[0]?.salePriceProfitLoss;
        setDataSource(getList(recordList, salePriceProfitLoss))
      })
    };

    return debounce(loadData, 10);
  }, [dataSource]);

  const getFieldValue = (searchConfig) => {
    const { tPlatformGain, ...rest }=searchConfig.form.getFieldsValue()
    return {
      ...rest,
      tPlatformGainStart:tPlatformGain&&amountTransform(tPlatformGain.min,'*'),
      tPlatformGainEnd:tPlatformGain&&amountTransform(tPlatformGain.max,'*'),
    }
  }

  const getFieldValue2 = (searchConfig) => {
    const { tPlatformGain, ...rest }=searchConfig.form.getFieldsValue()
    return {
      ...rest,
      tPlatformGainStart:tPlatformGain&&amountTransform(tPlatformGain.min,'*'),
      tPlatformGainEnd:tPlatformGain&&amountTransform(tPlatformGain.max,'*'),
    }
  }
  

  const columns:ProColumns<ThematicEventItem>[]= [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      editable:false,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      editable:false,
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImageUrl',
      valueType: 'image',
      editable:false,
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      editable:false,
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      editable:false,
    },
    {
      title: '零售供货价(元)',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/').toFixed(2)
      },
      hideInSearch: true,
    },
    {
      title: '销售价(元)',
      dataIndex: 'salePrice',
      valueType: 'text',
      editable:false,
      render:(_)=>{
        return amountTransform(_,'/').toFixed(2)
      },
      hideInSearch: true,
    },
    {
      title: '门店价(元)',
      dataIndex: 'actPrice',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_,{ record }) => {
        return  <InputNumber
                  min="0"
                  precision='2'
                  stringMode
                  onBlur={() => { debounceFetcher({ record, recordList: dataSource })}}
                />
        },
    },
    {
      title: '发票税率',
      dataIndex: 'wholesaleTaxRate',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '平台盈亏(元)',
      dataIndex: 'tPlatformGain',
      valueType: 'text',
      editable:false,
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>
    },
    {
      title: '平台盈亏(元)',
      dataIndex: 'tPlatformGain',
      valueType: 'text',
      editable:false,
      render:(_,data)=>{
        if(parseFloat(_)>0){
          return <span style={{ color:'#14C100' }}>{amountTransform(_,'/').toFixed(2)}</span> 
        }else{
          return <span style={{ color:'red' }}>{amountTransform(_,'/').toFixed(2)}</span>
        }
      },
      hideInSearch: true
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      editable:false,
      hideInSearch: true
    },
    {
      title: '起订数量',
      dataIndex: 'buyMinNum',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_,r) => {
        return  <InputNumber
                  min="1"
                  max={_?.entry?.stockNum}
                  stringMode
                />
        },
    },
    {
      title: '分成配置状态',
      dataIndex: 'divideState',
      valueType: 'text',
      editable:false,
      valueEnum:{
        1: '已配置',
        0: '未配置'
      },
      hideInTable: true
    },
    {
      title: '分成配置状态',
      dataIndex: 'divideState',
      valueType: 'text',
      editable:false,
      hideInSearch: true,
      render: (_,data) => {
        if(_==1){
          return <span style={{ color:'#14C100' }}>已配置</span>
        }else{
          return <a onClick={()=>{ setDivideVisible(true); setMsgDetail(data) }}>未配置（点击配置）</a>
        }
      }
    },
    {
      title: '门店上架状态',
      dataIndex: 'storeState',
      valueType: 'text',
      editable:false,
      valueEnum:{
        1: '上架中',
        0: '已下架'
      },
      hideInTable: true
    },
    {
      title: '店铺上架状态',
      dataIndex: 'storeState',
      valueType: 'text',
      editable:false,
      hideInSearch: true,
      valueEnum:{
        1: <span style={{ color:'#14C100' }}>上架中</span>,
        0: <span style={{ color:'red' }}>已下架</span>
      }
    },
    {
      title: '商品状态',
      dataIndex: 'goodsState',
      valueType: 'text',
      editable:false,
      valueEnum:{
        1: <span style={{ color:'#14C100' }}>上架中</span>,
        0: <span style={{ color:'red' }}>已下架</span>
      },
      hideInSearch: true
    },
    {
      title: '显示序号',
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_,r) => {
        return  <InputNumber
                  min="0"
                  stringMode
                />
        },
    },   
    {
      title: '操作',
      valueType: 'text',
      editable:false,
      width: 200,
      render: (_:string, data:ThematicEventItem) => [
        <a key="1" onClick={()=>{ handleMenuClick ('1',data) }}>{falge&&data.skuId==editableKeys[0]?'保存':'编辑'}&nbsp;&nbsp;</a>,
        <span key='option'>
        {
            data.id!=0&&<>
                <a key="2" onClick={()=>{ handleMenuClick ('2',data) }}>{data?.storeState?'从店铺下架':'从店铺上架'}<br/></a>
                <a key="3" onClick={()=>{ handleMenuClick ('3',data) }}>删除&nbsp;&nbsp;</a>
                <a key="4" onClick={()=>{ handleMenuClick ('4',data) }}>置顶</a>
            </>
        }
        </span>,
      ],
      hideInSearch: true
    },  
  ];
  return (
    <PageContainer>
        <EditableProTable<ThematicEventItem>
          actionRef={ref}
          rowKey="skuId"
          options={false}
          value={dataSource}
          // request={provideGetListByParams}
          recordCreatorProps={false}
          columns={columns}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
              setRecordList(recordList)
              setDataSource(recordList)
            },
          }}
          controlled
          onSubmit={(val)=>{
            setTime(val)
          }}
          onReset={()=>{
            setTime(undefined)
          }}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button key='select' onClick={()=>{setGoodVisible(true)}} type='primary'>选择商品</Button>,
              <Export
              key='export'
              change={(e) => { setVisit(e) }}
              type={'goods-provide-output'}
              conditions={()=>{return getFieldValue(searchConfig)}}
             />,
             <ExportHistory key='task' show={visit} setShow={setVisit} type={'goods-provide-output'}/>
            ],
          }}
          toolBarRender={()=>[
            <Button key='allDele' type='primary'><a href='https://uat-yeahgo.oss-cn-shenzhen.aliyuncs.com/file/template/goods-provide-input.xlsx'>下载导入商品模板</a></Button>,
            <Import
             change={(e) => { 
              setImportVisit(e)
              ref.current?.reload()
             }}
             key='import'
             code="goods-provide-input"
             conditions={getFieldValue2}
            />,
            <ImportHistory key='importhist' show={importVisit} setShow={setImportVisit} type="goods-provide-input" />,
          ]}
          tableAlertRender={false}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
      {
        goodVisible&&
        <AddGoods
          visible={goodVisible}
          setVisible={setGoodVisible}
          onClose={()=>{ setLoding(loding+1); }}
          callback={(row)=>{ 
            try {
              const data=dataSource.concat(row)
             setDataSource(data); 
            } catch (error) {
              console.log('error',error)
            }
            }}
          dataSource={dataSource}
        />
      }
       {
        divideVisible &&
        <SplitConfig
          visible={divideVisible}
          setVisible={setDivideVisible}
          meta={msgDetail}
          callback={()=> { setLoding(loding+1); }}
        />
      }
      {visible && <OperationModel    
        visible={visible}
        setVisible={setVisible}
        msgDetail={msgDetail}
        callback={()=>{ setLoding(loding+1); }}
        onClose={()=>{ }}
      />}
       {formVisible && <FormModel
        visible={formVisible}
        setVisible={setFormVisible}
        msgDetail={msgDetail}
        callback={(data)=>{ 
          setFalge(false); 
          setEditableKeys([]); 
          const newData=dataSource.map(item=>{
            if(item.skuId==data.skuId){
              return {...item,...data}
            }
            return item
           }) 
          setDataSource(newData)
      }}
        onClose={()=>{  
          setFalge(false);
          setEditableKeys([]);
          const newData=dataSource.map(item=>{
            if(item.skuId==oldData.skuId){
              return {...item,...oldData}
            }
            return item
           }) 
           setDataSource(newData)
        }}
      />}
  </PageContainer>
  )
}
