import React, { useEffect } from 'react'
import { List } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import * as api from '@/services/product-management/product-category'

const ProductCategory = () => {

  useEffect(() => {
    api.category({ gcParentId: 0 })
  }, [])

  return (
    <PageContainer>
      <List
        itemLayout="horizontal"
        header={<a>添加一级分类</a>}
        bordered
        style={{ backgroundColor: '#fff', width: 400, maxHeight: 500, overflow: 'auto' }}
      >
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
        <List.Item
          actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}
        >
          一级分类
        </List.Item>
      </List>
    </PageContainer>
  )
}

export default ProductCategory;

