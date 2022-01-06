import React, {useState, useEffect} from 'react'
import './rating.less'
import CourseService from '../../../services/course';
const Rating = ({course_id, type}) => {
  const [rate, handleRate] = useState(-1)
  const arr = [1, 2, 3, 4, 5]
  const [idx, handleIdx] = useState(-1);
  const [title, handleTitle] = useState(undefined)
  const [count, handleCount] = useState(0)
  let done = false
  /**
   * get rate
   */
  const fetchRate = async (course_id) => {
    try{
      const res = await CourseService.getMark({course_id, type:type})
      const {data:{pro, rate, count=0} } = res
      if(pro){
        handleTitle('To Mark')
      }else{
        handleTitle(undefined)
        handleRate(rate)
        handleCount(count)
      }
    }catch (e){
      console.log(e)
    }
  }
  /**
   * add new rate
   * @param _rate
   */
  const updateRate = async (_rate) => {
    try{
      const res = await CourseService.updateMark({course_id, mark:_rate})
      const {data:{rate, count=0} } = res
      handleTitle(undefined)
      handleRate(rate)
      handleCount(count)
    }catch (e){
      console.log(e)
    }
  }
  /**
   *
   * @param index
   */
  const handleStartIndex = (index) => {
    if(!done){
      handleIdx(index)
    }
  }
  /**
   *
   * @param index
   */
  const handleSubmit = (index) => {
    done =true
    updateRate(index+1)
  }

  useEffect(() => {
    if(course_id){
      fetchRate(course_id)
    }
  }, [course_id])
  return <div className="rating" onMouseLeave={() => {
    if (!done){
      handleStartIndex(-1)
    }
  }}>
    {rate>=0
      ?<div className={`rate rate-${Math.round(rate / 0.5)}`}>{rate} ( {count===0?'nobody':count} )</div>
      :arr.map((item, index) => <a className={idx>=index ? 'active':''} onMouseEnter={(e) => handleStartIndex(index)} onClick={(e) => {
        e.preventDefault()
        handleSubmit(index)
      }} key={item}>{item}</a>)
    }
    <span>{title}</span>
  </div>
}
export default Rating