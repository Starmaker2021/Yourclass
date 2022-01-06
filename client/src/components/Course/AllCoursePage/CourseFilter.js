import React, {useState, useEffect} from 'react';
import {Button, Dropdown, Menu, DatePicker, Tag} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import './courseFilter.less'
import useModel from 'flooks';
import {dictModel, filter} from '../../../model/model';
import * as _ from 'lodash'
const { RangePicker } = DatePicker;
const dateFormat = 'MM/DD/YYYY';

const CourseFilter =  ({data={}, lecturer=null}) => {
  //filter subject
  const [selectedSubject, handleSelectSubject] = useState(null)
  //filter lecturer
  const [selectedLecturer, handleSelectLecturer] = useState(null)
  //filter date
  const [date, updateDate] = useState([])
  const [time, updateTime] = useState({startTime:undefined, endTime:undefined})
  const { updateFilter} = useModel(filter)
  const {dict} = useModel(dictModel)
  const MenuList =({data=[], onClick}) => (
    <Menu onClick={onClick}>
      {data.map((item) => <Menu.Item key={item.value}>{item.name}</Menu.Item>)}
    </Menu>
  );
  const onChange = (date, dateString) => {
    const [startTime, endTime] = date
    updateDate(dateString)
    updateFilter({date:[moment(startTime).valueOf(), moment(endTime).valueOf()]})
  }
  const [subjectText, handleSubjectText] = useState(null)
  return <div className="course-filter">
    <div className="filters">
      <Dropdown key="subject"
        overlay={<MenuList onClick={(e) => {
          handleSelectSubject(e.key)
          updateFilter({subject:e.key})
          handleSubjectText(_.get(e, 'domEvent.target.innerText')||'')
        }}
        data={dict}/>}
      >
        <Button>
          Subject <DownOutlined />
        </Button>
      </Dropdown>
      <Dropdown key="lecturer"
        overlay={<MenuList onClick={(e) => {
          handleSelectLecturer(e.key)
          updateFilter({lecturer:e.key})
        }}
        data={lecturer}/>}
      >
        <Button>
          Lecturer <DownOutlined />
        </Button>
      </Dropdown>
      <RangePicker
        value={time.startTime===undefined||time.endTime===undefined
          ?null:[moment(time.startTime, dateFormat), moment(time.endTime, dateFormat)]}
        defaultPickerValue={date}
        onChange={onChange}
        format={dateFormat}
      />
    </div>
    <div className="filter">
      {selectedSubject&&<Tag closable onClose={() => {
        handleSelectSubject(null)
        updateFilter({subject:undefined})
      }}>
        {subjectText}
      </Tag>}
      {selectedLecturer&&<Tag closable onClose={() => {
        handleSelectLecturer(null)
        updateFilter({lecturer:undefined})
      }}>
        {selectedLecturer}
      </Tag>}
      {date.length>0&&<Tag closable onClose={() => {
        updateDate([])
        updateFilter({date:[]})
      }}>
        {date[0] } - {date[1]}
      </Tag>}
    </div>
  </div>
}
export default CourseFilter