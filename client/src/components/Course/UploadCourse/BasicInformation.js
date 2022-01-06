import React, {useState} from 'react';
import {Button, Divider, Form, Input, InputNumber, Select, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import useModel from 'flooks';
import {dictModel} from '../../../model/model';
import {server} from '../../../config/config';
export const BasicInformation=({next, prev, cancel, form}) => {
  const [loading, handleLoading] = useState(false)
  const {dict} = useModel(dictModel)
  const [subclassData, updateSubclassData] = useState([])
  const handleSubmit=() => {
    form.validateFields()
      .then((values) => {
        if(values){

          next()
        }
      })
      .catch((err) => console.log(err))
  }
  const handleCancel=() => {
    cancel()
  }
  const [url, handleUrl] = useState('')
  const handleChange =(upload) => {
    const current = upload.file
    if(current.status === 'done'){
      handleUrl(server+current.response.url)
    }
  }
  return <div className="basic-information">
    <h2>Basic Information</h2>
    <Divider/>
    <div className="basic-form">
      <div className="form-left">
        <Form.Item rules={[{required: true, message: 'This is required.'}]} required name="subject" label="Subject">
          <Select onChange={(value, option) => {
            updateSubclassData(dict[option.key]['subclass'])
            form.setFieldsValue({
              subclass: null
            })
          }}>
            {dict.map((item, idx) => <Select.Option value={item.value} key={idx}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item rules={[{required: true, message: 'This is required.'}]} required name="subclass" label="Subject Subclass">
          <Select>
            {subclassData.map((item, idx) => <Select.Option value={item.value} key={idx}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item rules={[{required: true, message: 'This is required.'}]} required name="courseName" label="Course Name">
          <Input/>
        </Form.Item>
        <Form.Item rules={[{required: true, message: 'This is required.'}]} required name="price" label="Price">
          <InputNumber/>
        </Form.Item>
        <Form.Item rules={[{required: true, message: 'This is required.'}]} required name="hours" label="Total Class Hours">
          <InputNumber/>
        </Form.Item>
      </div>
      <div className="form-right">
        <Form.Item name="wechat" required label="Wechat QR Code">
          <Upload
            accept=".png, .jpg, .jpeg, .svg"
            name="photo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${server}/upload`}
            // beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {url ? <img src={url} alt="avatar" style={{height: '100%'}}/> : <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>}
          </Upload>
        </Form.Item>
      </div>
    </div>
    <div className="button-group">
      <Button onClick={handleSubmit}>Save and Continue</Button> <Button onClick={handleCancel}>Cancel</Button>
    </div>
  </div>
}