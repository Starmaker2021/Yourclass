import React, {useEffect, useState} from 'react';
import ProTable from '@ant-design/pro-table';
import { Popconfirm, Space, Menu, Dropdown, Avatar } from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import './userList.less'
import StudentDetail from '../StudentDetail/StudentDetail';
import TeacherDetail from '../TeacherDetail/TeacherDetail';
import User from '../../../services/user';
import {dictModel, user} from '../../../model/model';
import useModel from 'flooks';

const UserList= ({role=null, hideDetail, handleHideDetail, activeKey}) => {
  const [showDetail, handleShowDetail] = useState(false)
  const [detailData, updateDetailData] = useState({})
  const [data, updateData] = useState([])
  const {dictMap} = useModel(dictModel)
  useEffect(() => {
    if(activeKey === role && showDetail===false){
      User.getUserList({role:role})
        .then((res) => {
          const {code, data} = res
          if(code === 0){
            updateData(data)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [role, activeKey, showDetail])
  useEffect(() => {
    if(hideDetail){
      handleShowDetail(false)
    }
  }, [hideDetail])
  useEffect(() => {
    if(showDetail){
      handleHideDetail(false)
    }
  }, [showDetail])
  const renderRemoveUser = (text) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否">
      <a>{text}</a>
    </Popconfirm>
  );
  const columns= [
    {
      dataIndex: 'avatar',
      title: '',
      valueType: 'avatar',
      width: 150,
      render: (dom, record) => (
        <Avatar size={64} icon={<UserOutlined />} />
      )
    },
    {
      dataIndex: 'id',
      title: 'ID'
    },
    {
      dataIndex: 'username',
      title: 'Name'
    },
    {
      dataIndex: 'subject',
      title: 'Subject',
      render:(data) => dictMap[data]
    },
    {
      dataIndex: 'detail',
      title: 'Detail',
      render:(data, rowData) => <a className="ghost-btn" onClick={(e) => {
        e.preventDefault()
        handleShowDetail(true)
        updateDetailData(rowData)
      }
      }>Detail</a>
    }
  ];
  return (
    <>
      <div className="user-list-container" style={{visibility:!showDetail?'visible':'hidden', height:!showDetail?'auto':0}}>
        <ProTable
          columns={columns}
          dataSource={data}
          rowKey="outUserNo"
          pagination={{
            showQuickJumper: true
          }}
          toolBarRender={false}
          search={false}
        />
      </div>
      {(showDetail&&role==='1')&& <TeacherDetail goBack={() => handleShowDetail(false)} data={detailData}/>}
      {(showDetail&&role==='2')&& <StudentDetail goBack={() => handleShowDetail(false)} data={detailData}/>}
    </>
  )
}
export default UserList