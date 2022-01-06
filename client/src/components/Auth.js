import React, {useEffect} from 'react'
import {user} from '../model/model';
import useModel from 'flooks';

/**
 * homepage redirect
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Auth = (props) => {
  const {isLogin, role} = useModel(user)
  useEffect(() => {
    if(isLogin){
      if(role ==='1'){
        props.history.push('/lecturer')
      }
      if(role ==='2'){
        props.history.push('/all')
      }
      if(role ==='0'){
        props.history.push('/admin')
      }
    }else{
      props.history.push('/all')

      // if(role ==='2'){
      //   props.history.push('/all')
      // }else{
      //   props.history.push('/login')
      // }
    }
  }, [isLogin])
  return <div></div>
}
export default Auth