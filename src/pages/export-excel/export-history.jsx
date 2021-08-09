import React,{ useEffect, useRef, useState } from 'react'
import { 
  Button, 
  Tooltip, 
  Form, 
  Space, 
  Pagination, 
  Spin, 
  Empty,
  Progress,
  Drawer
} from 'antd'
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'

import { findByWays } from '@/services/export-excel/export-template'
import styles from './styles.less'

const ExportHistory = ({ show, setShow }) => {
  const [form] = Form.useForm()
  const [load, setLoad] = useState(false)
  const [pageTotal, setPageTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [query, setQuery] = useState(0)
  const timer = useRef()
  const pageChange = (a, b) => {
    clearInterval(timer.current)
    setPage(a)
    setPageSize(b)
  }
  const getData = ()=> {
    const { time, ...rest } = form.getFieldsValue()
    setLoad(true)
    findByWays({
      page,
      size: pageSize,
      // TODO:时间筛选
      ...rest
    }).then(res => {
      if (res.success) {
        setData(res.data)
        setPageTotal(res.total)
      }
    }).finally(()=>{
      setLoad(false)
    })
  }

  useEffect(() => {
    if(show) {
      getData()
    }
    return ()=> {
      setData([])
    }
  }, [show, page, pageSize, form, query])

  useEffect(()=> {
    clearInterval(timer.current)
    if(show) {
      timer.current = setInterval(()=>{
        getData()
      }, 3000)
      return ()=> {
        clearInterval(timer.current)
        setData([])
      }
    }
  }, [page, show])
  const ExprotState = ({state, desc})=> {
    if(state === 1) {
      return (
        <div>导出中...</div>
      )
    } else if(state === 2) {
      return (
        <div>导出成功</div>
      )
    } else if(state === 3) {
      return (
        <Tooltip key="history" title={desc}>
          <div className={styles.fail}>
            导出失败
          </div>
        </Tooltip>
      )
    } else if(state === 4) {
      return (
        <div>导出取消</div>
      )
    } else {
      return ''
    }
  }

  return (
    <>
      <Tooltip key="history" title="查看历史导出任务">
        <Button
          type='primary'
          onClick={() => {
            setShow(true)
          }}
        >
          ···
        </Button>
      </Tooltip>
      <Drawer
        title="导出任务列表"
        layout="inline"
        onClose={() => {
          setShow(false)
        }}
        form={form}
        width={1000}
        visible={show}
        forceRender={true}
        destroyOnClose={true}
      >
        <ProForm
          layout="inline"
          form={form}
          onFinish={() => {
            setPage(1)
            setQuery(query + 1)
          }}
          submitter={{
            render: ({ form }) => {
              return (
                <div>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        form?.submit()
                      }}
                    >
                      查询
                    </Button>
                    <Button
                      onClick={() => {
                        form?.resetFields()
                      }}
                    >
                      重置
                    </Button>
                    <Button
                      onClick={() => {
                        setQuery(query + 1)
                      }}
                    >
                      刷新
                    </Button>
                  </Space>
                </div>
              )
            }
          }}
        >
          <ProFormDateRangePicker
            name="time"
            label="导出时间"
          />
        </ProForm>
        <Spin delay={500} spinning={load}>
          {
            data.length === 0 &&
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
          {
            data.map(item => (
              <ProCard
                key={item.id}
                bordered
                className={styles.card}
              >
                <div className={styles.content}>
                  <div className={styles.tag}>导出编号：<span className={styles.no}>{item.id}</span></div>
                  <ExprotState state={item?.state} desc={item.exceptionDes}/>
                </div>
                <div className={styles.footer}>
                  <div className={styles.exportTime}>导出时间：{item.createTime}</div>
                  {
                    item.process === 100 ?
                      <a href={item.fileUrl}>下载</a> :
                      <div style={{ width: 170 }}>
                        <Progress percent={item.process} size="small" />
                      </div>
                  }
                </div>
              </ProCard>
            ))
          }
        </Spin>
        <div className={styles.pagination}>
          <Pagination
            total={pageTotal}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
            pageSize={pageSize}
            current={page}
            onChange={pageChange}
          />
        </div>
      </Drawer>
    </>
  )
}

export default ExportHistory