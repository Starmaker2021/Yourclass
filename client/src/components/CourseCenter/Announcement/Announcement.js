import React, {useEffect, useState} from 'react'
import {Button, Divider} from 'antd';
import ProForm, {ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import './announcement.less'
import NoticeService from '../../../services/notice';
const Announcement = ({courseId, role=null, idx}) => {
  const [announcement, updateAnnouncement] = useState([])
  /**
   * get notice list
   * @returns {Promise<void>}
   */
  const update = async () => {
    const res = await NoticeService.list({courseId:courseId})
    const {code, data} = res
    try{
      if(code===0){
        updateAnnouncement( data)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    if(idx === 'announcement'){
      update()
    }
  }, [idx])
  /**
     * submit announcement
     * @param obj
     */
  const handleSubmit =async (obj) => {
    const res = await NoticeService.add({courseId:courseId, title:obj.title, content:obj.content})
    const {code, data} = res
    try{
      if(code===0){
        updateAnnouncement([].concat(announcement, data))
      }
    }catch (e){
      console.log(e)
    }
  }
  /**
   * delete announcement
   * @param item
   * @param index
   */
  const handleDelete = async (item, index) => {
    const res = await NoticeService.del({id:item.id, courseId:item.course_id})
    try{
      const {code, data} = res
      if(code===0){
        let array = [...announcement]
        array.splice(index, 1)
        updateAnnouncement(array)
      }
    }catch (e){
      console.log(e)
    }
  }
  return <div className="container announcement-container">
    <h1>Announcement</h1>
    <Divider/>
    <div className="announcement-content">
      {announcement.length===0?
        <p>There is no announcement now!</p>:
        <ul>
          {announcement.map((item, index) => <li key={index}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            {role ==='lecturer' &&<Button size="small" onClick={() => {handleDelete(item, index)}}>Delete</Button>}
          </li>)}
        </ul>}
    </div>
    {role ==='lecturer'&&<>
      <Divider/>
      <ProForm
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
        onFinish={handleSubmit}
      >
        <ProFormText name="title" placeholder="title"/>
        <ProFormTextArea  name="content" placeholder="say something"/>
      </ProForm>
    </>
    }
  </div>
}
export default Announcement