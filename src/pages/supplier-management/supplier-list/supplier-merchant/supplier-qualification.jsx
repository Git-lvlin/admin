import { useEffect, useState, useRef } from "react"
import { Button, Form } from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { qlfSupplierQlf } from "@/services/supplier-management/supplier-list"
import ProTable from '@/components/pro-table'
import { amountTransform } from '@/utils/utils'
import Edit from '@/components/upload-qualification'

export default (props) => {
  const { visible, setVisible,detailData,callback} = props;
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const [msgDetail, setMsgDetail] = useState();
  const ref = useRef()
  useEffect(()=>{
    form.setFieldsValue({
      ...detailData
    })
  },[])

  const Columns = [
    {
      title: '经营需资质的分类',
      dataIndex: 'gcDesc',
      align: 'center',
      ellipsis: true,
      width: 400,
    },
    {
      title: '资质',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '编号',
      dataIndex: 'qlfNumber',
      align: 'center',
    },
    {
      title: '资质文件',
      dataIndex: 'qlfImg',
      align: 'center',
      valueType: 'image',
    },
    {
      title: '状态',
      dataIndex: 'auditStatusDesc',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      render:(_,data)=>{
        if(data.auditStatus == -1 ){
          return <a onClick={()=>{ setFormVisible(true); setMsgDetail(data) }}>上传资质</a>
        }
      }
    }
  ]
  return (
    <ModalForm
      layout="horizontal"
      title={<><span style={{ fontWeight:'bold' }}>供应商资质证书</span> <span style={{ fontSize:'12px', color:'#929292' }}>辅助信息</span></>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      submitter={{
        render: (_, dom) => {
          return <Button type="primary" onClick={()=>{ setVisible(false) }}>关闭</Button>
        },
      }}
      width={1200}
    >
      <ProTable
        rowKey="id"
        columns={Columns}
        columnEmptyText={false}
        actionRef={ref}
        request={qlfSupplierQlf}
        params={{
          supId:detailData?.id,
        }}
        postData={(data) => {
          return data.map((item, index) => ({ ...item, id: index + 1}))
        }}
        options={false}
        search={false}
      />
       {formVisible &&
        <Edit
          visible={formVisible}
          setVisible={setFormVisible}
          msgDetail={msgDetail}
          title={'添加商品资质'}
          callback={() => { ref?.current?.reload() }}
        />}
    </ModalForm >
  );
};
