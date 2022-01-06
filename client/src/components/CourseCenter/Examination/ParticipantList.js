import React, {useState, useEffect} from 'react';
import {Divider, List, Skeleton} from 'antd';
import './participant.less'
import Grade from './Grade';
import CourseService from '../../../services/course';
const ParticipantList = ({data, goBack}) => {
  const [response, updateResponse] = useState([])
  const [item, updateItem] = useState({})
  const [showDetail, handleToggleShowDetail] = useState(undefined)
  const fetchData =async () => {
    try{
      const res = await CourseService.getExamList({
        course_id:data.course_id,
        lecture_id:data.lecture_id
      })
      const {code,  message} = res
      if(code === 0){
        updateResponse(res.data)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if(showDetail === false){
      fetchData()
    }
  }, [showDetail])
  return <>
    <div className="container participant-list">
      <h1><a onClick={(e) => {
        e.preventDefault()
        goBack()
      }}>Examination</a><span style={{margin:'0 8px'}}>/</span>{data.lecture_name}</h1>
      <Divider/>
      <List
        dataSource={response}
        renderItem={(item) => (
          <List.Item
            extra={<a key="examination-list-item" onClick={(e) => {
              e.preventDefault()
              updateItem(item)
              handleToggleShowDetail(!showDetail)
            }}>Grade</a>}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <div>{item.username}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
    {showDetail&&<Grade data={item} user={item} title={data.lecture_name} goBack={() => handleToggleShowDetail(!showDetail)}/>}
  </>
}
export default ParticipantList