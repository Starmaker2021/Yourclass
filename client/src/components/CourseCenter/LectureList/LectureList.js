import React, {useState} from 'react';
import {Collapse, Divider} from 'antd';
const { Panel } = Collapse;
import './lectureList.less'
import LecturePreview from '../../Course/LecturePreview/LecturePreview';
const LectureList = ({course=[], courseId}) => {
  const [showDetail, handleShowDetail] = useState(false)
  const [lecture, updateLecture] = useState({})
  return <>
    {!showDetail&&<div className="container lecture-list">
      <h1>Course</h1>
      <Divider/>
      <>
        <Collapse collapsible="header" accordion>
          {
            course.map((chapter = [], index) => <Panel header={chapter.chapter_name}
              key={index}>
              {chapter.lecture && chapter.lecture.map((lecture, _index) => <a onClick={(e) => {
                e.preventDefault()
                updateLecture({...lecture,  name:chapter.chapter_name})
                handleShowDetail(true)
              }} className="lecture-item" key={index}> {lecture.lecture_name}</a>)}
            </Panel>
            )
          }
        </Collapse>
      </>
    </div>}
    {
      showDetail&&<LecturePreview role={'2'} className="lecture-list-preview" courseId={courseId} data={lecture} handleShowPreview={handleShowDetail}/>
    }
  </>
}
export default LectureList