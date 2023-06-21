import { useEffect, useState } from 'react'
import { Spin, Empty } from 'antd'
import { PageContainer } from '@/components/PageContainer';
import { categoryApp, categoryAppSorts } from '@/services/product-management/front-category'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Form from './form';
import styles from './style.less'
import GoodsDetail from './goods-detail'


const SortableItem = SortableElement(({ children }: any) => children);

const SortContainer = SortableContainer(({ children }: any) => {
  return <ul className={styles.ul}>{children}</ul>;
});

const List = (props: any) => {
  const { parentId = 0, onClick = () => { }, edit, selectItem, level } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectId, setSelectId] = useState(null);
  const [visible, setVisible] = useState(false)
  const [appGcId1, setAppGcId1] = useState<number>(0)
  const [appGcId2, setAppGcId2] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [subTitle, setSubTitle] = useState<string>('')

  const getData = () => {
    setLoading(true);
    categoryApp({ gcParentId: parentId })
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
    categoryAppSorts({
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

  const goodsDetail = (props: any) => {
    const { id, item } = props
  
    if(level === 1) {
      setAppGcId1(id)
      setAppGcId2(0)
      setTitle(item.gcName)
      setSubTitle('')
    } else {
      setAppGcId1(item.gcParentId)
      setAppGcId2(id)
      setTitle(item.gcName)
      setSubTitle(selectItem.gcName)
    }
  }

  return (
    <Spin
      spinning={loading}
    >
      <div style={{ marginRight: 50 }}>
        <div className={styles.header}>
          <a
            onClick={() => { edit({ level, selectItem, parentId, type: 'add', id: parentId, callback: () => { getData(); } }); }}
          >
            添加{parentId === 0 ? '一' : '二'}级分类
          </a>
        </div>
        <div className={styles.th}>
          <span>分类名称</span>
          <span className={styles.state}>商品</span>
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
                      <div className={styles.state}>
                        <a 
                          onClick={(e)=> {
                            setVisible(true);
                            goodsDetail({id: item.id, item})
                            e.stopPropagation()
                          }}
                        >
                          查看商品
                        </a>
                      </div>
                      <div className={styles.action}>
                        <a onClick={(e) => { edit({ level, selectItem, id: item.id, parentId, type: 'edit', data: item, callback: () => { getData(); } }); e.stopPropagation() }}>编辑</a>
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
      {
        visible &&
        <GoodsDetail
          visible={visible}
          setVisible={setVisible}
          appGcId1={appGcId1}
          appGcId2={appGcId2}
          title={title}
          subTitle={subTitle}
        />
      }
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

  return (
    <PageContainer>
      {visible && <Form
        visible={visible}
        setVisible={setVisible}
        {...formParams}
      />}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', paddingTop: 30 }}>
        <List onClick={(item: any) => { setSelectItem(item) }} edit={edit} level={1}/>
        {selectItem && <List selectItem={selectItem} parentId={selectItem.id} edit={edit} level={2}/>}
      </div>
    </PageContainer>
  )
}

export default FrontCategory

