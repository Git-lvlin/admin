import { PageContainer } from "@ant-design/pro-layout"
import ProTable, { ProColumns } from "@ant-design/pro-table"
import { Cascader  } from 'antd'

import { ProTableProps } from "../data"

const IncidentAnalysts = () => {

  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }
  
  const options: Option[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou'
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing'
        },
      ],
    },
  ]; 

  const columns: ProColumns<ProTableProps>[] = [
    {
      title: '已有事件',
      dataIndex: 'test',
      align: 'center',
      hideInTable: true,
      renderFormItem: ()=> {
        return (
          <>
            <Cascader 
              options={options} 
              displayRender={(label) =>{
                return <span>{label[label.length - 1]}</span>
                
              }}
              showSearch
            />
          </>
        )
      }
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          
        }}
      />
    </PageContainer>
  )
}

export default IncidentAnalysts
