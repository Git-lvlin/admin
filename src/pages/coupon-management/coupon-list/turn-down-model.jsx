import React, { useState} from 'react';
import { ModalForm} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { couponVerifyList } from '@/services/coupon-management/coupon-audit';

export default props=>{
    const {id}=props
    const [visible, setVisible] = useState(false);
    const Additional=()=>{
        setVisible(true)
    }
    const columns3= [
        {
          title: '审核时间',
          dataIndex: 'createTime',
          valueType: 'text',
        },
        {
          title: '审核人员',
          dataIndex: 'adminName',
          valueType: 'text',
        },
        {
            title: '审核结果',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              3: '审核驳回',
              4: '审核通过',
            },
        },
        {
            title: '审核意见',
            dataIndex: 'content',
            valueType: 'text'
        },
      ];
     
    return (
        <ModalForm
            title="审核详情"
            key={id}
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<a onClick={()=>Additional()}>驳回详情</a>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                setVisible(false)
            }}
        >
          <ProTable
            rowKey="id"
            options={false}
            params={{
              id:id
            }}
            request={couponVerifyList}
            search={false}
            columns={columns3}
          />
      </ModalForm>
    )
}

