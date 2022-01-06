import React from 'react';
import {Avatar, Image} from 'antd';
import {greetings} from '../../utils/greetings';
import './default.less'
import {UserOutlined} from '@ant-design/icons';
import useModel from 'flooks';
import {user} from '../../model/model';
export const Welcome = () => {
  const {fullName, balance=0} = useModel(user)
  return <div className="ph50 welcome" style={{display: 'flex', alignItems: 'center'}}>
    <Avatar size={80} icon={<UserOutlined/>}/>
    <div>
      <h2>{greetings()},{fullName}!</h2>
      <div>Balance: {balance}</div>
    </div>
  </div>
}