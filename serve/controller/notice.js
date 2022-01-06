const {
    exec,
    escape
} = require('../db/mysql')
const uuid = require('node-uuid')
const xss = require('xss')
/**
 * get all notice
 * @param courseId
 * @returns {Promise | Promise<unknown>}
 */
const getList = (courseId)=>{
    let sql = `select * from t_notice where course_id=${escape(courseId)} and valid='0' order by date desc;`
    return exec(sql)
}
/**
 * add new notice
 * @param noticeData
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
const addNotice = async (noticeData = {}) => {
    const id= uuid.v1()
    const createTime = Date.now()
    const sql = `
    insert into t_notice (id,course_id, content,title, date)
    values (
        ${escape(id)},
        ${escape(xss(noticeData.courseId))},
        ${escape(xss(noticeData.content))},
        ${escape(xss(noticeData.title))},
        ${createTime});
  `
    return exec(sql).then((insertData,a,b,c)=>{
        if(insertData){
            return[ {
                id,
                content: noticeData.content,
                courseId: noticeData.courseId,
                title: noticeData.title,
                date:createTime,
            }]
        }
    })
}
/**
 * delete notice by notice id
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
const delNotice = (id)=>{
    const sql = `update t_notice set valid = '1' where id = ${escape(id)}`
    return exec(sql)
}
module.exports = {
    getList,
    addNotice,
    delNotice
}