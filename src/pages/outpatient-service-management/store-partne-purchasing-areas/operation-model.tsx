import { useRef } from 'react';
import { message, Form } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { ExclamationCircleFilled} from '@ant-design/icons';
import { provideUpdateGoodsState, provideDeleteByIdArr, provideSort } from '@/services/outpatient-service-management/store-partne-purchasing-areas'

export default (props) => {
  const { setVisible,visible,callback,onClose,msgDetail } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const titleType=()=>{
    const type=msgDetail.type
    switch (type) {
      case '2':
        return msgDetail?.storeState?`确认要从到门店店铺下架商品（skuID：${msgDetail?.skuId}）？`:`确认要上架商品到门店店铺（skuID：${msgDetail?.skuId}）？`
      case '3':
        return `确认要删除商品（skuID：${msgDetail?.skuId}）？`
      case '4':
        return `确认要商品置顶（skuID：${msgDetail?.skuId}）？`
      default:
        return ''
    } 
  }

  const contentType=()=>{
    const type=msgDetail.type
    switch (type) {
      case '2':
        return msgDetail?.storeState?'下架后门店合作商将无法购买此商品':'上架后门店合作商即可购买'
      case '3':
        return '删除后当前列表不再展示此商品'
      case '4':
        return '置顶后商品将在门店专区列表靠前显示'
      default:
        return ''
    }
  }

  const submitType=()=>{
    const type=msgDetail.type
    switch (type) {
      case '2':
        return msgDetail?.storeState?'确认下架':'确认上架'
      case '3':
        return '确认删除'
      case '4':
        return '确认置顶'
      default:
        return ''
    }
  }

  const apiType=()=>{
    const type=msgDetail.type
    switch (type) {
      case '2':
        return provideUpdateGoodsState
      case '3':
        return provideDeleteByIdArr
      case '4':
        return provideSort
      default:
        return ''
    }
  }

  const paramsType=()=>{
    const type=msgDetail.type
    switch (type) {
      case '2':
        return {
          idArr:[msgDetail.id],
          storeState:msgDetail.storeState?0:1
        }
      case '3':
        return {
          idArr:[msgDetail.id],
        }
      case '4':
        return {
          id:msgDetail.id,
          sort:1
        }
      default:
        return {}
    }
  }

  const onsubmit = () => {
    const api=apiType()
    api(paramsType()).then(res=>{
      if(res.code==0){
        callback()
        setVisible(false)
        message.success('操作成功')
      }
    })
  };

  return (
    <ModalForm
      key="sort"
      title={<p><ExclamationCircleFilled style={{color:'#FBC550'}}/> {titleType()}</p>}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel:()=>{
          onClose()
        }
      }}
      onFinish={async () => {
        await onsubmit();
      }}
      submitter={{
        searchConfig: {
          submitText: submitType(),
          resetText: '取消'
        }
      }}
    >
      <p style={{ color:'red' }}>{contentType()}</p>
    </ModalForm>
  );
};