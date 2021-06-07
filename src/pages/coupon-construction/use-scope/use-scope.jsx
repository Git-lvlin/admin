import React from 'react';
import { Tabs } from 'antd';
import { FormattedMessage,connect } from 'umi';
import UseCollect from './use-collect'
import UseSecond from './use-second'
const { TabPane } = Tabs;

const useScope=props => {
    const {dispatch}=props
    const id=props.id
    const onTabs=(val)=>{
        console.log('val',val)
        dispatch({
            type:'UseScopeList/fetchUseType',
            payload:{
                useType:val
            }
        })
    }
    return (
        <>
            <Tabs defaultActiveKey="1" onChange={onTabs}>
                <TabPane tab={<FormattedMessage id="formandbasic-form.Secret.Garden" /> } key="1">
                    <UseSecond id={id}/>
                </TabPane>
                <TabPane tab={<FormattedMessage id="formandbasic-form.container.number" />} key="2">
                    <UseCollect id={id}/>
                </TabPane>
            </Tabs>
        </>
    )
}
export default connect(({ UseScopeList}) => ({
    UseScopeList
  }))(useScope);