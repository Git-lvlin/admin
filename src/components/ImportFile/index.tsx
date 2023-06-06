import { useEffect, useRef, useState } from 'react'
import ProForm, { ModalForm, ProFormDateTimeRangePicker } from '@ant-design/pro-form'
import {
  Button,
  message,
  Space,
  Tooltip,
  Form,
  Spin,
  Empty,
  Progress,
  Drawer
} from 'antd'
import Pagination from '@/components/pagination'
import ProCard from '@ant-design/pro-card'
import moment from 'moment'

import type { FC } from 'react'
import type { 
  importProps, 
  historyProps, 
  stateProps, 
  resultPorps,
  dataProps 
} from './data'

import Upload from '../upload'
import { createImportTask } from '@/services/import-file/import-file'
import { findPage } from '@/services/import-file/import-file'
import styles from './styles.less'

const ImportHistroy: FC<historyProps> = ({ visible, setVisible, code }) => {
  const [form] = Form.useForm()
  const [load, setLoad] = useState<boolean>(false)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<dataProps[]>([])
  const [query, setQuery] = useState<number>(0)
  const timer = useRef<any>()
  const timeOut = useRef<any>()
  const awaitTime: number = 3 * 60 * 1000   //TimeOut await times
  const pageChange = (a: number, b: number) => {
    clearInterval(timer.current)
    setPage(a)
    setPageSize(b)
  }
  const getData = () => {
    const { time, ...rest } = form.getFieldsValue()
    const user = localStorage.getItem("user")
    const rule = user && JSON.parse(user).id === 1
    setLoad(true)
    findPage({
      page,
      code: code,
      size: pageSize,
      searchByUser: rule ? 2 : 1,
      createStartTime: time && moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
      createEndTime: time && moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }).then(res => {
      if (res.success) {
        setData(res.data)
        setPageTotal(res.total)
      }
    }).finally(() => {
      setLoad(false)
    })
  }

  useEffect(() => {
    if (visible) {
      getData()
    }
    return () => {
      setData([])
    }
  }, [visible, page, pageSize, form, query])

  useEffect(() => {
    clearInterval(timer.current)
    if (visible) {
      timer.current = setInterval(() => {
        getData()
      }, 3000)
      return () => {
        clearInterval(timer.current)
        setData([])
      }
    }else {
      return () => {
        clearInterval(timer.current)
        setData([])
      }
    }
  }, [page, visible])
  useEffect(() => {
    timeOut.current = setTimeout(() => {
      clearInterval(timer.current)
    }, awaitTime)
    return () => {
      clearTimeout(timeOut.current)
    }
  }, [visible])

  const ImportState: FC<stateProps> = ({ state, desc }) => {
    if (state === 1) {
      return (
        <div>处理中...</div>
      )
    } else if (state === 2) {
      return (
        <div>导入成功</div>
      )
    } else if (state === 3) {
      return (
        <Tooltip key="history" title={desc}>
          <div className={styles.fail}>
            导入失败
          </div>
        </Tooltip>
      )
    } else if (state === 4) {
      return (
        <div>取消导入</div>
      )
    } else {
      return <div></div>
    }
  }
  const ImportResult: FC<resultPorps> = ({ state, failNum, href, process }) => {
    if (state === 1) {
      return (
        <div className={styles.process}>
          <Progress percent={process} size="small" />
        </div>
      )
    } else if (state !== 1 && failNum > 0) {
      return (
        href ? <a href={href} className={styles.failRes}>失败结果下载</a> : <span></span>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <>
      <Tooltip key="history" title="导入结果详情">
        <Button
          type='primary'
          onClick={() => {
            setVisible(true)
          }}
        >
          ···
        </Button>
      </Tooltip>
      <Drawer
        title="结果列表"
        onClose={() => {
          setVisible(false)
        }}
        width={1000}
        visible={visible}
        forceRender={true}
        destroyOnClose={true}
      >
        <ProForm
          layout="inline"
          form={form}
          onFinish={async () => {
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
          <ProFormDateTimeRangePicker
            name="time"
            label="导入时间"
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
                  <div className={styles.tag}>执行数：<span className={styles.no}>{item.count}</span></div>
                  <div className={styles.tag}>成功数：<span className={styles.no}>{item.processCount}</span></div>
                  <div className={styles.tag}>失败数：<span className={styles.no}>{item.errorCount}</span></div>
                  <ImportState state={item.state} desc={item.exceptionDes} />
                </div>
                <div className={styles.footer}>
                  <div className={styles.exportTime}>导入时间：{item.createTime}</div>
                  <ImportResult
                    state={item.state}
                    failNum={item.errorCount}
                    href={item.errorFileUrl}
                    process={item.process}
                  />
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


const Import: FC<importProps> = ({ code, operatorSource = 2, url, title = '导入', operatorName }) => {
  const [visible, setVisible] = useState(false)

  const down = window.localStorage.getItem('user') as string
  const user = JSON.parse(down)
  const uploadExcel = (v: {fileUrl: string}) => {
    return new Promise<void>((resolve, reject) => {
      createImportTask({
        code,
        ...v,
        param: JSON.stringify({ operatorSource, operatorId: user.id, operatorName: operatorName || user.username })
      }).then(res => {
        if (res.success) {
          message.success("表格导入成功")
          setVisible(true)
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <Space size='small'>
      <ModalForm
        title="表导入"
        trigger={
          <Button type="primary">{title}</Button>
        }
        width={500}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消'
          }
        }}
        modalProps={{
          destroyOnClose: true
        }}
        onFinish={async (values: {fileUrl: string}) => {
          await uploadExcel(values)
          return true
        }}
        layout="inline"
      >
        {
          visible&&
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProForm.Item
              name="template"
              label="导入模板"
            >
              <a href={url}>点击下载导入模板</a>
            </ProForm.Item>
          </div>
        }
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ProForm.Item
            name="fileUrl"
            label="表单导入"
          >
            <Upload
              maxCount={1}
              code={206}
              accept=".xlsx,.xls"
            />
          </ProForm.Item>
        </div>
      </ModalForm>
      <ImportHistroy
        visible={visible}
        setVisible={setVisible}
        code={code}
      />
    </Space>
  )
}

export default Import