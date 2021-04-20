import React, { useEffect, useState } from 'react'
import { Spin, Empty, Switch } from 'antd'
import { PageContainer } from '@ant-design/pro-layout';
import * as api from '@/services/product-management/product-category'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import Form from './form';
import styles from './style.less'

const SortableItem = sortableElement(({ children }) => children);

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className={styles.ul}>{children}</ul>;
});

const List = (props) => {
  const { parentId = 0, onClick = () => { }, } = props;
  const [formParams, setFormParams] = useState({})
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectId, setSelectId] = useState(null);


  // const [visible, setVisible] = useState(false);

  const getData = () => {
    setLoading(true);
    api.category({ gcParentId: parentId })
      .then(res => {
        if (res.code === 0) {
          setData(res.data.records)
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const setFormParamsHandle = (params) => {
    setFormParams(params)
    // setVisible(true)
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }
    setLoading(true);
    api.categorySorts({
      moveId: data[oldIndex].id,
      // eslint-disable-next-line no-nested-ternary
      afterId: newIndex === 0 ? 0 : (newIndex > oldIndex ? data[newIndex].id : data[newIndex-1].id)
    }).then(res => {
      if (res.code === 0) {
        getData();
      }
    }).catch(() => {
      setLoading(false);
    })
  };

  useEffect(() => {
    getData();
  }, [parentId])

  return (
    <Spin
      spinning={loading}
    >
      <div style={{ marginRight: 50 }}>
        <div className={styles.header}>
          <a
          // onClick={() => { setFormParamsHandle({ parentId: 0, type: 'add', callback: () => { getParentData(); } }); }}
          >
            添加{parentId === 0 ? '一' : '二'}级分类
          </a>
        </div>
        {
          data.length ?
            <SortableContainer lockAxis="y" onSortEnd={onSortEnd} distance={1}>
              {
                data.map((item, index) =>
                  <SortableItem key={item.id} index={index} >
                    <li
                      className={styles.li}
                      onClick={() => { setSelectId(item.id); onClick(item.id) }}
                      style={{ backgroundColor: (parentId === 0 && selectId === item.id) ? '#f0f0f0' : '#fff' }}>
                      <img src={item.gcIcon} />
                      {item.gcName}
                      <div className={styles.actions}>
                        <Switch checkedChildren="开" unCheckedChildren="关" style={{ marginRight: 10 }} />
                        <a>编辑</a> <a>参数</a> <a>删除</a>
                      </div>
                    </li>
                  </SortableItem>
                )
              }
            </SortableContainer>
            :
            <Empty />
        }
      </div>
    </Spin>
  )
}

const ProductCategory = () => {
  const [visible, setVisible] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [formParams, setFormParams] = useState({})


  const setFormParamsHandle = (params) => {
    setFormParams(params)
    setVisible(true)
  }

  return (
    <PageContainer>
      <Form
        visible={visible}
        setVisible={setVisible}
        {...formParams}
      />
      <div style={{ display: 'flex' }}>
        <List onClick={(id) => { setSelectId(id) }} />
        {selectId && <List parentId={selectId} />}
      </div>
    </PageContainer>
  )
}

export default ProductCategory;

