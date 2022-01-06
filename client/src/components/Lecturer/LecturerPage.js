import React, {useState, useEffect} from 'react';
import {Welcome} from '../Welcome/Welcome';
import {Tabs} from 'antd';
import './LecturerPage.less'
import {studentListData, teacherListData} from '../../mock';
import {CourseList} from '../Course/CourseList/CourseList';
import UploadCourse from '../Course/UploadCourse/UploadCourse';
import CourseService from '../../services/course';
import ProfitList from './ProfitList/ProfitList';
const { TabPane } = Tabs;
export default ({studentList=studentListData, teacherList=teacherListData, ...props}) => {
  const [tabIndex, switchTabIndex] = useState('1')
  const [data, updateData] = useState([])
  useEffect(() => {
    if(tabIndex === '1'){
      CourseService.getList().then((res) => {
        const {data, code} = res
        if(code === 0){
          updateData(data)
        }
      })
    }
  }, [tabIndex])
  return <div className="lecture-page">
    <Welcome/>
    <div className="card-container">
      <Tabs type="card" onTabClick={(idx) => {
        switchTabIndex(idx)
      }}
      activeKey={tabIndex}
      >
        <TabPane tab="Uploaded Course"  key="1">
          <CourseList data={data} onClick={(data) => {props.history.push('/lecturer/course', {data:data})}}/>
        </TabPane>
        <TabPane tab="Upload Course" key="2">
          <UploadCourse history={props.history} switchTabIndex={switchTabIndex}/>
        </TabPane>
        <TabPane tab="Profit List" key="3">
          <ProfitList activeKey={tabIndex}/>
        </TabPane>
      </Tabs>
    </div>
  </div>
}