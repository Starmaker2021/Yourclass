import React, {useEffect, useState} from 'react';
import {Image, Tabs} from 'antd';
const {TabPane} = Tabs
import * as _ from 'lodash'
import './lecturerCenter.less'
import { CommentOutlined, MailOutlined, ReadOutlined, RollbackOutlined} from '@ant-design/icons';
import {fallbackImage, server} from '../../../config/config';
import Announcement from '../Announcement/Announcement';
import Examination from '../Examination/Examination';
import LecturerChat from '../Discussion/LecturerChat';
/***
 * lecturer center
 * @returns {JSX.Element}
 * @constructor
 */
const LectureCenter = (props) => {
  const course =_.get(props, 'location.state.data')||{}
  const [idx, handleIdx] = useState('announcement')
  return <div className="lecturer-center">
    <div className="header">
      <div className="shortcut">
        <div className="btn" onClick={() => {props.history.goBack()}}>Go Back<RollbackOutlined /></div>
      </div>
      <div className="description">
        <h1>{course.course_name}</h1>
        <div>{course.lecturer||'unknown'}</div>
      </div>
    </div>
    <Tabs activeKey={idx} onTabClick={(index) => handleIdx(index)} tabPosition={'left'} tabBarGutter={0}>
      <TabPane tab={<><MailOutlined />Announcement</>} key="announcement">
        <Announcement role="lecturer" courseId={course.course_id} idx={idx}/>
      </TabPane>
      <TabPane tab={<><ReadOutlined />Grade Exam</>} key="2">
        <Examination role="lecturer"  course={course} />
      </TabPane>
      <TabPane tab={<><CommentOutlined />Discussion</>} key="chat">
        <LecturerChat courseId={course.course_id} lecturerId={course.lecturer_id} idx={idx}/>
      </TabPane>
    </Tabs>
    <div className="cover">
      <Image
        width={210}
        height={146}
        src={server +course.cover}
        fallback={fallbackImage}
      /></div>
  </div>
}
export default LectureCenter