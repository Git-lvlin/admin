import { useRef, useState, useEffect } from 'react'
import { Space, Tooltip, Image } from 'antd'
import ProCard from '@ant-design/pro-card'

import type { ActionType, ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import PageContainer from '@/components/PageContainer'
import styles from './styles.less'
import ProTable from '@/components/pro-table'
import { advPositionPage, advTypePage } from '@/services/cms/ads-management'
import AdsConfig from './ads-config'
import Edit from './edit'
import UpdateHistory from './update-history'
import TripartiteAdvertisingDataStatistics from './tripartite-advertising-data-statistics'
import Export from '@/components/export'

const AdsManagement: React.FC = () => {
  const [type, setType] = useState<string | undefined>()
  const [data, setData] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [adType, setAdType] = useState<string | undefined>()
  const [adName, setAdName] = useState<string | undefined>()
  const [code, setCode] = useState<string | undefined>()
  const [adsConfigVisible, setAdsConfigVisible] = useState(false)
  const [updateHistoryVisible, setUpdateHistoryVisible] = useState(false)
  const [statisticsVisible, setStatisticsVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const actRef = useRef<ActionType>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    advTypePage().then(res => {
      if(res.code === 0) {
        setData(res.data.records)
      }
    })
  }, [])

  const columns: ProColumns[] = [
    {
      dataIndex: 'kwd',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入广告位前端位置'
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '前端位置',
      dataIndex: 'title',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.thumb) {
          return (
            <Tooltip title={<Image src={r.thumb} width={80}/>}>
              <a>{r.title}</a>
            </Tooltip>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '广告类型',
      dataIndex: 'adTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '间隔展示最短时间',
      dataIndex: 'intervalDisplay',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.intervalDisplay) {
          return <span>{_}秒</span>
        } else {
          return _
        }
      }
    },
    {
      title: '每人每日最多展示',
      dataIndex: 'maxPerPersonPerDay',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.maxPerPersonPerDay) {
          return <span>{_}次</span>
        } else {
          return _
        }
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '展示状态',
      dataIndex: 'switchDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '最近操作人',
      dataIndex: 'optAdminName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '最近操作时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      render: (_, r) => (
        <a
          onClick={()=> {
            setEditVisible(true);
            setAdType(r.adType)
            setAdName(r.title)
            setCode(r.code)
            setDataSource(r)
          }}
        >
          编辑
        </a>
      )
    }
  ]

  return (
    <PageContainer>
       <div className={styles.header}>
        <div className={styles.title}>配置</div>
        <Space>
          <a onClick={()=>{setStatisticsVisible(true)}}>数据统计</a>
          <a onClick={()=>{setUpdateHistoryVisible(true)}}>更新历史</a>
        </Space>
      </div>
      <ProCard 
        className={styles.cardList} 
        gutter={[{xs: 8, sm: 16, md: 24}]}
        wrap
      >
        {
          data.map((res: any) => {
            return (
              <ProCard
                title={<a onClick={()=> setType(res?.adType)}>{res?.title}</a>}
                bordered
                headerBordered
                split='vertical'
                key={res.id}
                colSpan={`${(100 / data.length)}%`}
              >
                <ProCard colSpan='50%'>
                  <div style={{ height: 20, width: '120px' }}>广告位：{res.count}</div>
                </ProCard>
                <ProCard colSpan='50%'>
                  <a style={{ height: 20 }} onClick={()=> {setAdType(res.adType); setAdsConfigVisible(true)}}>配置</a>
                </ProCard>
              </ProCard>
            )
          })
        }
      </ProCard>
      <div className={styles.header}>
        <div className={styles.title}>明细</div>
      </div>
      <ProTable
        rowKey='id'
        params={{adType: type}}
        request={advPositionPage}
        actionRef={actRef}
        options={false}
        formRef={form}
        onReset={()=> {setType(undefined)}}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export 
              type='export_advposition_page'
              key='1'
              conditions={{...form.current?.getFieldsValue(), adType: type}}
            />
          ]
        }}
        columns={columns}
      />
      {
        adsConfigVisible &&
        <AdsConfig
          visible={adsConfigVisible}
          setVisible={setAdsConfigVisible}
          callback={()=> actRef.current?.reload()}
          type={adType}
        />
      }
      {
        editVisible &&
        <Edit 
          visible={editVisible}
          setVisible={setEditVisible}
          callback={()=> actRef.current?.reload()}
          type={adType}
          adName={adName}
          code={code}
          data={dataSource}
        />
      }
      {
        updateHistoryVisible &&
        <UpdateHistory
          visible={updateHistoryVisible}
          setVisible={setUpdateHistoryVisible}
        />
      }
      {
        statisticsVisible &&
        <TripartiteAdvertisingDataStatistics 
          visible={statisticsVisible}
          setVisible={setStatisticsVisible}
        />
      }
    </PageContainer>
  )
}

export default AdsManagement