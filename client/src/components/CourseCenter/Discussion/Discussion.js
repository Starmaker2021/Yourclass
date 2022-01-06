import React, {useState, useEffect} from 'react'
import {Avatar, Divider} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './discussion.less'
import DiscussionDetail from './DiscussionDetail';
import DiscussionService from '../../../services/discussion';
const Discussion = ({course, history}) => {
  const [showDetail, handleShowDetail] = useState(false)
  const [data, handleData] = useState([])
  const [type, handleType] = useState('')
  const fetchLecturerChat = async (type) => {
    handleType(type)
    try{
      const res = await DiscussionService.getChatById({courseId:course.course_id, lecturerId:course.lecturer_id, type})
      const {code, data, message} = res
      if(code === 0){
        handleData(data)
      }
    }catch (e){
      console.log(e)
    }
  }
  const fetchLearnerChat = async (type) => {
    handleType(type)
    try{
      const res = await DiscussionService.getChatById({courseId:course.course_id, type})
      const {code, data, message} = res
      if(code === 0){
        handleData(data)
      }
    }catch (e){
      console.log(e)
    }
  }
  const submitDiscussion= async (params) => {
    try{
      const res = await DiscussionService.updateChatById({...params, learner_id:course.learner_id, lecturer:course.lecturer, courseId:course.course_id, lecturer_id:course.lecturer_id, type})
      const {code, data, message}= res
      if(code === 0){
        handleData(data)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    fetchLecturerChat()
  }, [])
  const [title, handleTitle] = useState('')
  return <>
    {!showDetail &&<div className="container discussion-container">
      <h1>Discussion</h1>
      <Divider/>
      <div className="discussion-type">
        <Avatar size={56} icon={<UserOutlined/>}/>
        <a className="content" onClick={(e) => {
          handleData([])
          e.preventDefault()
          handleShowDetail(true)
          fetchLecturerChat('1')
          handleTitle('Lecturer Q&A Area')
        }}>
          <h2 className="title">Lecturer Q&A Area</h2>
          <p className="description">Post questions about homework,tests,and courseware,hoping to be answered by the
            teacher</p>
        </a>
      </div>
      <Divider/>
      <div className="discussion-type">
        <Avatar size={56} icon={<UserOutlined/>}/>
        <a className="content" onClick={(e) => {
          handleData([])
          e.preventDefault()
          handleShowDetail(true)
          fetchLearnerChat('2')
          handleTitle('Learner Exchange Area')
        }}>
          <h2 className="title">Learner Exchange Area</h2>
          <p className="description">What is presented here is the discussion as the teaching content in the
            courseware</p>
        </a>
      </div>
    </div>}
    {showDetail&&<DiscussionDetail type={type} role="2" title={title} data={data} submitDiscussion={submitDiscussion} goBack={() => handleShowDetail(false)}/>}
  </>
}
export default Discussion