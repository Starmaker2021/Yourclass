import React from 'react'
import CourseItem from '../CourseItem';
import {Card, List} from 'antd';
import './courseList.less'
export const CourseList=({ data, onClick}) => <List
  className="course-list"
  dataSource={data}
  renderItem={(item) => (
    <List.Item>
      <Card><CourseItem onClick={() => onClick(item)} data={item}/></Card>
    </List.Item>
  )}
/>