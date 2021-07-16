import React,{useEffect} from 'react';
import { Tabs } from 'antd';
import { FormattedMessage,connect } from 'umi';
import UseCollect from './use-collect'
import UseSecond from './use-second'
const { TabPane } = Tabs;

const useScope=props => {
    const {dispatch,DetailList}=props
    const id=props.id
    const onTabs=(val)=>{
        dispatch({
            type:'UseScopeList/fetchUseType',
            payload:{
                useType:val
            }
        })
    }
    useEffect(()=>{
        console.log('DetailList.data?.useType',DetailList.data?.useType.toString())
    },[])
    return (
        <>
            <Tabs defaultActiveKey={DetailList.data?.useType.toString()} onChange={onTabs}>
                <TabPane key='1' tab={<FormattedMessage id="formandbasic-form.Secret.Garden" /> } key="1">
                    <UseSecond id={id}/>
                </TabPane>
                <TabPane key='2' tab={<FormattedMessage id="formandbasic-form.container.number" />} key="2">
                    <UseCollect id={id}/>
                </TabPane>
            </Tabs>
        </>
    )
}
export default connect(({ DetailList,UseScopeList}) => ({
    DetailList,
    UseScopeList
  }))(useScope);