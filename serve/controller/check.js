const {
    exec,
    escape
} = require('../db/mysql')
/**
 * check course's owner
 * @returns {Promise | Promise<unknown>}
 * @param courseId
 * @param lecturerId
 */
const checkCourseOwner = async (courseId,lecturerId) => {
    let sql = `select * from t_course where course_id=${escape(courseId)} and lecturer_id=${escape(lecturerId)};`
    const rows = await exec(sql)
    return rows.length>0
}
/**
 * check permission
 * @param courseId
 * @param userid
 * @param role
 * @returns {Promise<boolean>}
 */
const checkPermission = async (courseId,userId,role) => {
    let sql = ''
    if(role === '1'){
        sql = `select * from t_course where course_id=${escape(courseId)} and lecturer_id=${escape(userId)};`
    }
    if(role === '2'){
        sql = `select * from t_purchase where course_id=${escape(courseId)} and learner_id=${escape(userId)};`
    }
    const rows = await exec(sql)
    return rows.length>0
}

module.exports = {
    checkCourseOwner,
    checkPermission
}