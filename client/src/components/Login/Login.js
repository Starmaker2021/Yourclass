import React, {useState, useEffect} from 'react';
import {Card, Form, message as Message} from 'antd';
import ProForm, {ProFormRadio, ProFormText} from '@ant-design/pro-form';
import {UserOutlined, LockOutlined, SafetyOutlined} from '@ant-design/icons';
import useModel from 'flooks';
import {user} from '../../model/model';
import User from '../../services/user';
/**
 * login
 * @param type ('0':learner,'1':lecture)
 * @returns {JSX.Element}
 * @constructor
 */
const Login = ({type='0', ...props}) => {
  const [openCaptcha, handleOpenCaptcha] = useState(false)
  const {isLogin, login} = useModel(user)
  const handleLogin = (formData) => {
    const role = formData.role==='learner'?'2':(formData.role==='lecturer'?'1':'0')
    User.login({
      role:role,
      username:formData.username,
      password:formData.password
    })
      .then((res) => {
        const {code, data, message} = res
        if(code === 0){
          login({isLogin: true, username:data.username, role:data.role, fullName:data.fullName, balance:data.balance})
          switch (data.role){
            case '0':
              props.history.push('/admin')
              break;
            case '1':
              props.history.push('/lecturer')
              break;
            default:
              props.history.push('/learner')
          }
          Message.success(message)
        }else {
          login({isLogin: false, username:undefined, role:undefined, fullName:undefined, balance:0})
          Message.error(message)
        }
      })
      .catch((err) => {
        console.log(err)
        login(false)
      })
  }
  // useEffect(() => {
  //   if(isLogin){
  //     if(role === '0'){
  //       props.history.push('/lecturer')
  //     }else{
  //       props.history.push('/')
  //     }
  //   }
  // }, [isLogin])
  const [form] = Form.useForm();

  return (
    <div style={{height:'100%', display:'flex'}}>
      <Card
        style={{
          width: 330,
          margin: 'auto'
        }}
      >
        <ProForm
          form={form}
          onFinish={async (formData) => {
            handleLogin(formData)
          }}
          submitter={{
            searchConfig: {
              submitText: 'Login'
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              size: 'large',
              style: {
                width: '100%'
              }
            }
          }}
        >
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />
            }}
            name="username"
            placeholder="Username"
            rules={[
              {
                required: true,
                message: 'This is required.'
              }, {
                pattern:/^\w{4,20}$/g,
                message:'4~20 word characters required.'
              }
            ]}
          />
          <ProFormText.Password
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />
            }}
            name="password"
            placeholder="Password"
            rules={[
              {
                required: true,
                message: 'This is required.'
              }, {
                pattern:/^\w{6,20}$/g,
                message:'6~20 word characters required.'
              }
            ]}
          />
          {!props.location.state && <ProFormRadio.Group
            name="role"
            initialValue="learner"
            options={['lecturer', 'learner']}
          />}
          {openCaptcha&&<ProFormText
            fieldProps={{
              size: 'large',
              suffix: <img src={'/'} alt={'your class'} onClick={
                async () => {
                  await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(true);
                    }, 1000);
                  })
                }}/>,
              prefix: <SafetyOutlined/>
            }}
            name="captcha"
            placeholder="Captcha"
            rules={[
              {
                required: true,
                message: 'captcha!'
              }
            ]}
          />}
        </ProForm>
        <div style={{marginTop:'8px'}}>
          <span style={{marginRight:'8px'}}>New to Your Class?</span>
          <a onClick={(e) => {
            e.preventDefault()
            let role = form.getFieldValue('role')
            const roleCode =role==='learner'?'2':(role==='lecturer'?'1':'0')
            props.history.push('/register', {role:roleCode})
          }}>register</a>
        </div>
      </Card>
    </div>
  );
};
export default Login