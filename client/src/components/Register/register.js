import React, {useState, useEffect} from 'react';
import {Button, Card,  Form, Input, message, Tooltip, Select, Upload} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import User from '../../services/user';
import useModel from 'flooks';
import {dictModel} from '../../model/model';
import {server} from '../../config/config';
import * as _ from 'lodash'
/**
 * register
 * @param props
 * @returns {JSX.Element}
 */
export default  (props) => {
  const {dict} = useModel(dictModel)
  useEffect(() => {
  }, [])
  const [showUpload, handleShowUpload] = useState(true)
  const {role='1'} = props.location?.state||{}
  const [form] = Form.useForm();
  const onFinish = (values, ...rest) => {
    const {role, certificate } = values
    let certificateUrl = ''
    if(role === '1'){
      if(!certificate){
        return message.error('You should upload your certificate.')
      }
      certificate.forEach((item) => {
        if(item.status === 'done'){
          certificateUrl = _.get(item, 'response.url')||''
        }
      })
      if(certificateUrl === ''){
        return message.error('You should upload your certificate.')
      }
    }
    values.certificate = certificateUrl
    User.register(values).then((res) => {
      if(res.code === 0){
        message.success(res.msg, () => {props.history.push('/')})
      }else{
        message.error(res.msg)
      }
    }).catch((err) => {
      console.error(err)
    })
  };
  const normFile = (e) => {
    if(e.fileList&& e.fileList.length>0){
      handleShowUpload(false)
    }else{
      handleShowUpload(true)
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return   <Card
    style={{
      width: 330,
      margin: '64px auto'
    }}
  >
    <Form
      form={form}
      name="register"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        role:role
      }}
      scrollToFirstError
    >
      <Form.Item
        name="role"
        label="role"
        style={{display:'none'}}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'This is required.'
          }, {
            pattern:/^\w{4,20}$/g,
            message:'4~20 word characters required.'
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'This is required.'
          }, {
            pattern:/^\w{1,20}$/g,
            message:'1~20 word characters required.'
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="middleName"
        label="Middle Name(optional)"
        hasFeedback
        rules={[{
          pattern:/^\w{1,20}$/g,
          message:'1~20 word characters required.'
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'This is required.'
          }, {
            pattern:/^\w{1,20}$/g,
            message:'1~20 word characters required.'
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'This is required.'
          }, {
            pattern:/^\w{6,20}$/g,
            message:'6~20 word characters required.'
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'This is required.'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Passwords did not match.');
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      {
        role==='1'&&<>
          <Form.Item name="subject" label="Subject" required>
            <Select>
              {dict.map((item) => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="certificate"
            label="Teacher Qualification Certificate"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            {<Upload
              name="photo"
              accept=".png, .jpg, .jpeg, .svg"
              action={`${server}/upload`}
              listType="picture" >
              {showUpload&&<Button icon={<UploadOutlined/>}>Click to upload</Button>}
            </Upload>}
          </Form.Item>

        </>
      }
      <Form.Item>
        <Button style={{width:'100%'}} type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  </Card>
};
