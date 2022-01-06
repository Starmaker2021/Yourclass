import React, {useState, useEffect} from 'react';
import ProForm, {ProFormTextArea} from '@ant-design/pro-form';
import {Divider} from 'antd';
import './examinationDetail.less'
import {RollbackOutlined} from '@ant-design/icons';
import CourseService from '../../../services/course';
const ExaminationDetail = ({data, goBack}) => {
  const [response, updateResponse] = useState({})
  /**
   * fetch data
   */
  const fetchData = async () => {
    try{
      const res = await CourseService.getExam({
        lecture_id:data.lecture_id
      })
      const {code,  message} = res
      if(code === 0){
        updateResponse({...response, answer:res.data.answer})
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  /**
   * submit answer
   * @param values
   */
  const handleSubmit = async (values) => {
    const res = await CourseService.updateExam({
      course_id:data.course_id,
      lecturer_id:data.lecturer_id,
      lecture_id:data.lecture_id,
      question:data.assignment,
      answer:values.answer
    })
    updateResponse({...response, answer:values.answer})
  }
  return <div className="container examination-detail-container">
    {/*<h1>Examination<RollbackOutlined onClick={goBack}/></h1>*/}
    <h1><a onClick={(e) => {
      e.preventDefault()
      goBack()
    }}>Examination</a><span style={{margin:'0 8px'}}>/</span>{data.lecture_name}</h1>
    <Divider/>
    <section>
      <h2>Questions</h2>
      <p style={{whiteSpace:'pre-line'}}>{data.assignment}</p>
    </section>
    <Divider/>
    <section>
      <h2>MyAnswer</h2>
      {response.answer ? <p>{response.answer}</p>: <ProForm
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
        <ProFormTextArea name="answer" placeholder="my answer"/>
      </ProForm>}
    </section>
  </div>
}
export default ExaminationDetail