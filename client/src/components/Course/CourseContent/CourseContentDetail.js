import React, {useState, useEffect} from 'react'
import {Divider} from 'antd';
import Video from './Video/Video';
import './courseContentDetail.less'
const CourseContentDetail = () => {
  const [data, updateData] = useState({})
  useEffect(() => {
    updateData({
      chapter:'Chapter1',
      lecture:'lecture1',
      title:'Data types',
      resource:'',
      type:'video',
      document:''
    })
  }, [])
  return <div className="container course-content-detail-container">
    <h1 className="header-title">{data.chapter}<span className="lecture">{data.lecture}</span><span className="title">{data.title}</span></h1>
    <Divider/>
    {data.type === 'video' && <Video/>}
    {data.type==='document' && <div dangerouslySetInnerHTML={{__html:data.document}}/>}
  </div>
}
export default CourseContentDetail