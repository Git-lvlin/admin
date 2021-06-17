import React, { useRef, useState, useEffect } from 'react';
import { MinusOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Space, message, Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { priceComparsionListAlls, delContestGoods, createTaskSrc, getSpiderGoodsListByDate, sendTask} from '@/services/cms/member/member';
import Edit from './edit';
import FormPage from './form';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';

const { Search } = Input;

const PriceManagement = () => {
  const actionRef = useRef()
  const [formVisible, setFormVisible] = useState(false)
  const [grabList, setGrabList] = useState(false)
  const [formData,setFormData] = useState(false)
  const [formjsx, setFormjsx] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [flag, setFlag] = useState(false)
  const [resData, setResData] = useState({})
  const [loading, setLoading] = useState({})

  const formControl = (data) => {
    delContestGoods({id: data}).then((res) => {
      if (res.code === 0) {
        message.success(`成功`);
        actionRef.current.reset();
      }
    })
  }

  const onSearch = (value, t, i) => {
    const id = i
    const type = t
    setLoading({
      ...loading,
      [`${id}${type}`]:true
    })
    const param = {
      goodsUrl: value,
      goodsId: formData.goodsSpuId,
      type: type,
      skuId: formData.goodsSkuId,
    }
    createTaskSrc(param).then((res) => {
      if (res.code === 0) {
        sendTask().then((r) => {
          if (r.code === 0) {
            timeoutfn(param,type,id)
          } else {
            setLoading({
              ...loading,
              [`${id}${type}`]:false
            })
          }
        })
      } else {
        setLoading({
          ...loading,
          [`${id}${type}`]:false
        })
      }
    })
  };

  let timer = null
  const timeoutfn = (data,type,id) => {
    getSpiderGoodsListByDate({ sourceType:data.type, goodsId:data.goodsId })
    .then((res) => {
      if (res.code === 0 && res.data.length) {
        timer = null
        setGrabList(res.data)
        setLoading({
          ...loading,
          [`${id}${type}`]:false
        })
        return
      }
      timer = setTimeout(()=>{
        timeoutfn(data,type,id)
      }, 10000)
    })
  }

  const bindData = (id, type) => {
    setFormjsx(grabList)
    setFormData({
      ...formData,
      sourceType: type
    })
    setIsShow(true)
  }

  useEffect(() => {
    if (flag) {
      actionRef.current.reset()
      setFlag(false)
    }
  }, [flag])

  const expandedRowRender = (a) => {
    if (!formData) {
      setFormData(a)
    }
    return (
      <ProCard name={a.id} split="horizontal" bordered headerBordered style={{ marginBottom: 20 }}>
        <ProCard split="vertical" className={styles.header}>
          <ProCard colSpan="120px" className={styles.card}>比价电商平台</ProCard>
          <ProCard colSpan="120px" className={styles.card}>skuid</ProCard>
          <ProCard colSpan="120px" className={styles.card}>售卖价格</ProCard>
          <ProCard className={styles.card}>链接</ProCard>
          <ProCard colSpan="120px" className={styles.card}>操作</ProCard>
        </ProCard>
        <ProCard split="vertical" className={styles.header}>
          <ProCard colSpan="120px" className={styles.card}>淘宝</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['tb']?.sku}</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['tb']?.price}</ProCard>
          <ProCard className={styles.card}>
            <Search
              placeholder="请输入对应商品链接地址"
              allowClear
              enterButton="抓取"
              style={{
                width: "92%",
                float: 'left'
              }}
              size="middle"
              onSearch={(_) => {onSearch(_,'tb', a.id)}}
              loading={loading[`${a.id}tb`] || false}
            />
            <Button
              disabled={!grabList}
              key={a.id}
              style={{
              width: "8%",
              float: 'right'
            }} onClick={() => {
              bindData(a.id, 'tb')
            }}>绑定</Button>
          </ProCard>

        </ProCard>
        <ProCard split="vertical" className={styles.header}>
          <ProCard colSpan="120px" className={styles.card}>京东</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['jd']?.sku}</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['jd']?.price}</ProCard>
          <ProCard className={styles.card}>
            <Search
                placeholder="请输入对应商品链接地址"
                allowClear
                enterButton="抓取"
                style={{
                  width: "92%",
                  float: 'left'
                }}
                size="middle"
                onSearch={(_) => {onSearch(_,'jd')}}
                loading={loading['jd']}
              />
            <Button
              disabled={!grabList}
              key={a.id}
              style={{
              width: "8%",
              float: 'right'
            }} onClick={() => {
              bindData(a.id, 'jd')
            }}>绑定</Button>
          </ProCard>

        </ProCard>
        <ProCard split="vertical" className={styles.header}>
          <ProCard colSpan="120px" className={styles.card}>拼多多</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['pdd']?.sku}</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['pdd']?.price}</ProCard>
            <ProCard className={styles.card}>
              <Search
                  placeholder="请输入对应商品链接地址"
                  allowClear
                  enterButton="抓取"
                  size="middle"
                  style={{
                    width: "92%",
                    float: 'left'
                  }}
                  onSearch={(_) => {onSearch(_,'pdd')}}
                  loading={loading['pdd']}
                />
              <Button
                disabled={!grabList}
                key={a.id}
                style={{
                width: "8%",
                float: 'right'
              }} onClick={() => {
                bindData(a.id, 'pdd')
              }}>绑定</Button>
            </ProCard>
        </ProCard>
        <ProCard split="vertical" className={styles.header}>
          <ProCard colSpan="120px" className={styles.card}>天猫</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['tamll']?.sku}</ProCard>
          <ProCard colSpan="120px" className={styles.card}>{resData['tamll']?.price}</ProCard>
          <ProCard className={styles.card}>
            <Search
                placeholder="请输入对应商品链接地址"
                allowClear
                enterButton="抓取"
                style={{
                  width: "92%",
                  float: 'left'
                }}
                size="middle"
                onSearch={(_) => {onSearch(_,'tamll')}}
                loading={loading['tamll']}
              />
            <Button
              disabled={!grabList}
              key={a.id}
              style={{
              width: "8%",
              float: "right"
            }} onClick={() => {
              bindData(a.id, 'tamll')
            }}>绑定</Button>
          </ProCard>
        </ProCard>
      </ProCard>
    );
  };

  const columns = [
    {
      title: 'skuId',
      dataIndex: 'goodsSkuId',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '秒约价',
      dataIndex: 'goodsPrice',
      valueType: 'money',
      search: false,
    },
    {
      title: '市场价',
      dataIndex: 'goodsMarketPrice',
      valueType: 'money',
      search: false,
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      search: false,
    },
    {
      title: '销量',
      dataIndex: 'saleNum',
      search: false,
    },
    {
      title: '比价状态',
      dataIndex: 'acquire',
      valueEnum: {
        0: '未比价',
        1: '已比价',
      }
    }
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   dataIndex: 'option',
    //   render: (text, record, _, action) => {
    //     return (
    //       <>
    //         &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {}}>比价设置</a>}
    //         &nbsp;&nbsp;{record.status===1&&<a key="d" onClick={() => {formControl(record.id)}}>删除</a>}
    //       </>
    //     )
    //   }
    // },
  ]

  return (
    <PageContainer>
      <ProTable
      rowKey="id"
      columns={columns}
      expandable={{ expandedRowRender }}
      actionRef={actionRef}
      postData={(data) => {
        data.forEach(item => {
          item.goodsPrice = parseInt(item.goodsPrice/100)
          item.goodsMarketPrice = parseInt(item.goodsMarketPrice/100)
        })
        return data
      }}
      request={priceComparsionListAlls}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
          {/* <span>{`待发布: ${selectedRows.reduce(
            (pre, item) => pre + item.containers,
            0,
          )} 个`}</span>
          <span>{`已发布: ${selectedRows.reduce(
            (pre, item) => pre + item.callNumber,
            0,
          )} 个`}</span> */}
        </Space>
      )}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="数据列表"
      toolBarRender={(_,record) => [
        <Button key="button" icon={<PauseCircleOutlined />} type="primary" onClick={() => { setFormVisible(true) }}>
          添加比价商品
        </Button>,
        <Button key="button" icon={<MinusOutlined />} type="primary" onClick={() => { formControl(record.selectedRowKeys.toString()) }}>
          批量删除
        </Button>,
      ]}
      />
      {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      setFlag={setFlag}
    />}
      {isShow && <FormPage
      visible={isShow}
      setVisible={setIsShow}
      Listdata={formjsx}
      formData={formData}
      setResData={setResData}
      resData={resData}
      setFlag={setFlag}
    />}
    </PageContainer>
  )

}

export default PriceManagement