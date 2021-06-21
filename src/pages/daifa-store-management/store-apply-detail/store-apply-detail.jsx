import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Form, Spin, Tree,Button } from 'antd';
import { storeApplyDetail } from '@/services/daifa-store-management/agent-shop-store_apply'
import { arrayToTree } from '@/utils/utils'
import { categoryAll } from '@/services/common';
import Upload from '@/components/upload';
import moment from 'moment';



const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

const ListApplyDetail = props => {
  let applyId = props.location.query.applyId
  // const params = useParams();
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [treeData, setTreeData] = useState([])
  const [selectKeys, setSelectKeys] = useState([]);



  const getDetail = (applyId) => {
    setLoading(true);
    storeApplyDetail({
      applyId
    }).then(res => {
      // console.log('detail',res.data)
      if (res.code === 0) {
        const ids = [];
        const businessScope=res.data.businessScope&&JSON.parse(res.data.businessScope)
        businessScope&&businessScope.forEach(item => {
          const gcId = item.gc_id2.split(',').map(item => +item)
          ids.push(...gcId)
        })
        setSelectKeys(ids)
        setDetailData(res.data)
        form.setFieldsValue(res.data)
      }
    }).finally(() => {
      setLoading(false);
    })

    categoryAll()
      .then(res => {
        if (res.code === 0) {
          const tree = arrayToTree(res.data.records.map(item => ({
            ...item,
            pid: item.gcParentId,
            title: item.gcName,
            key: item.id,
            value: item.id,
            selectable: false
          })))
          setTreeData(tree)
        }
      })
  }

  useEffect(() => {
    getDetail(applyId)
  }, [])

  return (
    <PageContainer>
      <Spin
        spinning={loading}
      >
        <Form
          form={form}
          {...formItemLayout}
          style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 100 }}
        >
          <Form.Item
            label="店主姓名"
          >
            {detailData.realname}
          </Form.Item>

          <Form.Item
            label="店主手机号"
          >
            {detailData.mobile}
          </Form.Item>

          <Form.Item
            label="店铺名称"
          >
            {detailData.storeName}
          </Form.Item>

          <Form.Item
            label="店主微信号"
          >
            {detailData.wechatNo}
          </Form.Item>
          <Form.Item
            label="身份证姓名正面照片"
            name="idFront"
          >
            <Upload  multiple maxCount={1} accept="image/*" size={1 * 1024} />
          </Form.Item>
          <Form.Item
            label="身份证国徽面照片"
            name="idBack"
          >
            <Upload  multiple maxCount={1} accept="image/*" size={1 * 1024} />
          </Form.Item>
          <Form.Item
            label="手持身份证照片"
            name="idHandheld"
          >
            <Upload  multiple maxCount={1} accept="image/*" size={1 * 1024} />
          </Form.Item>
          <Form.Item
            label="店主内部岗位或身份"
          >
            {detailData.station}
          </Form.Item>

          <Form.Item
            label="店主身份证号"
          >
            {detailData.idNumber}
          </Form.Item>
          <Form.Item
            label="主营商品类型"
            name="businessScope"
          >
            <Tree
              checkable
              style={{
                width: '100%',
              }}
              treeData={treeData}
              multiple
              height={200}
              virtual={false}
              checkedKeys={selectKeys}
              expandedKeys={selectKeys}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="状态"
          >
            {detailData.status === 1 ? '已启用' : '已禁用'}
          </Form.Item>

          <Form.Item
            label="创建人"
          >
            {detailData.adminName}
          </Form.Item>

          <Form.Item
            label="创建时间"
          >
            {moment(detailData.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Form.Item>
          <Form.Item
            label="."
          >
            <Button onClick={()=>history.push('/daifa-store-management/agent-shop-store_apply')}>返回</Button>
          </Form.Item>

        </Form>
      </Spin>

    </PageContainer>
  )
}


export default  ListApplyDetail
