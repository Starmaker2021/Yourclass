import React, {useEffect, useState} from 'react';
import Announcement from '../Announcement/Announcement'
import Examination from '../Examination/Examination';
import Discussion from '../Discussion/Discussion';
import {Image, Tabs} from 'antd';
import {CommentOutlined, MailOutlined, ReadOutlined, RollbackOutlined} from '@ant-design/icons';
import {fallbackImage, server} from '../../../config/config';
import LectureList from '../LectureList/LectureList';
import {courseDetail} from '../../../mock';
import Grades from '../Grades/Grades';
import LearningProgress from '../LearningProgress/LearningProgress';
import * as _ from 'lodash'
const {TabPane} = Tabs
import './learnerCenter.less'
import Rating from '../../Course/Rating/Rating';
/***
 * 與課程ID相關
 * @returns {JSX.Element}
 * @constructor
 */
const LearnerCenter = (props) => {
  const [course, updateCourse] = useState(_.get(props, 'location.state.data'))
  const [idx, handleIdx] = useState('1')
  return <div className="lecturer-center learner-center">
    <div className="header">
      <div className="shortcut">
        <div className="btn" onClick={() => {props.history.goBack()}}>Go Back<RollbackOutlined /></div>
      </div>
      <div className="description">
        <h1>{course.course_name}</h1>
        <div>{course.lecturer}</div>
      </div>
    </div>
    <Tabs activeKey={idx} onTabClick={(index) => handleIdx(index)} tabPosition={'left'} tabBarGutter={0}>
      <TabPane tab={<><MailOutlined/>Learning Progress</>} key="1">
        <LearningProgress role="learner" course={course} idx={idx}/>
      </TabPane>
      <TabPane tab={<><MailOutlined/>Announcement</>} key="announcement">
        <Announcement role="learner"  courseId={course.course_id} idx={idx}/>
      </TabPane>
      <TabPane tab={<><MailOutlined/>Course Content</>} key="3">
        <LectureList course={course.chapter} courseId={course.course_id} role="learner"/>
      </TabPane>
      <TabPane tab={<><MailOutlined/>Grades</>} key="grades">
        <Grades idx={idx} course={course} role="learner" history={props.history}/>
      </TabPane>
      <TabPane tab={<><ReadOutlined/>Examination</>} key="5">
        <Examination role="learner" course={course}/>
      </TabPane>
      <TabPane tab={<><CommentOutlined/>Discussion</>} key="6">
        <Discussion course={course} type={'1'}/>
      </TabPane>
    </Tabs>
    <div className="cover">
      <Image
        width={210}
        height={146}
        src={server+course.cover}
        fallback={fallbackImage}
        preview={false}
      />
      <Rating course_id={course.course_id} type="pro"/>
    </div>
  </div>
}
export default LearnerCenter