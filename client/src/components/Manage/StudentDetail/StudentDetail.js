import React, {useEffect, useState} from 'react';
import {Avatar, Divider, List, Skeleton} from 'antd';
import {RollbackOutlined, UserOutlined} from '@ant-design/icons';
import './studentDetail.less'
import CourseService from '../../../services/course';
const StudentDetail = ({data={}, goBack}) => {
  const {first_name, middle_name, last_name} = data
  const fullName = `${first_name} ${middle_name} ${last_name}`
  const [purchase, handlePurchase] = useState([])
  const fetchData = async () => {
    try{
      const res = await CourseService.getList({learner_id:data.id, type: 'purchase'})
      const {code, message} = res
      if(code ===0){
        handlePurchase(res.data)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <div className="student-detail">
    <Avatar size={56} icon={<UserOutlined/>}/>
    <div>
      <div className="user-info"><span className="label">ID</span>{data.id}</div>
      <div className="user-info"><span className="label">Name</span>{data.username}</div>
      <h2>Purchase History</h2>
      <Divider/>
      <List
        dataSource={purchase}
        header={<List.Item>
          <div>Purchase ID</div>
          <div>Course Name</div>
          <div>Subject</div>
          <div>Lecturer</div>
          <div>Price</div>
        </List.Item>}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <div>{item.purchase_id}</div>
              <div>{item.course_name}</div>
              <div>{item.subject_id}</div>
              <div>{item.lecturer}</div>
              <div>{item.price}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  </div>
}
export default StudentDetail