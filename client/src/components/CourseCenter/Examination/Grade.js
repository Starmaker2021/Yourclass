import React, {useState, useEffect} from 'react';
import ProForm, {ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import {Divider, message} from 'antd';
import './examinationDetail.less'
import {RollbackOutlined} from '@ant-design/icons';
import './grade.less'
import CourseService from '../../../services/course';
const Grade = ({data, goBack, user, title}) => {
  /**
     * submit answer
     * @param values
     */
  const handleSubmit = async (values) => {
    try{
      const res = await CourseService.updateExam({
        course_id:data.course_id,
        lecture_id:data.lecture_id,
        learner_id:data.learner_id,
        question:data.assignment,
        grade: values.grade,
        reference: values.reference
      })
      if(res.code === 0){
        message.success(res.message)
      }
    }catch (e){
      console.log(e)
    }
  }
  return <div className="container grade-container">
    <h1>
      Examination
      <span style={{margin:'0 8px'}}>/</span>
      <a onClick={(e) => {
        e.preventDefault()
        goBack()
      }}>{title}</a>
      <span style={{margin:'0 8px'}}>/</span>
      Grade</h1>
    <Divider/>
    <section>
      <h2>{data.username}'s Answer</h2>
      <p>{data.answer}</p>
    </section>
    <Divider/>
    <section>
      <ProForm
        initialValues={
          {
            grade: data.grade,
            reference: data.reference
          }
        }
        submitter={{
          searchConfig: {
            submitText: 'Submit'
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: 100
            }
          }

        }}
        onFinish={async (values) => handleSubmit(values)}
      >
        <h2>Grade</h2>
        <ProFormText width={160} name="grade" placeholder="Enter the grade"/>
        <Divider/>
        <h2>Answer</h2>
        <ProFormTextArea name="reference" placeholder="Enter the Answer"/>
      </ProForm>
    </section>
  </div>
}
export default Grade