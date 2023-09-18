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
import type { ThematicEventItem, SearchConfig } from './data'

export default () => {
  const [dataSource, setDataSource] = useState<ThematicEventItem[]>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
  const [msgDetail, setMsgDetail] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [goodVisible, setGoodVisible] = useState<boolean>(false);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [importVisit, setImportVisit] = useState<boolean>(false)
  const [divideVisible, setDivideVisible] = useState<boolean>(false);
  const [visit, setVisit] = useState<boolean>(false)
  const [falge, setFalge] = useState<boolean>(false)
  const [loding, setLoding] = useState<number>(0)
  const [time, setTime] = useState<ThematicEventItem>()
  const ref = useRef<ActionType>()
  const [oldData, setOldData] = useState<ThematicEventItem>()
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)

  const handleMenuClick = (key: string, data: ThematicEventItem) => {
    if (key === '1') {
      if (!falge || data.skuId !== editableKeys[0]) {
        // 点击编辑时触发单行可编辑状态
        setEditableKeys([data?.skuId]);
        setOldData(data);
        setFalge(true);
      } else {
        // 点击保存时触发弹窗
        setFormVisible(true);
        setMsgDetail([oldData, data]);
      }
    }

    if (key === '2' || key === '3' || key === '4') {
      // 点击2、3、4时设置消息详情并显示
      setMsgDetail({ ...data, type: key });
      setVisible(true);
    }
  }


  useEffect(() => {
    const params = {
      ...time,
      pageSize: 9999,
    }
    provideGetListByParams(params).then(res => {
      if (res.code == 0) {
        setDataSource(res.data.map((item: { actPrice: number; }) => ({ ...item, actPrice: amountTransform(item.actPrice, '/').toFixed(2) })))
        setPageTotal(res.total)
      }
    })
  }, [loding, time])

  const debounceFetcher = useMemo(() => {
    // 定义数据加载函数
    const loadData = async (value: { recordList: ThematicEventItem[]; record: ThematicEventItem; }) => {
      const { recordList, record } = value;

      // 定义用于处理列表的函数
      const getList = (list: ThematicEventItem[], salePriceProfitLoss: number) => {
        return list.map((ele: ThematicEventItem) => {
          if (ele?.skuId === record?.skuId) {
            return { ...ele, tPlatformGain: salePriceProfitLoss };
          } else {
            return { ...ele };
          }
        });
      };

      // 构建请求参数
      const params = {
        operateType: 1,
        skuId: record?.skuId,
        retailSupplyPrice: record?.retailSupplyPrice,
        wholesaleTaxRate: record?.wholesaleTaxRate,
        salePrice: amountTransform(record?.actPrice, '*'),
      };

      try {
        // 发起异步请求并获取结果
        const res = await subAccountCheck(params);
        const salePriceProfitLoss = res?.data[0]?.salePriceProfitLoss;

        // 更新数据源
        setDataSource(getList(recordList, salePriceProfitLoss));
      } catch (error) {
        console.error('数据加载失败', error);
      }
    };

    // 返回使用防抖函数包装的数据加载函数
    return debounce(loadData, 10);
  }, [dataSource]);


  const getFieldValue = (searchConfig: SearchConfig) => {
    const { tPlatformGain, ...rest } = searchConfig.form.getFieldsValue()
    return {
      ...rest,
      tPlatformGainStart: tPlatformGain && amountTransform(tPlatformGain.min, '*'),
      tPlatformGainEnd: tPlatformGain && amountTransform(tPlatformGain.max, '*'),
    }
  }

  const getFieldValue2 = (searchConfig: SearchConfig) => {
    const { tPlatformGain, ...rest } = searchConfig.form.getFieldsValue()
    return {
      ...rest,
      tPlatformGainStart: tPlatformGain && amountTransform(tPlatformGain.min, '*'),
      tPlatformGainEnd: tPlatformGain && amountTransform(tPlatformGain.max, '*'),
    }
  }

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }


  const columns: ProColumns<ThematicEventItem>[] = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      editable: false,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      editable: false,
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImageUrl',
      valueType: 'image',
      editable: false,
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      editable: false,
    },
    {
      title: '商品状态',
      dataIndex: 'goodsState',
      valueType: 'text',
      editable: false,
      valueEnum: {
        1: '上架中',
        0: '已下架'
      },
      hideInTable: true
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      editable: false,
    },
    {
      title: '零售供货价(元)',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      editable: false,
      render: (_) => {
        return amountTransform(_, '/').toFixed(2)
      },
      hideInSearch: true,
    },
    {
      title: '销售价(元)',
      dataIndex: 'salePrice',
      valueType: 'text',
      editable: false,
      render: (_) => {
        return amountTransform(_, '/').toFixed(2)
      },
      hideInSearch: true,
    },
    {
      title: '门店价(元)',
      dataIndex: 'actPrice',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_, { record }) => {
        return <InputNumber
          min="0"
          precision={2}
          stringMode
          onBlur={() => { debounceFetcher({ record, recordList: dataSource }) }}
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
      editable: false,
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额' />
    },
    {
      title: '平台盈亏(元)',
      dataIndex: 'tPlatformGain',
      valueType: 'text',
      editable: false,
      render: (value: number) => (
        <span style={{ color: value > 0 ? '#14C100' : 'red' }}>
          {amountTransform(value, '/').toFixed(2)}
        </span>
      ),
      hideInSearch: true
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      editable: false,
      hideInSearch: true
    },
    {
      title: '起订数量',
      dataIndex: 'buyMinNum',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_) => {
        return <InputNumber
          min="1"
          max={_?.entry?.stockNum}
          stringMode
        />
      },
    },
    {
      title: '加购数',
      dataIndex: 'batchNumber',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_) => {
        return <InputNumber
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
      editable: false,
      valueEnum: {
        1: '已配置',
        0: '未配置'
      },
      hideInTable: true
    },
    {
      title: '分成配置状态',
      dataIndex: 'divideState',
      valueType: 'text',
      editable: false,
      hideInSearch: true,
      render: (_, data) => {
        if (_ == 1 && data.actPrice) {
          return <a onClick={() => { setDivideVisible(true); setMsgDetail(data) }}>已配置</a>
        } else if (_ == 0 && data.actPrice) {
          return <a onClick={() => { setDivideVisible(true); setMsgDetail(data) }}><span style={{ color: 'red' }} >未配置</span>（点击配置）</a>
        } else {
          return ''
        }
      }
    },
    {
      title: '门店上架状态',
      dataIndex: 'storeState',
      valueType: 'text',
      editable: false,
      valueEnum: {
        1: '上架中',
        0: '已下架'
      },
      hideInTable: true
    },
    {
      title: '店铺上架状态',
      dataIndex: 'storeState',
      valueType: 'text',
      editable: false,
      hideInSearch: true,
      valueEnum: {
        1: <span style={{ color: '#14C100' }}>上架中</span>,
        0: <span style={{ color: 'red' }}>已下架</span>
      }
    },
    {
      title: '商品状态',
      dataIndex: 'goodsState',
      valueType: 'text',
      editable: false,
      valueEnum: {
        1: <span style={{ color: '#14C100' }}>上架中</span>,
        0: <span style={{ color: 'red' }}>已下架</span>
      },
      hideInSearch: true
    },
    {
      title: '显示序号',
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_, r) => {
        return <InputNumber
          min="0"
          stringMode
        />
      },
    },
    {
      title: '操作',
      valueType: 'text',
      editable: false,
      width: 200,
      render: (_: string, data: ThematicEventItem) => [
        <span key='edit'>
          {data.editType != 0 && <a key="1" onClick={() => { handleMenuClick('1', data) }}>{falge && data.skuId == editableKeys[0] ? '保存' : '编辑'}&nbsp;&nbsp;</a>}
        </span>,
        <span key='option'>
          {
            data.id != 0 && <>
              <a key="2" onClick={() => { handleMenuClick('2', data) }}>{data?.storeState ? '从店铺下架' : '从店铺上架'}<br /></a>
              <a key="3" onClick={() => { handleMenuClick('3', data) }}>删除&nbsp;&nbsp;</a>
              <a key="4" onClick={() => { handleMenuClick('4', data) }}>置顶</a>
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
        recordCreatorProps={false}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
          },
        }}
        controlled
        onSubmit={(val) => {
          setTime(val)
        }}
        onReset={() => {
          setTime(undefined)
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button key='select' onClick={() => { setGoodVisible(true) }} type='primary'>选择商品</Button>,
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={'goods-provide-output'}
              conditions={() => { return getFieldValue(searchConfig) }}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'goods-provide-output'} />
          ],
        }}
        toolBarRender={() => [
          <Button key='allDele' type='primary'><a href='https://uat-yeahgo.oss-cn-shenzhen.aliyuncs.com/file/template/goods-provide-input.xlsx'>下载导入商品模板</a></Button>,
          <Import
            change={(e: boolean | ((prevState: boolean) => boolean)) => {
              setImportVisit(e)
              ref.current?.reload()
            }}
            key='import'
            code="goods-provide-input"
            conditions={getFieldValue2}
            title="导入商品"
          />,
          <ImportHistory key='importhist' show={importVisit} setShow={setImportVisit} type="goods-provide-input" />,
        ]}
        tableAlertRender={false}
        pagination={{
          pageSize: pageSize,
          current: page,
          showQuickJumper: true,
          total: pageTotal,
          onChange: pageChange
        }}
      />
      {
        goodVisible &&
        <AddGoods
          visible={goodVisible}
          setVisible={setGoodVisible}
          onClose={() => { setLoding(loding + 1); }}
          callback={(row) => {
            try {
              setPageTotal(pageTotal + row.length)
              setDataSource([...row, ...dataSource]);
            } catch (error) {
              console.log('error', error)
            }
          }}
          dataSource={dataSource}
        />
      }

      {divideVisible && <SplitConfig
        visible={divideVisible}
        setVisible={setDivideVisible}
        meta={msgDetail}
        callback={() => { 
            const newData = dataSource?.map(item => {
            if (item.skuId == msgDetail.skuId) {
              return { ...item, divideState: 1 }
            }
            return item
          })
          setDataSource(newData)
         }}
      />}

      {visible && <OperationModel
        visible={visible}
        setVisible={setVisible}
        msgDetail={msgDetail}
        callback={() => { setLoding(loding + 1); }}
        onClose={() => { }}
      />}

      {formVisible && <FormModel
        visible={formVisible}
        setVisible={setFormVisible}
        msgDetail={msgDetail}
        callback={(data) => {
          setFalge(false);
          setEditableKeys([]);
          const newData = dataSource?.map(item => {
            if (item.skuId == data.skuId) {
              return { ...item, ...{ ...data, actPrice: amountTransform(data.actPrice, '/').toFixed(2), actPriceStr: amountTransform(data.actPrice, '/').toFixed(2)  } }
            }
            return item
          })
          setDataSource(newData)
        }}
        onClose={() => {
          setFalge(false);
          setEditableKeys([]);
          const newData = dataSource?.map(item => {
            if (item.skuId == oldData?.skuId) {
              return { ...item, ...oldData }
            }
            return item
          })
          setDataSource(newData)
        }}
      />}
      
    </PageContainer>
  )
}
