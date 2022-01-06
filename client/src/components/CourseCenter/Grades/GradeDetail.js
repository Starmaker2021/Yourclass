import React from 'react'
import {Divider} from 'antd';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */
const GradeDetail = (props) => {
  const {data={}} = props
  return <div className="container grade-detail-container">
    <h1><a onClick={(e) => {
      props.handleShowDetail(false)
      e.preventDefault()
    }}>Grades</a><span style={{margin:'0 0 0 8px'}}>/</span> Details</h1>
    <Divider/>
    <section>
      <h2>Questions</h2>
      <p style={{whiteSpace:'pre-line'}}>{data.question}</p>
    </section>
    <Divider/>
    <section>
      <h2>My Answer</h2>
      <p>{data.answer}</p>
    </section>
    <Divider/>
    <section>
      <h2>Correct Answer</h2>
      <p>{data.reference}</p>
    </section>
  </div>
}
export default GradeDetail