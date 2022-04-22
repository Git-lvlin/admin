import { useState, useRef } from 'react';
import { Button} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { getQyzBuyConfig} from '@/services/hydrogen-atom-management/hydrogen-atom-configuration';
import { PageContainer } from '@/components/PageContainer';
import moment from 'moment'
import type { ProColumns,ActionType } from '@ant-design/pro-table';

type activityItem={
    buyType: number;
    suggestCommission: number;
    agentCompanyCommission: number;
    businessDeptCommission: number;
    provinceAgentCommission: number;
    cityAgentCommission: number;
}


export default () => {
    const ref=useRef<ActionType>()
    const [visible, setVisible] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [detailVisible,setDetailVisible]=useState<boolean>(false)
    const [dataVisible,setDatalVisible]=useState<boolean>(false)
    const [pennyId,setPennyId]=useState<number>()
    const columns:ProColumns<activityItem>[]= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '提成对象',
        dataIndex: 'suggestCommission',
        valueType: 'text',
      },
      {
        title: '描述',
        dataIndex: 'agentCompanyCommission',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '分成金额（元）',
        dataIndex: 'shoperLimitOnece',
        valueType: 'text',
        hideInSearch: true,
      }
    ];
    return (
      <PageContainer title=" ">
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          headerTitle="购买_氢原子交易款的各个角色分成"
          request={getQyzBuyConfig}
          toolBarRender={()=>[
            <p>交易款金额：68000.00元</p>
        ]}
        search={{
          defaultCollapsed: true,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        </PageContainer>
    );
  };