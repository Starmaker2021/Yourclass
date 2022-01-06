import React, {useState, useEffect} from 'react';
import {Welcome} from '../Welcome/Welcome';
import {Button, Form, Input, InputNumber, Tabs, message as Message} from 'antd';
import './LearnerPage.less'
import Mock from 'mockjs';
import {CourseList} from '../Course/CourseList/CourseList';
import CourseService from '../../services/course';
import PriceInput from './PriceInput';
import User from '../../services/user';
import useModel from 'flooks';
import {user} from '../../model/model';
const { TabPane } = Tabs;

const LearnerPage = (props) => {
  const {isLogin, role, logout, updateUser} = useModel(user)
  const [hideDetail, handleHideDetail] = useState(false)
  const [form] = Form.useForm();
  const [data, updateData] = useState([])
  useEffect(() => {
    CourseService.getList({type:'purchase'}).then((res) => {
      const {data, code} = res
      if(code === 0){
        updateData(data)
      }
    })
  }, [])
  const onFinish = async (values) => {
    try{
      const {code, data:{balance}, message} = await User.deposit({amount:values.amount.number})
      if(code === 0){
        Message.success(message, 0.2, () => {
          updateUser({
            balance:balance
          })
        })
      }else{
        Message.error(message)
      }
    }catch (e) {
      Message.error('Deposit Error')
    }
  };
  const checkAmount = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  return <div className="learner-page">
    <Welcome/>
    <div className="card-container">
      <Tabs type="card" onTabClick={() => {
        handleHideDetail(true)
      }}>
        <TabPane tab="My Course"  key="1">
          <CourseList data={data} onClick={(data) => {props.history.push('/learner/course', {data})}}/>
        </TabPane>
        <TabPane tab="Deposit"  key="2">
          <Form
            name="customized_form_controls"
            layout="inline"
            onFinish={onFinish}
            initialValues={{
              price: {
                number: 0
              }
            }}
          >
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  validator: checkAmount
                }
              ]}
            >
              <PriceInput />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Deposit
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  </div>
}
export default LearnerPage