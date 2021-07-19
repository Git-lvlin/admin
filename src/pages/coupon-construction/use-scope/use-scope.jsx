import React,{useEffect} from 'react';
import { Tabs } from 'antd';
import { FormattedMessage,connect } from 'umi';
import UseCollect from './use-collect'
import UseSecond from './use-second'
const { TabPane } = Tabs;

const useScope=props => {
    const {dispatch,DetailList,id,type}=props
    const onTabs=(val)=>{
        dispatch({
            type:'UseScopeList/fetchUseType',
            payload:{
                useType:val
            }
        })
    }
    return (
        <>
            <Tabs defaultActiveKey={parseInt(id)==id&&`${DetailList.data?.couponType}`} onChange={onTabs}>
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