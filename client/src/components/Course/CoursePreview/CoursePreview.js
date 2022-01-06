import React, {useState, useEffect} from 'react'
import {Divider, Image, message} from 'antd';
import {courseDetail, fallbackImage, server} from '../../../config/config';
import Modal from 'antd/es/modal/Modal';
import './coursePreview.less'
import CourseService from '../../../services/course';
import Rating from '../Rating/Rating';
import useModel from 'flooks';
import {user} from '../../../model/model';
export const CoursePreview = (props) => {
  const {data} = props
  const [showParticipate, handleShowParticipate] = useState(false)
  const [status, handleStatus] = useState('-1')
  const {isLogin, role, logout, updateUser} = useModel(user)
  /**
   *
   * @param e
   * @returns {Promise<void>}
   */
  const handlePay = async (e) => {
    e.preventDefault()
    handleShowParticipate(false)
    try{
      const res = await CourseService.purchase({
        courseId:data.course_id,
        lecturer:data.lecturer,
        lecturer_id:data.lecturer_id,
        amount:data.price
      })
      const {code, data:_data, message} = res
      if(code === 0){
        updateUser({balance:_data})
        props.handleShowDetail(false)
      }else{
        message.error(message)
      }
    }catch (e){
      console.log(e)
    }
  }
  /**
   *
   */
  const handleParticipate=(value) => {
    if(!isLogin){
      message.error('Not logged in yet.', 0.5, () => {
        props.history.push('/login')
      })
    }else{
      handleShowParticipate(value)
    }
  }
  /**
   * check purchase status
   * @returns {Promise<void>}
   */
  const checkPurchase = async () => {
    try{
      const res = await CourseService.checkPurchase({
        courseId:data.course_id
      })
      const {code, data:_data, message} = res
      if(code === 0){
        const {status='0'} = _data
        handleStatus(status || '-1')
      }else{
        message.error(message)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    if(isLogin){
      checkPurchase()
    }
  }, [])
  return (
    <article className="course-preview">
      <section className="header">
        <Image className="shortcut" src={server+data.cover} preview={false} fallback={fallbackImage} alt="your class"/>
        <div className="course-info">
          <h2>{data.course_name}</h2>
          <h3>Lecturer:{data.lecturer}</h3>
          <h3 style={{marginBottom:'12px'}} className="price">Price:{data.price}</h3>
          <Rating course_id={data.course_id}/>
          {status === '-1' && <a className="ghost-btn participate" onClick={(e) => {
            e.preventDefault()
            handleParticipate(true)
          }}>participate now</a>}
          {status === '0'&&<div style={{color:'#f00', fontWeight:'bold'}}>Paid, to be reviewed</div>}
          {status === '1'&&<div style={{color:'#f00', fontWeight:'bold'}}>Purchased</div>}
        </div>
      </section>
      <Divider/>
      <div className="description">
        <div className="description-left">
          <section>
            <h3>About this course</h3>
            <p style={{whiteSpace:'pre-line'}}>{data.description}</p>
          </section>
          {/*<section>*/}
          {/*  <h3>What you will learn</h3>*/}
          {/*  <ul>{data.goals.map((item) => <li key={item}>{item}</li>)}</ul>*/}
          {/*</section>*/}
        </div>
        <aside className="description-right">
          <ul>
            {
              courseDetail.map((item, index) => <li key={index} className="field">
                <div className="name">{item.icon}<span>{item.name}:</span></div>
                <div className="value">{data[item.key]}</div>
              </li>)
            }
          </ul>
        </aside>
      </div>
      <Modal
        maskClosable
        closable={true}
        title="Use WeChat to Pay"
        className="wechat-pay"
        visible={showParticipate}
        onCancel={() => handleParticipate(false)}
        footer={<a className="ghost-btn" onClick={handlePay}>I have paid</a>}
      >
        <div>{data.price||100}</div>
        <Image src={server+data.wechat} preview={false} fallback={fallbackImage}/>
      </Modal>
    </article>
  )
}