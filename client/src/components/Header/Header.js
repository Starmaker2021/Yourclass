import React from 'react';
import {filter, user} from '../../model/model';
import useModel from 'flooks';
import './header.less'
import {Link} from 'react-router-dom';
import Search from 'antd/es/input/Search';
import {message, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import User from '../../services/user';
const { confirm } = Modal;
import storage from '../../utils/storage'


/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Header = (props) => {
  const {subject, lecturer, date, updateFilter} = useModel(filter)
  // search
  const onSearch = (value) => {
    updateFilter({
      search:value
    })
  }
  const {isLogin, role, logout} = useModel(user)
  return <div className="main-header">
    <div className="navbar-header">
      <a className="navbar-brand" onClick={(e) => e.preventDefault()}>
        <Link to={'/'}>Your Class</Link>
      </a>
      {role === '2' && <Search placeholder="search course" onSearch={onSearch} style={{width: 200}}/>}
    </div>
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-right">
        {(role===undefined || role === '0')&&<li>
          <Link to={isLogin?{pathname:'/admin'}:{pathname:'/login', state:{role:'0'}}}>Manager</Link>
        </li>}
        {role==='2'&&<li>
          <Link to={'/learner'}>My Class</Link>
        </li>}
        {role==='1'&&<li>
          <Link to={'/lecturer'}>My Class</Link>
        </li>}
        {isLogin&&<li className="switch-login">
          <a onClick={(e) => {
            e.preventDefault()
            confirm({
              title: 'Do you want to sign out?',
              icon: <ExclamationCircleOutlined />,
              onOk() {
                User.logout().then((res) => {
                  if(res.code ===0){
                    storage.remove('user')
                    window.location.href='/login'
                  }

                })
              },
              onCancel() {}
            });
          }}>Sign Out</a>
        </li>}
        {
          !isLogin&&<li>
            <Link to={'/login'}>Login</Link>
          </li>
        }
      </ul>
    </div>
  </div>
}
export default Header