import React, {useEffect, useState} from 'react'
import {Avatar, Divider, Form, Image} from 'antd';
import ProForm, {ProFormTextArea} from '@ant-design/pro-form';
import { UserOutlined} from '@ant-design/icons';
import {format} from 'date-fns'
import './discussionDetail.less'
const DiscussionDetail = ({goBack, title='', type, role, data={}, submitDiscussion}) => {
  const [form] = Form.useForm();
  return <div className="container discussion-detail-container">
    <h1><a onClick={(e) => {
      e.preventDefault()
      goBack()
    }}>Discussion</a>
    <span style={{margin: '0 8px'}}>/</span>
    {title}</h1>
    <Divider/>
    <ul className="discussion-list">
      {data.map((item, index) => <li key={index}>
        <div className="discussion-list-content">
          <Avatar size={32} icon={<UserOutlined/>}/>
          {(role === '2'&& type ==='1')&&<span className="username">{item.role_type === '2' ? 'Me' : 'Lecturer'}</span>}
          {(role === '2'&& type ==='2')&&<span className="username">{item.learner}</span>}
          {(role === '1')&&<span className="username">{item.role_type === '2' ?title:'Me'}</span>}
          <p className="comments">{item.content}</p>
        </div>
        <span className="date">{format(item.date, 'yyyy-MM-dd HH:mm:ss')}</span>
      </li>)}
    </ul>
    <ProForm
      form={form}
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
      onFinish={(content) => {
        submitDiscussion(content)
        form.resetFields()
      }}
    >
      <ProFormTextArea width="xl" name="content" placeholder="say something"/>
    </ProForm>
  </div>
}
export default DiscussionDetail