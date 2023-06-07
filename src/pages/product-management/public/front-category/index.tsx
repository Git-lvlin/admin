import { useEffect, useState } from 'react'
import { Spin, Empty } from 'antd'
import { PageContainer } from '@/components/PageContainer';
import { category, categoryDel, categorySorts } from '@/services/product-management/product-category'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Form from './form';
import styles from './style.less'


const SortableItem = SortableElement(({ children }: any) => children);

const SortContainer = SortableContainer(({ children }: any) => {
  return <ul className={styles.ul}>{children}</ul>;
});

const List = (props: any) => {
  const { parentId = 0, onClick = () => { }, edit, selectItem, } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectId, setSelectId] = useState(null);

  const getData = () => {
    setLoading(true);
    category({ gcParentId: parentId })
      .then(res => {
        if (res.code === 0) {
          setData(res.data.records)
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const onSortEnd = ({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => {
    if (oldIndex === newIndex) {
      return;
    }
    setLoading(true);
    categorySorts({
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
            onClick={() => { edit({ selectItem, parentId, id: parentId, type: 'add', callback: () => { getData(); } }); }}
          >
            添加{parentId === 0 ? '一' : '二'}级分类
          </a>
        </div>
        <div className={styles.th}>
          <span>分类名称</span>
          <span className={styles.state}>在售商品数(款)</span>
          <span className={styles.action}>操作</span>
        </div>
        {
          data.length ?
            <SortContainer lockAxis="y" onSortEnd={onSortEnd} distance={1}>
              {
                data.map((item, index) =>
                  <SortableItem key={item.id} index={index} >
                    <li
                      className={styles.li}
                      onClick={() => { setSelectId(item.id); onClick(item) }}
                      style={{ backgroundColor: (parentId === 0 && selectId === item.id) ? '#f0f0f0' : '#fff' }}
                    >
                      <img src={item.gcIcon} />
                      <div className={styles.gcName}>{item.gcName}</div>
                      <div className={styles.state}
                      >
                        <a onClick={()=> {}}>{123}</a>
                      </div>
                      <div className={styles.action}>
                        <a onClick={(e) => { edit({ selectItem, id: item.id, parentId, type: 'edit', data: item, callback: () => { getData(); } }); e.stopPropagation() }}>编辑</a>
                      </div>
                    </li>
                  </SortableItem>
                )
              }
            </SortContainer>
            :
            <Empty />
        }
      </div>
    </Spin>
  )
}

const FrontCategory = () => {
  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState<any>(null);
  const [formParams, setFormParams] = useState({})

  const edit = (params: any) => {
    setFormParams(params)
    setVisible(true)
  }

  const remove = (id: string, cb: ()=> void) => {
    categoryDel({
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
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', paddingTop: 30 }}>
        <List onClick={(item: any) => { setSelectItem(item) }} edit={edit} remove={remove} />
        {selectItem && <List selectItem={selectItem} parentId={selectItem.id} edit={edit} remove={remove} />}
      </div>
    </PageContainer>
  )
}

export default FrontCategory

