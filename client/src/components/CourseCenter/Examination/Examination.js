import React, {useState, useEffect} from 'react'
import {Divider, List, Skeleton} from 'antd';
import './examination.less'
import ExaminationDetail from './ExaminationDetail';
import ParticipantList from './ParticipantList';
const Examination = ({ course={}, role=null}) => {
  const {chapter} = course
  const [item, updateItem] = useState({})
  const [showDetail, handleToggleShowDetail] = useState(false)
  const [data, updateData] = useState([])
  useEffect(() => {
    if(course.course_id){
      let data = []
      course.chapter.forEach((chapter) => {
        if(chapter.lecture){
          chapter.lecture.forEach((lecture) => {
            if(lecture.assignment){
              data.push({
                ...lecture,
                course_id:course.course_id,
                lecturer_id:course.lecturer_id
              })
            }
          })
        }
      })
      updateData(data)
    }
  }, [course])
  return <>
    <div className="container examination-container">
      <h1>Examination</h1>
      <Divider/>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            extra={<a className="ghost-btn" key="examination-list-item ghost" onClick={(e) => {
              e.preventDefault()
              updateItem(item)
              handleToggleShowDetail(!showDetail)
            }}>{role==='lecturer'?'Enter':'Enter Test'}</a>}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <div>{item.lecture_name}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
    {showDetail&&role==='lecturer'&&<ParticipantList data={item} goBack={() => handleToggleShowDetail(!showDetail)}/>}
    {showDetail&&role==='learner'&&<ExaminationDetail data={item} goBack={() => handleToggleShowDetail(!showDetail)}/>}
  </>
}
export default Examination