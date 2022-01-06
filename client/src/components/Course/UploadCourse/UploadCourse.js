import React from 'react';
import './uploadCourse.less'
import { Form, Tabs, message as Message} from 'antd';
import {BasicInformation} from './BasicInformation';
import {CourseDetails} from './CourseDetails';
import {ArrangeCourse} from './ArrangeCourse';
import './uploadCourse.less'
import CourseService from '../../../services/course';
import * as _ from 'lodash'
const {TabPane} = Tabs
const UploadCourse = ({history, switchTabIndex}) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState('1');
  /**
   *
   */
  const next = () => {
    setCurrent(( 1+ Number(current)).toString());
  };
  /**
   *
   */
  const prev = () => {
    setCurrent((current - 1).toString());
  };
  const cancel =() => {
    setCurrent('1')
  }
  const submitCourse = (data) => {
    const formData = form.getFieldsValue()
    const lectureData = data
    const {description, hours, lecturer, price, subclass, subject, courseName}=formData
    const wechat = _.get(formData, 'wechat.file.response.url')||''
    const cover = _.get(formData, 'cover.file.response.url')||''
    // const params = {
    //   ...form.getFieldsValue(),
    //   arrange: data
    // }
    const params = [];
    let count = 0;
    lectureData.map((chapter, index) => {
      const chapterName = chapter.charterName || `chapter ${index+1}`
      chapter.lecture.forEach((lecture) => {
        params.push({
          chapterName:chapterName,
          description,
          hours,
          lecturer,
          price,
          subclass,
          subject,
          courseName,
          wechat,
          cover,
          index:count,
          chapterIndex:index,
          ...lecture
        })
        count += 1
      })
    })

    CourseService.add(params)
      .then((res) => {
        const {code, message} = res
        if(code === 0){
          Message.success(message)
          switchTabIndex('1')
        }else{
          Message.error(message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Form className="upload-course" form={form}>
      <Tabs activeKey={current}>
        <TabPane tab="01 Basic Information" key="1">
          <BasicInformation next={next} prev={prev} cancel={cancel} form={form}/>
        </TabPane>
        <TabPane tab="02 Course Details" key="2">
          <CourseDetails next={next} prev={prev} cancel={cancel} form={form}/>
        </TabPane>
        <TabPane tab="03 Arrange Course" key="3">
          <ArrangeCourse next={next} prev={prev} cancel={cancel} history={history} submitCourse={submitCourse}/>
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default UploadCourse