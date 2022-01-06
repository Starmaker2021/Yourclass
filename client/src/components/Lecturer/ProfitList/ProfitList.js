import React, {useEffect, useState} from 'react';
import ProTable from '@ant-design/pro-table';
import {Popconfirm, Space, Menu, Dropdown, Avatar, Button, message as Message} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import CourseService from '../../../services/course';
import {format} from 'date-fns';

const ProfitList= ({role=null, activeKey}) => {
  const [data, updateData] = useState([])
  const fetchData = async () => {
    try{
      const {code, data, message} = await CourseService.getProfit()
      if(code === 0){
        updateData(data)
      }else{
        Message.error(message)
      }
    }catch (e) {
      console.log(e)
    }
  }
  /**
     * handle Audit Result
     */
  const handleSubmit = async (type, data) => {
    try{
      const {code, message} = await CourseService.auditPurchase({
        amount:data.amount,
        id:data.id,
        learner_id: data.learner_id,
        lecturer_id: data.lecturer_id,
        type
      })
      if(code === 0){
        Message.success(message, 0.5, () => {
          fetchData()
        })
      }else{
        Message.error(message)
      }

    }catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if(activeKey === '3'){
      fetchData()
    }
  }, [activeKey])
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
      dataIndex: 'course_id',
      title: 'Course Id'
    },
    {
      dataIndex: 'learner_name',
      title: 'Learner Name'
    },
    {
      dataIndex: 'amount',
      title: 'Amount'
    },
    {
      dataIndex: 'date',
      title:'Date',
      render:(rowData) => format(rowData, 'yyyy-MM-dd HH:mm:ss')
    }
  ];
  return (
    <>
      <div className="user-list-container">
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
    </>
  )
}
export default ProfitList