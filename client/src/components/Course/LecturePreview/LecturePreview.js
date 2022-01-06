import React, {useEffect} from 'react';
import {Breadcrumb, Divider} from 'antd';
import './lecturePreview.less'
import Video from '../CourseContent/Video/Video';
import {server} from '../../../config/config';
import CourseService from '../../../services/course';
import {message as Message}  from 'antd';
const LecturePreview = ({data={}, courseId, role, handleShowPreview, className=''}) => {
  const uploadRecord = async (params) => {
    try{
      const res = await CourseService.addProgress(params)
      const {code, message} = res
      if(code === 0){
        Message.success(message)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    if(data.lecture_id&& role ==='2'&&data.type === 'document'){
      uploadRecord({
        courseId:courseId,
        type:data.type,
        lectureId:data.lecture_id
      })
    }
  }, [data])
  return <div className={`lecture-preview ${className}`}>
    <Breadcrumb>
      <Breadcrumb.Item>
        <a className="parent-link" onClick={(e) => {
          e.preventDefault()
          handleShowPreview(false)
        }}> {data.name||data.course_name}</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a className="current-link" onClick={(e) => {
          e.preventDefault()
        }}>lecture<span className="lecture-name">{data.lecture_name}</span></a>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Divider/>
    {data.type === 'video' && <Video data={{        courseId:courseId,
      type:'video',
      lectureId:data.lecture_id}} role="2" uploadRecord={uploadRecord} url={server + data.video}/>}
    {data.type === 'document' && <p>{data.document}</p>}
  </div>
}
export default LecturePreview