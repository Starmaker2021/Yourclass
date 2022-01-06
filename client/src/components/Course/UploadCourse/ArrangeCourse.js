import React, {useState, useEffect} from 'react';
import {Button, Card, Collapse, Divider, Radio, Form, Input, Select, Upload, message} from 'antd';
import {DeleteOutlined, LoadingOutlined, PlusOutlined, SettingOutlined, UploadOutlined} from '@ant-design/icons';
import {server} from '../../../config/config';
const {Panel} = Collapse;
export const ArrangeCourse=({cancel, history, submitCourse}) => {
  const [contentForm] = Form.useForm()
  const [lectureData, updateLectureData] = useState([])
  const [selected, handleSelected] = useState({
    chapterIndex:0,
    lectureIndex:0
  })
  const [course, updateCourse] = useState([{
    charterName:'',
    lecture:[{
      type:'video'
    }]
  }])
  const [arrange, updateArrange] = useState([])
  /**
   *
   * @param value
   * @param index
   */
  const onCharterNameChange = ({value, index}) => {
    const _course = [...course]
    _course[index].charterName = value
    updateCourse(_course)
  }
  /**
   *
   * @param index
   */
  const handleChapterAdd = (index) => {
    updateCourse([...course, {
      charterName:'',
      lecture:[{
        type:'video'
      }]
    }])
  }
  /**
   *
   * @param index
   */
  const handleChapterRemove = (index) => {
    if(course.length===1){
      return message.info('s')
    }
    const _course = [...course]
    _course.splice(index, 1)
    updateCourse(_course)
  }
  /**
   *
   * @param courseIndex
   * @param index
   */
  const handleLectureAdd = (courseIndex) => {
    const _course = [...course]
    _course[courseIndex]['lecture'].push({
      type:'video'
    })
    updateCourse(_course)
  }
  /**
   *
   * @param courseIndex
   * @param index
   */
  const handleLectureRemove = (courseIndex, index) => {
    const _course = [...course]
    _course[courseIndex]['lecture'].splice(index, 1)
    updateCourse(_course)
  }
  /**
   *
   * @param chapterIndex
   * @param lectureIndex
   */
  const activeStatus = (chapterIndex, lectureIndex) => selected.chapterIndex === chapterIndex && selected.lectureIndex ===lectureIndex ? 'lecture-item active':'lecture-item'
  const handleVideoUpload = (upload) => {
    const current = upload.file
    if(current.status === 'done'){
      const _course = [...course]
      const lecture = _course[selected.chapterIndex]['lecture'][selected.lectureIndex]
      lecture.video = current.response.url
      updateCourse(_course)
    }
  }
  /**
   * handle lecture change
   * @param target
   * @param e
   */
  const handleInputChange = (target, e) => {
    const _course = [...course]
    const lecture = _course[selected.chapterIndex]['lecture'][selected.lectureIndex]
    if(target !== 'video'){
      lecture[target] = e.target.value
    }
    updateCourse(_course)
  }
  /**
   * handle submit course
   */
  const handleSubmit=() => {
    submitCourse(course)
  }
  useEffect(() => {
    contentForm.resetFields()
    const data = course[selected.chapterIndex]['lecture'][selected.lectureIndex]
    updateLectureData(data)
    contentForm.setFieldsValue({...data})
  }, [selected])
  return <div className="arrange-course">
    <h2>Arrange Course</h2>
    <Divider/>
    <div className="course-manage">
      <Card className="course-root">
        <Collapse
        >{
            course.map((_course, index) =>
              <Panel
                key={index}
                header={<Input
                  onClick={(e) => {e.stopPropagation()}}
                  value={_course.charterName||`chapter ${index}`}
                  onChange={(e) => onCharterNameChange({value:e.currentTarget.value, index:index})}/>} key={index}
                extra={<>
                  <PlusOutlined onClick={(event) => {
                    handleChapterAdd(index)
                    event.stopPropagation();
                  }}
                  />
                  {course.length>1&&<DeleteOutlined
                    onClick={(event) => {
                      handleChapterRemove(index)
                      event.stopPropagation();
                    }}
                  />}
                </>}>
                {_course.lecture&&_course.lecture.map((lecture, idx) =>
                  <div key={idx} className={ activeStatus(index, idx)}
                    onClick={() => handleSelected(
                      {
                        chapterIndex:index,
                        lectureIndex:idx
                      }
                    )}>
                    <div>
                      {(idx === _course.lecture.length-1)&&<PlusOutlined onClick={(event) => {
                        handleLectureAdd(index)
                        event.stopPropagation();
                      }}/>}
                      {_course.lecture.length>1&&<DeleteOutlined onClick={(event) => {
                        handleLectureRemove(index, idx)
                        event.stopPropagation();
                      }}/>}
                    </div>
                    {lecture.lectureName}
                  </div>)
                }
              </Panel>)
          }
        </Collapse>
      </Card>
      <Form form={contentForm}>
        <Card className="lecture-detail">
          <h3>Course Content</h3>
          <Divider/>
          <Form.Item rules={[{required: true, message: 'This is required.'}]} name="type"  label="Type" onChange={(e) => handleInputChange('type', e)}>
            <Radio.Group value={lectureData.type}>
              <Radio value="video">Video</Radio>
              <Radio value="document">Document</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item  rules={[{required: true, message: 'This is required.'}]} name="lectureName" label="Lecture Name" onChange={(e) => handleInputChange('lectureName', e)}>
            <Input value={lectureData.lectureName} />
          </Form.Item>
          {lectureData.type === 'video'&& < Form.Item rules={[{required: true, message: 'This is required.'}]} name="video" label="Video" onChange={(e) => handleInputChange('video', e)}>
            <Upload
              required
              name="photo"
              accept=".mp4, .mpeg, .webm, .ogg"
              action={`${server}/upload`}
              listType="text"
              onChange={handleVideoUpload}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>}
          {lectureData.type === 'document'&&<Form.Item rules={[{required: true, message: 'This is required.'}]} name="document" label="Document" onChange={(e) => handleInputChange('document', e)}>
            <Input.TextArea value={lectureData.document}/>
          </Form.Item>}
          <h3>Assignment</h3>
          <Divider/>
          <Form.Item name="assignment" label="Upload assignment"  onChange={(e) => handleInputChange('assignment', e)}>
            <Input.TextArea  value={lectureData.assignment}/>
          </Form.Item>
        </Card>
      </Form>
    </div>
    <div className="button-group">
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  </div>
}