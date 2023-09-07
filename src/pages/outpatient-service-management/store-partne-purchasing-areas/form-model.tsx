import { useRef } from 'react';
import { message, Form, Button, Space } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { provideSaveData } from '@/services/outpatient-service-management/store-partne-purchasing-areas'
import { amountTransform } from '@/utils/utils';

export default (props) => {
  const { setVisible,visible,callback,onClose,msgDetail } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const columns= [
    {
      title: 'spuID',
      dataIndex: 'spuId',
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImageUrl',
      valueType: 'image',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
  ]

  const columns2= [
    {
      title: '参数',
      dataIndex: 'parameterName',
    },
    {
      title: '新值',
      dataIndex: 'newValue',
    },
    {
      title: '旧值',
      dataIndex: 'oldValue',
    },
  ]

  const onsubmit = () => {
    const params={
        ...msgDetail?.[1],
        actPrice: amountTransform(msgDetail?.[1]?.actPrice,'*'),
    }
    if(params.actPrice==0){
      return message.error('请填写门店价')
    }
    if(!params.sort){
      return message.error('请填写序号')
    }
    provideSaveData(params).then(res=>{
      if(res.code==0){
          callback(res.data[0])
          setVisible(false)
          message.success('保存成功')
      }
    })

  };

  return (
    <ModalForm
      key="sort"
      title='确认保存店铺供应链系统商品'
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel:()=>{
        }
      }}
      onFinish={async () => {
        await onsubmit();
      }}
      submitter={{
        render: ({ form }) => {
          return (
              <Space>
                <Button
                  onClick={() => {
                    setVisible(false)
                    onClose()
                  }}
                >
                  取消编辑
                </Button>
                <Button
                  onClick={() => {
                    setVisible(false)
                  }}
                  style={{ background: '#DFDFDF' }}
                >
                  重新编辑
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form?.submit()
                  }}
                >
                  确认保存
                </Button>
              </Space>
          )
        }
      }}
    >
       <ProTable
         headerTitle='商品信息'
         rowKey="id"
         columns={columns}
         dataSource={[msgDetail?.[0]]}
         columnEmptyText={false}
         options={false}
         search={false}
         paginationProps={false}
       />
        <ProTable
         headerTitle='编辑内容'
         rowKey="id"
         columns={columns2}
         paginationProps={false}
         dataSource={[
            {
              "parameterName": "门店价(元)",
              "oldValue": msgDetail?.[0]?.actPrice,
              "newValue": msgDetail?.[1]?.actPrice,
              "id": 1
            },
            {
              "parameterName": "起订数量",
              "oldValue": msgDetail?.[0]?.buyMinNum,
              "newValue": msgDetail?.[1]?.buyMinNum,
              "id": 2
            },
            {
              "parameterName": "显示序号",
              "oldValue": msgDetail?.[0]?.sort,
              "newValue": msgDetail?.[1]?.sort,
              "id": 3
            }
          ]}
         columnEmptyText={false}
         options={false}
         search={false}
       />
    </ModalForm>
  );
};