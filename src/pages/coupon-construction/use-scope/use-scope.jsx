import React from 'react';
import { Tabs } from 'antd';
import { FormattedMessage } from 'umi';
import UseCollect from './use-collect'
import UseSecond from './use-second'
const { TabPane } = Tabs;

export default props => {
    const {onuseType,oncateId,onsupid,onwhid}=props
    const onTabs=(val)=>{
        console.log('val',val)
        onuseType&&onuseType(val)
    }
    const onSpuIds=(spuids)=>{
        console.log('spuids',spuids)
        onsupid&&onsupid(spuids)
    }
    const onclassId=(classId)=>{
        console.log('classId',classId)
        oncateId&&oncateId(classId)
    }
    const onWholesaleIds=(whid)=>{
        onwhid&&onwhid(whid)
    }
    return (
        <>
            <Tabs defaultActiveKey="1" onChange={onTabs}>
                <TabPane tab={<FormattedMessage id="formandbasic-form.Secret.Garden" /> } key="1">
                    <UseSecond onSpuIds={onSpuIds} onclassId={onclassId}/>
                </TabPane>
                <TabPane tab={<FormattedMessage id="formandbasic-form.container.number" />} key="2">
                    <UseCollect onWholesaleIds={onWholesaleIds}/>
                </TabPane>
            </Tabs>
        </>
    )
}