import React, {useState, useEffect} from 'react';
import {Avatar, Button, Divider, Image, List, Skeleton, message as Message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './teacherDetail.less'
import { fallbackImage, server} from '../../../config/config';
import LecturePreview from '../../Course/LecturePreview/LecturePreview';
import CourseService from '../../../services/course';
import User from '../../../services/user';
const TeacherDetail = ({data={}, goBack}) => {
  const [showPreview, handleShowPreview] = useState(false)
  const [lecture, updateLecture] = useState({})
  const {first_name, middle_name, last_name} = data
  const fullName = `${first_name} ${middle_name} ${last_name}`
  const [uploaded, handleUploaded] = useState([])
  const handleDelete = async (data) => {
    try{
      const res = await CourseService.delLecture({course_id:data.course_id, lecture_id:data.lecture_id, lecturer_id:data.lecturer_id})
      if(res.code === 0){
        handleUploaded(res.data)
      }
    }catch (e) {
      console.log(e)
    }
  }
  const fetchData = async () => {
    try{
      const res = await CourseService.getList({lecturer_id:data.id})
      const {code, message} = res
      if(code ===0){
        handleUploaded(res.data)
      }
    }catch (e){
      console.log(e)
    }
  }
  const handleSubmit = async (type) => {
    try{
      const {code, message} = await User.verify({
        type,
        id:data.id
      })
      if(code === 0){
        Message.success(message, 0.5, () => {
          goBack()
        })
      }else{
        Message.error(message)
      }
    }catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <>
    {!showPreview&&<div className="teacher-detail">
      <Avatar size={56} icon={<UserOutlined/>}/>
      <div>
        <div className="user-info"><span>ID</span>{data.id}</div>
        <div className="user-info"><span>Name</span>{data.username}</div>
        <div className="user-info"><span>Certificate</span>
          <Image
            alt={data.title}
            width={200}
            height={120}
            src={server+data.certificate}
            fallback={fallbackImage}
          />
        </div>
        <div className="user-info"><span>Verify:</span>
          {
            data.verified === '1'?(data.valid === '1'?'REJECT':'PASS'):<div>
              <Button type="primary" onClick={(e) => {
                e.preventDefault()
                handleSubmit('pass')
              }} style={{marginRight:'8px'}}>PASS</Button>
              <Button type="primary" danger onClick={(e) => {
                e.preventDefault()
                handleSubmit('reject')
              }} >REJECT</Button>
            </div>
          }
        </div>
        <h2>Uploaded History</h2>
        <Divider/>
        <List
          dataSource={uploaded}
          header={<List.Item>
            <div>CourseName</div>
            <div>Lecture Name</div>
            <div>Chapter No.</div>
            <div>Lecture No.</div>
            <div>Type</div>
            <div>Details</div>
            <div>Option</div>
          </List.Item>}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <div>{item.course_name}</div>
                <div>{item.lecture_name}</div>
                <div>{item.c_idx}</div>
                <div>{item.idx}</div>
                <div>{item.type}</div>
                <div>
                  <a className="ghost-btn" onClick={(e) => {
                    e.preventDefault()
                    updateLecture(item)
                    handleShowPreview(true)
                  }}>Detail</a>
                </div>
                <div>
                  <a className="ghost-btn" onClick={(e) => {
                    e.preventDefault()
                    handleDelete(item)
                  }}>Delete</a>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>}
    {showPreview&&<LecturePreview title={'dddd'} data={lecture} handleShowPreview={handleShowPreview}/>}
  </>
}
export default TeacherDetail