import React, {useState, useEffect} from 'react'
import {Divider, Table} from 'antd';
import './grades.less'
import GradeDetail from './GradeDetail'
import CourseService from '../../../services/course';
const { Column  } = Table;
/**
 *
 * @param history
 * @param idx
 * @param course
 * @returns {JSX.Element}
 * @constructor
 */
const Grades = ({history, idx, course}) => {
  const [showDetail, handleShowDetail] = useState(false)
  const [data, updateData] = useState([])
  const [item, handleItem] = useState({})
  const fetchData = async () => {
    try{
      const res = await CourseService.getExamList({course_id:course.course_id})
      const {code,  message} = res
      if(code === 0){
        updateData(res.data)
      }
    }catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    if(idx === 'grades'){
      fetchData()
    }
  }, [idx])
  return <>
    {!showDetail&&<div className="container grades-container">
      <h1>Grades</h1>
      <Divider/>
      <Table dataSource={data} pagination={false}>
        <Column title="Grade Item" dataIndex="lecture_name" key="lecture_name"/>
        <Column title="Grade" dataIndex="grade" key="grade"/>
        <Column title="Rank" dataIndex="grade_rank" key="rank" render={(value, item) => `${parseFloat((value*100 / item.count).toFixed(2))}%`}/>
        <Column
          title="Review"
          key="review"
          render={(text, record) => (
            <a className="ghost-btn" onClick={(e) => {
              e.preventDefault()
              handleShowDetail(true)
              handleItem(record)
            }}>Detail</a>
          )}
        />
      </Table>
    </div>}
    {showDetail && <GradeDetail data={item} handleShowDetail={handleShowDetail}/>}
  </>
}
export default Grades