import React, {useEffect, useState} from 'react';
import {courseList} from '../../mock';
import {CourseList} from './CourseList/CourseList';
export default (props) => {
  const [data, handleData] = useState([])
  useEffect(() => {
    handleData(courseList.list)
  }, [])
  return <div>
    <CourseList data={data}/>
  </div>
}