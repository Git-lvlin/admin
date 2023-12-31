
import React, { useState, useEffect } from 'react';
import { Button, Form, Space, Spin } from 'antd';
import Pagination from '@/components/pagination'
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@/components/PageContainer';
import Edit from './form';
import Reason from './reason';
import { posterListNew, posterUpData } from '@/services/cms/member/member';
import styles from './style.less';

const NewPoster = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [pageTotal, setPageTotal] = useState(0)
  const [formVisible, setFormVisible] = useState(false);
  const [formVisibleReason, setFormVisibleReason] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [reasonData, setReasonData] = useState(false);
  const [search, setSearch] = useState(0)
  const [num, setNum] = useState(0)
  const getDetail = () => {
    setFormVisible(true);
  }

  const pageChange = (a, b) => {
    setPage(a)
    setPageSize(b)
  }

  const getFieldValue = () => {
    const { ...rest } = form.getFieldsValue();
    return {
      ...rest,
    }
  }

  const upDown = ({state, ...rest}) => {

    if (state) {
      setReasonData({state, ...rest})
      setFormVisibleReason(true)
      return
    }
    const param = {
      ...rest,
      state: 1,
    }
    posterUpData(param).then(res => {
      if (res.code === 0) {
        setRefresh(!refresh)
      }
    })
  }

  const setStateNum = (resData) => {
    const len = resData.length
    let number = 0
    for(let i=0;i<len;i++) {
      if (resData[i].state === 1) {
        number += 1
      }
    }
    setNum(number)
  }

  useEffect(() => {
    setLoading(true);
    posterListNew({
      page,
      size: pageSize,
      version: 2,
      ...getFieldValue(),
    })
      .then(res => {
        if (res.code === 0) {
          const resData = res.data;
          setData(resData.records)
          setPageTotal(resData.total)
          setStateNum(resData.records)
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [page, pageSize, form, refresh, search])

  return (
    <PageContainer>
      <ProForm
        form={form}
        style={{ backgroundColor: '#fff', padding: 20, paddingLeft: 42 }}
        layout="inline"
        onFinish={() => {
          setPage(1)
          setSearch(search + 1)
        }}
        submitter={{
          render: ({ form }, doms) => {
            return (
              <div>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      form?.submit();
                    }}
                  >
                    查询
                  </Button>
                  <Button
                    onClick={() => {
                      form?.resetFields();
                    }}
                  >
                    重置
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      getDetail()
                    }}
                  >
                    上传
                  </Button>
                </Space>
              </div>
            );
          },
        }}
      >
        <ProFormText
          name="title"
          label="名称"
        />
        <ProFormSelect
          label="状态"
          name="state"
          options={[
            {
              value: 0,
              label: '下架'
            },
            {
              value: 1,
              label: '上架'
            }
          ]}
        />
      </ProForm>
      <Spin spinning={loading}>
        <div className={styles.box}>
        {
          data&&data.map((item) => 
            <span className={styles.itembox}>
              {item.bgImage&&item.bgImage.url&&<img className={styles.img} src={item.bgImage.url} />}
              <p className={styles.title}>
                <span>{item.title}</span>
                <Button onClick={() => {upDown(item)}}>{item.state?'下架':'上架'}</Button>
              </p>
              <p>
                <span>{item.updateName}于</span>
                <span>{item.updateTime}</span>
                <span>上传</span>
              </p>
              <p>
                {
                  item.state?<span className={styles.green}>已上架</span>
                  :<div>
                    <span className={styles.red}>已下架 </span> 
                    <span className={styles.text}> 下架原因：{item.offDesc}</span>
                  </div>
                }
              </p>
            </span>
          )
        }
        </div>
      </Spin>
      <Pagination
        className={styles.pagination}
        total={pageTotal}
        showTotal={(total, range) => `共 ${pageTotal} 张海报 已上架 ${num} 张`}
        pageSize={pageSize}
        current={page}
        onChange={pageChange}
      />
    {formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      detailData={detailData}
      setRefresh={setRefresh}
      refresh={refresh}
      callback={() => { setDetailData(null) }}
      onClose={() => { setDetailData(null) }}
    />}
    {formVisibleReason && <Reason
      visible={formVisibleReason}
      setVisible={setFormVisibleReason}
      detailData={reasonData}
      setRefresh={setRefresh}
      refresh={refresh}
      callback={() => { setRefresh(!refresh);setReasonData(null) }}
      onClose={() => { setReasonData(null) }}
    />}
    </PageContainer>
  );
};

export default NewPoster