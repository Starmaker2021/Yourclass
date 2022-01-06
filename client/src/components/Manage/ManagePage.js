import React, {useState, useEffect} from 'react';
import {Welcome} from '../Welcome/Welcome';
import {Tabs} from 'antd';
import './managePage.less'
import UserList from './UserList/UserList';
import PurchaseList from './Purchase/PurchaseList';
const { TabPane } = Tabs;
export default () => {
  const [hideDetail, handleHideDetail] = useState(false)
  const [activeKey, handleActiveKey] = useState('1')
  return <div className="admin-page">
    <Welcome/>
    <div className="card-container">
      <Tabs type="card" activeKey={activeKey} onTabClick={(key) => {
        handleHideDetail(true)
        handleActiveKey(key)
      }}>
        <TabPane tab="Review Teachers"  key="1">
          <UserList key="1" hideDetail={hideDetail} handleHideDetail={handleHideDetail} activeKey={activeKey} role="1"/>
        </TabPane>
        <TabPane tab="Review Students" key="2">
          <UserList key="2" hideDetail={hideDetail} handleHideDetail={handleHideDetail} activeKey={activeKey} role="2"/>
        </TabPane>
        <TabPane tab="Audit Purchase" key="3">
          <PurchaseList key="3" hideDetail={hideDetail} handleHideDetail={handleHideDetail} activeKey={activeKey} role="2"/>
        </TabPane>
      </Tabs>
    </div>
  </div>
}