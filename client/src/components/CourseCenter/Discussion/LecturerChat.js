import React, {useEffect, useState} from 'react'
import {Divider, List, Skeleton} from 'antd';
import './discussion.less'
import './lecturerChat.less'
import DiscussionDetail from './DiscussionDetail';
import DiscussionService from '../../../services/discussion';
const LecturerChat = ({courseId, lecturerId, idx, course}) => {
  const [showDetail, handleToggleShowDetail] = useState(false)
  const [subscriber, updateSubscriber] = useState([])
  const [learner_id, updateLearnerId] = useState('')
  const [title, handleTitle]=useState('')
  const fetchData = async () => {
    const res = await DiscussionService.getList({courseId, lecturerId})
    try{
      const {code, data} = res
      if(code === 0){
        updateSubscriber(data)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    if(idx ==='chat'){
      fetchData()
    }
  }, [idx])
  const [data, handleData] = useState([])
  const fetchLecturerChat = async (learner_id) => {
    try{
      const res = await DiscussionService.getChatById({courseId:courseId, learner_id:learner_id, type: '1'})
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
      const res = await DiscussionService.updateChatById({...params, learner:title,  courseId:courseId, lecturer_id:lecturerId, learner_id:learner_id, type:'1'})
      const {code, data, message}= res
      if(code === 0){
        handleData(data)
      }
    }catch (e){
      console.log(e)
    }
  }
  return <>
    <div className="container lecturer-chat">
      <h1>Discussion</h1>
      <Divider/>
      <List
        dataSource={subscriber}
        renderItem={(item) => (
          <List.Item
            extra={<a key="examination-list-item" onClick={(e) => {
              e.preventDefault()
              fetchLecturerChat(item.learner_id)
              handleToggleShowDetail(!showDetail)
              handleTitle(item.username)
              updateLearnerId(item.learner_id)
            }
            }>Chat</a>}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <div>{item.username}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
    {showDetail && <DiscussionDetail data={data} role="1" title={title} submitDiscussion={submitDiscussion}  goBack={() => handleToggleShowDetail(!showDetail)}/>}
  </>
}
export default LecturerChat