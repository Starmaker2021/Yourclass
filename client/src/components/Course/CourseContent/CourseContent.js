import React, {useEffect, useState} from 'react'
import {Divider, Dropdown, List, Menu} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import './courseContent.less'
const CourseContent = (data) => {
  /***
     * show detail
     * @param data
     */
  const handleShowDetail = (data) => {
  }
  const DropdownMenu = (data=[]) => (
    <Menu>
      {data.map((item, index) => <Menu.Item  onClick={() => {handleShowDetail(item)}} key={index}>{item.title}</Menu.Item>)}
    </Menu>
  );
  return <div className="container course-content-container">
    <h1>Course</h1>
    <Divider/>
    <List
      dataSource={data}
      renderItem={(item) => (
        <Dropdown overlay={() => DropdownMenu(item.lecture||[])} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {item.title} <DownOutlined/>
          </a>
        </Dropdown>
      )}
    />
  </div>
}
export default CourseContent