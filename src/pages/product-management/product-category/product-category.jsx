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
  const { parentId = 0, onClick = () => { }, edit, remove } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectId, setSelectId] = useState(null);

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

  const toggleShow = (status, id) => {
    setLoading(true);
    api.categorySwitch({
      gcShow: status ? 1 : 0,
      id,
    }).then(res => {
      if (res.code === 0) {
        setData(data.map(item => {
          if (item.id === id) {
            return {
              ...item,
              gcShow: status ? 1 : 0,
            }
          }
          return item;
        }))
      }

    }).finally(() => {
      setLoading(false);
    })
  }


  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }
    setLoading(true);
    api.categorySorts({
      moveId: data[oldIndex].id,
      // eslint-disable-next-line no-nested-ternary
      afterId: newIndex === 0 ? 0 : (newIndex > oldIndex ? data[newIndex].id : data[newIndex - 1].id)
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
            onClick={() => { edit({ id: parentId, type: 'add', callback: () => { getData(); } }); }}
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
                      &nbsp;
                      &nbsp;
                      佣金抽成：{item.comPercent ?? 0}%
                      <div className={styles.actions}>
                        <Switch
                          onClick={(checked, e) => { toggleShow(checked, item.id); e.stopPropagation(); }}
                          checked={item.gcShow === 1}
                          checkedChildren="开"
                          unCheckedChildren="关"
                          style={{ marginRight: 10 }}
                        />
                        <a onClick={(e) => { edit({ id: item.id, type: 'edit', data: item, callback: () => { getData(); } }); e.stopPropagation() }}>编辑</a>
                        {/* &nbsp;<a>参数</a>
                        &nbsp;<a style={{ color: 'red' }} onClick={(e) => { remove(item.id, () => { getData() }); e.stopPropagation() }}>删除</a> */}
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

  const edit = (params) => {
    setFormParams(params)
    setVisible(true)
  }

  const remove = (id, cb) => {
    api.categoryDel({
      id
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        if (cb) {
          cb();
        }
      }
    })
  }

  return (
    <PageContainer>
      {visible && <Form
        visible={visible}
        setVisible={setVisible}
        {...formParams}
      />}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <List onClick={(id) => { setSelectId(id) }} edit={edit} remove={remove} />
        {selectId && <List parentId={selectId} edit={edit} remove={remove} />}
      </div>
    </PageContainer>
  )
}

export default ProductCategory;

