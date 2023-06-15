import { Form, Image } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
import { qlfSupplierAllQlf } from '@/services/supplier-management/supplier-list'
import moment from 'moment';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

export default (props) => {
  const { visible, setVisible,msgDetail} = props;
  const [form] = Form.useForm();
  return (
    <DrawerForm
      layout='horizontal'
      title="已上传资质"
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
        }
      }}
      submitter={{
        render:()=>{
            return []
        }
      }}
      {...formItemLayout}
    >
      <ProList
        rowKey="id"
        request={qlfSupplierAllQlf}
        params={{
          agencyId:msgDetail?.agencyId,
        }}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        split={true}
        postData={(data)=>{
          const arr=data.map(ele=>({...ele,desc:ele?.status?.desc}))
          return arr
        }}
        search={{}}
        metas={{
          avatar: {
            dataIndex: 'qlfImg',
            render: (_) => {
              console.log(_)
              return <Image src={_?.props?.text} style={{ width: 100, height: 100 }} />
            },
            search: false,
          },
          title: {
            dataIndex: 'qlfNumber',
            search: false,
          },
          description: {
            dataIndex: 'auditStatusDesc',
            render:(_,data)=>{
              return <>
                <p>{_}</p>
                <p>{data?.goodsQlfName}（{data?.typeDesc}）</p>
              </>
            },
            search: false,
          },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}><span>{row?.supName}</span></p><br/>
              <p style={{color:'#999999',float:'right'}}>{ moment(row?.updateTime*1000).format('YYYY-MM-DD HH:mm:ss') }</p>
              <p style={{color:'#999999'}}>asdasda</p>
            </div> 
            ),
            search: false,
          },
          supId: {
            // 自己扩展的字段，主要用于筛选，不在列表中显示
            title: '供应商ID',
            valueType: 'text',
          },
          auditStatus: {
            // 自己扩展的字段，主要用于筛选，不在列表中显示
            title: '审核状态',
            valueType: 'select',
            valueEnum: {
              0: '待审核',
              1: '审核通过',
              2: '审核拒绝'
            },
          },
        }}
      />
    </DrawerForm >
  );
};