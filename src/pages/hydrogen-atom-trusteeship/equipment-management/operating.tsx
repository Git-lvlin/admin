import ProTable from '@ant-design/pro-table'
import { Dropdown, Button, Menu } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"

import type { ProColumns } from "@ant-design/pro-table"

import RangeInput from "../components/range-input"
import { ingOperateList } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const Operating = () => {

  const menu = () => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={()=>{ 
          }}
        >
          分成
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={()=>{
          }}
        >
          操作日志
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={()=> {
          }}
        >
          修改ID
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={()=> {
          }}
        >
          修改使用时长
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={()=> {
          }}
        >
          停止运营
        </Menu.Item>
        <Menu.Item
          key="6"
          onClick={()=> {
          }}
        >
          终止托管
        </Menu.Item>
      </Menu>
    )
  }

  const columns: ProColumns[] = [
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '运营商手机',
      dataIndex: 'storePhone',
      align: 'center'
    },
    {
      title: '投资人手机',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '运营商店铺编号',
      dataIndex: 'storeHouseNumber',
      align: 'center'
    },
    {
      title: '合计营收',
      dataIndex: 'totalRevenue',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '健康卡营收',
      dataIndex: 'cardRevenue',
      align: 'center',
      hideInTable: true,
      renderFormItem: ()=> (
        <RangeInput firstPlaceholder='最低金额' lastPlaceholder='最高金额'/>
      )
    },
    {
      title: '健康卡营收',
      dataIndex: 'cardRevenue',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '启动费营收',
      dataIndex: 'startUpRevenue',
      align: 'center'
    },
    {
      title: '累计启用(次)',
      dataIndex: 'totalStartUp',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '最近启动时间',
      dataIndex: 'lastStartUp',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Dropdown.Button
          overlay={menu}
          buttonsRender={()=> [
            ( 
              r?.useStatus !== 2&&
              <Button
                onClick={()=>{ 
                  
                }}
              >
                启用
              </Button> ||
              r?.useStatus === 2&&
              <Button 
                onClick={()=>{ 
                 
                }}
              >
                停用
              </Button>
            ),
            <Button icon={<EllipsisOutlined />}/>
          ]}
        />
      )
    }
  ]

  return (
    <ProTable
      rowKey='imei'
      columns={columns}
      params={{}}
      request={ingOperateList}
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      options={false}
      search={{
        labelWidth: 100,
        optionRender: (searchConfig, props, dom)=> [
          ...dom.reverse()
        ]
      }}
    />
  )
}

export default Operating
