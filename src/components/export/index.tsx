import { useEffect, useRef, useState } from 'react'
import { createExportTask } from '@/services/export-excel/export-template'
import { 
  Button, 
  Tooltip, 
  Form, 
  Space, 
  Spin, 
  Empty,
  Progress,
  Drawer,
  message,
} from 'antd'
import Pagination from '@/components/pagination'
import ProForm, { ModalForm } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'

import type { FC } from "react"
import type { FormInstance } from "antd"
import type { 
  ExprotProps,
  ExportHistoryProps, 
  ExprotStateProps,
  DataProps 
} from "./data"

import { findByWays, cancelTask } from '@/services/export-excel/export-template'
import moment from 'moment'
import styles from './styles.less'
import { paramsEmptyFilter } from '@/utils/utils'
import TimeSelect from '@/components/time-select'

const ExportHistory: FC<ExportHistoryProps> = ({ show, setShow, type, slot, placement }) => {
  const [form] = Form.useForm()
  const [load, setLoad] = useState(false)
  const [pageTotal, setPageTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<DataProps[]>([])
  const [query, setQuery] = useState(0)
  const timer = useRef<number>()
  const timeOut = useRef<number>()
  const awaitTime = 3 * 60 * 1000   //TimeOut await times

  const pageChange = (a: number, b: number) => {
    clearInterval(timer.current)
    setPage(a)
    setPageSize(b)
  }
  const getData = ()=> {
    const { time, ...rest } = form.getFieldsValue()
    const user = localStorage.getItem("user")
    const rule = user&&JSON.parse(user).id === 1
    setLoad(true)
    findByWays({
      page,
      code: type && type,
      size: pageSize,
      searchByUser: rule ? 2 : 1,
      createStartTime: time&&moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
      createEndTime: time&&moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
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
  }, [show, page, pageSize, form, query])

  useEffect(()=> {
    clearInterval(timer.current)
    if(show) {
      timer.current = window.setInterval(()=>{
        getData()
      }, 3000)
      return ()=> {
        clearInterval(timer.current)
        setData([])
      }
    } else {
      return ()=> {
        clearInterval(timer.current)
        setData([])
      }
    }
  }, [page, show])
  useEffect(()=> {
    timeOut.current = window.setTimeout(()=> {
      clearInterval(timer.current)
    }, awaitTime)
    return ()=> {
      clearTimeout(timeOut.current)
    }
  }, [show])

  const ExprotState: FC<ExprotStateProps> = ({state, desc}) => {
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
        <Tooltip title={desc} zIndex={999999999}>
          <div className={styles.fail} onMouseEnter={()=>clearInterval(timer.current)}>
            导出失败
          </div>
        </Tooltip>
      )
    } else if(state === 4) {
      return (
        <div className={styles.fail}>导出取消</div>
      )
    } else {
      return null
    }
  }
const cancelTaskCanbak=(id: number)=>{
  cancelTask({id:id}).then(res=>{
    if(res.code==0){
      message.success('操作成功')
      getData()
    }
  })
}
  return (
    <>
      <Tooltip placement={placement} key="history" title="查看历史导出任务">
        {
          slot ?
          slot(()=>{setShow(true)}):
          <Button
            type='primary'
            onClick={() => {
              setShow(true)
            }}
          >
            ···
          </Button>
        }
      </Tooltip>
      <Drawer
        title="导出任务列表"
        onClose={() => {
          setShow(false)
        }}
        width={1000}
        visible={show}
        forceRender={true}
        destroyOnClose={true}
        zIndex={1001}
      >
        <ProForm<FormInstance>
          layout="inline"
          form={form}
          onFinish={async () => {
            setPage(1)
            setQuery(query + 1)
            return true
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
          <ProForm.Item
            name="time"
            label="导出时间"
          >
            <TimeSelect />
          </ProForm.Item>
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
                  <div className={styles.exportName}>导出人：{item.createName}</div>
                  {
                    item?.state===2?
                    <a href={item.fileUrl}>下载</a> :
                    <div className={styles.progress}>
                      {
                        item?.state===1&&<a className={styles.cancel_task} onClick={()=>{cancelTaskCanbak(item.id)}}>取消任务</a>
                      }
                      {
                        item.process!==100&&<Progress percent={item.process} size="small" />
                      }
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

const Export: FC<ExprotProps> = ({ type, conditions, text='导出', slot, slotHistory, fileName, placement, callback }) => {
  const [visible, setVisible] = useState(false)

  const downExcel = () => {
    let data
    const down = window.localStorage.getItem('user') as string
    const user = JSON.parse(down)
    let str = {
      operatorId: user.id,
      operatorType: 2
    };
    if (typeof conditions === 'function') {
      data = JSON.stringify(paramsEmptyFilter({
        ...conditions(),
        ...str,
      }))
    } else {
      data = JSON.stringify(paramsEmptyFilter({
        ...conditions,
        ...str,
      }))
    }

    const name = fileName ? fileName + '.xlsx' : type + +new Date() + '.xlsx'
    createExportTask({
      code: type,
      fileName: name,
      queryParamStr: data
    }).then(res => {
      if (res?.success) {
        message.success('导出任务创建成功')
        setVisible(true)
        callback?.()
      }
    })
  }

  return (
    <Space size='small'>
      <ModalForm
        title={'导出规则'}
        trigger={
          !slot?
          <Button type="primary">{text}</Button>:
          slot
        }
        width={500}
        submitter={{
          searchConfig: {
            submitText: '创建导出任务',
            resetText: '取消'
          }
        }}
        modalProps={{
          destroyOnClose: true,
          zIndex: 99999
        }}
        onFinish={async () => {
          downExcel()
          return true
        }}
      >
        <ol>
          <li>1、数据中的图片、附件只能以链接的形式导出</li>
          <li>2、每个sheet表导出的数据不超过5万条。超过5万条将分成多个sheet表</li>
          <li>3、导出后保留30天，30天后将自动删除，请及时下载。</li>
        </ol>
      </ModalForm>
      <ExportHistory 
        show={visible}
        setShow={setVisible}
        type={type}
        slot={slotHistory}
        placement={placement}
      />
    </Space>
  )
}

export { ExportHistory } 

export default Export
