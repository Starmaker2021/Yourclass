import React, {useState} from 'react';
import {Button, Divider, Form, Input, InputNumber, Select, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {server} from '../../../config/config';
export const CourseDetails=({next, prev, cancel, form}) => {
  const [loading, handleLoading] = useState(false)
  const handleCancel=() => {
    cancel()
  }
  const handleSubmit=() => {
    form.validateFields()
      .then((values) => {
        if(values){
          next()
        }
      })
      .catch((err) => console.log(err))
  }
  const [url, handleUrl] = useState('')
  const handleChange =(upload) => {
    const current = upload.file
    if(current.status === 'done'){
      handleUrl(server+current.response.url)
    }
  }
  return <div className="course-details">
    <h2>Course Details</h2>
    <Divider/>
    <Form.Item name="cover" label="Subject Cover">
      <Upload
        required
        name="photo"
        accept=".png, .jpg, .jpeg, .svg"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${server}/upload`}
        onChange={handleChange}
      >
        {url ? <img src={url} alt="avatar" style={{width: '100%'}}/> : <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>}
      </Upload>
    </Form.Item>
    <Form.Item rules={[{required: true, message: 'This is required.'}]} name="lecturer" label="Lecturer">
      <Input/>
    </Form.Item>
    <Form.Item rules={[{required: true, message: 'This is required.'}]} name="description" label="Description">
      <Input.TextArea/>
    </Form.Item>
    <div className="button-group">
      <Button onClick={handleSubmit}>Save and Continue</Button> <Button onClick={handleCancel}>Cancel</Button>
    </div>
  </div>
}