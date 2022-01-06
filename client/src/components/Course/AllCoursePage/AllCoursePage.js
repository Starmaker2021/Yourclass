import React, {useEffect, useState} from 'react';
import {CourseList} from '../CourseList/CourseList';
import { Pagination} from 'antd';
import './allCoursePage.less'
import {filter} from '../../../model/model';
import useModel from 'flooks';
import {CoursePreview} from '../CoursePreview/CoursePreview';
import CourseService from '../../../services/course';
import CourseFilter from './CourseFilter';
export default (props) => {
  const PAGE_SIZE = 40
  const [data, handleData] = useState([])
  const [current, handleCurrent] = useState(0)
  const [currentPageData, updateCurrentPageData] = useState([])
  const {subject, lecturer, date, search, updateFilter} = useModel(filter)
  const [showDetail, handleShowDetail] = useState(false)
  const [lecturerData, handleLecturerData] = useState([])
  const [sourceData, handleSourceData] = useState([])
  const filterLecturer = (data) => {
    const obj = {}
    const arr = []
    data.forEach((item) => {
      if(!obj[item.lecturer_id]){
        obj[item.lecturer_id] = true
        arr.push({
          name:item.lecturer,
          value:item.lecturer
        })
      }
    })
    return arr
  }
  const fetchData = async (params) => {
    try{
      const res = await CourseService.getList(params)
      const {data, code} = res
      if(code === 0){
        handleData(data)
        handleLecturerData(filterLecturer(data))
        handleSourceData([].concat(data))
      }
    }catch (e){
      console.log(e)
    }
  }
  //fetch data
  useEffect(() => {
    fetchData()
    handleCurrent(1)
  }, [])
  //data filter
  useEffect(() => {
    let _data = [].concat(sourceData)
    if(subject){
      _data = _data.filter((item) => item.subject_id === subject)
    }
    if(lecturer){
      _data = _data.filter((item) => item.lecturer === lecturer)
    }
    if(date[0]){
      const [startTime, endTime] = date
      _data = _data.filter((item) => (item.date <= endTime && item.date >=startTime))
    }
    handleData(_data)
  }, [subject, lecturer, date])
  // paging
  useEffect(() => {
    updateCurrentPageData(data.slice((current-1)*PAGE_SIZE, current*PAGE_SIZE))
  }, [current, data])
  const [item, updateItem] = useState({list:[], goals:[], detail:{}})
  useEffect(() => {
    fetchData({search})
  }, [search])
  return <>
    {
      !showDetail &&<div className="all-course-page">
        <CourseFilter data={data.filter} lecturer={lecturerData}/>
        <h2 className="title">All Subjects</h2>
        <CourseList data={currentPageData} onClick={(item) => {
          handleShowDetail(true)
          updateItem({...item, list:[], goals:[], detail:{}})
        }}/>
        <Pagination current={current} onChange={(current) => handleCurrent(current)} defaultCurrent={current}
          pageSize={PAGE_SIZE} total={data.length} showSizeChanger={false}/>
      </div>
    }
    {
      showDetail&&<CoursePreview handleShowDetail={handleShowDetail} data={item} history={props.history}/>
    }
  </>
}



