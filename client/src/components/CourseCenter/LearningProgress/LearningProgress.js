import React, {useEffect, useState} from 'react'
import {Card, Divider} from 'antd';
import './default.less'
import CourseService from '../../../services/course';
const LearningProgress = ({course={}, idx}) => {
  const [count, updateCount] = useState({
    video:0,
    document:0
  })
  const [done, updateDone] = useState({
    videoDone:0,
    documentDone:0
  })
  /**
   * get learning progress
   * @returns {Promise<void>}
   */
  const getLearningProgress = async () => {
    try{
      const res = await CourseService.getProgress({courseId:course.course_id})
      const {data, code} = res
      if(code ===0){
        const {videoDone, documentDone} = data
        updateDone({videoDone, documentDone})
      }
    }catch (e){
      console.log(e)
    }
  }
  /**
   * count
   */
  const getTotalCount = () => {
    let _documentCount = 0;
    let _videoCount=0
    course.chapter.map((chapter) => {
      if(chapter.lecture){
        chapter.lecture.forEach((lecture) => {
          if(lecture.type === 'document'){
            _documentCount+=1
          }
          if(lecture.type === 'video'){
            _videoCount+=1
          }
        })
      }
    })
    updateCount({ document:_documentCount, video:_videoCount})
  }
  useEffect(() => {
    getLearningProgress()
    getTotalCount()
  }, [course])
  useEffect(() => {
    if(idx === '1'){
      getLearningProgress()
      getTotalCount()
    }
  }, [idx])
  return <div className="container learning-progress">
    <h1>Learning Record</h1>
    <Divider/>
    <div className="learning-progress-content">
      <Card>
        <div className="progress">{done.videoDone}/{count.video}</div>
        <div className="type">Video</div>
      </Card>
      <Card>
        <div className="progress">{done.documentDone}/{count.document}</div>
        <div className="type">Documents</div>
      </Card>
    </div>
  </div>
}
export default LearningProgress