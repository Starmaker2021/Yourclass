const {
    exec,
    escape
} = require('../db/mysql')
const uuid = require('node-uuid')
const xss = require('xss')
/**
 * get chat list
 * @param courseId
 * @returns {Promise | Promise<unknown>}
 */
const getList = (params={})=>{
    const {courseId} = params
    let sql = `select a.id,username,learner_id from t_discussion_lecturer a inner join t_user b where a.course_id=${escape(xss(courseId))} and a.learner_id = b.id order by date desc`
    return exec(sql).then(result => {
        let obj = {}
        let arr = []
        result.forEach(item=>{
            if(!obj[item.learner_id]){
                obj[item.learner_id] = true
                arr.push({
                    learner_id:item.learner_id,
                    username:item.username,
                })
            }
        })
        return {
            flag:true,
            data:arr,
            message:'get list success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'get list fail.',
        }
    })}
/**
 * get chat by course_id and learner_id(type:2)
 * @param params
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
const getChat = async (params = {}) => {
    const {courseId,learner_id,type,role,userId} = params
    let sql = ''
    if(type==='1'){
        sql = `select role_type,learner,lecturer,content,date from t_discussion_lecturer a inner join t_user b where a.course_id=${escape(xss(courseId))} and a.learner_id=${escape(xss(role==='2'?userId:learner_id))} and a.learner_id = b.id order by date desc`
    }else{
        sql = `select learner,content,date from t_discussion_learner a inner join t_user b where a.course_id=${escape(xss(courseId))} and a.learner_id=${escape(userId)} and a.learner_id = b.id order by date desc`
    }
    return exec(sql).then(result => {
        return {
            flag:true,
            data:result,
            message:'get chat success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'get chat fail.',
        }
    })
}
/**
 *
 * @param params
 * @param userId
 * @returns {Promise | Promise<unknown>}
 */
const updateChat = async (params,userId)=>{
    const {courseId,username,lecturer,learner_id,lecturer_id,content,type,role,learner} = params
    const date = new Date().getTime()
    const chatId= uuid.v1()
    let sql = ''
    //lecturer group
    if(type === '1'){
        if(role === '1'){
            sql = `
            insert into t_discussion_lecturer
            (id,
            course_id,
            lecturer_id,
            learner_id,
            learner,
            lecturer,
            content,
            role_type,
            date)
            values (
            ${escape(chatId)},
            ${escape(xss(courseId))},
            ${escape(userId)},
            ${escape(xss(learner_id))},
            ${escape(xss(learner))},
            ${escape(username)},
            ${escape(xss(content))},
            ${escape(role)},
            ${escape(date)})`
        }else{
            sql = `
            insert into t_discussion_lecturer
            (id,
            course_id,
            lecturer_id,
            learner_id,
            learner,
            lecturer,
            content,
            role_type,
            date)
            values (${escape(chatId)},
            ${escape(xss(courseId))},
            ${escape(lecturer_id)},
            ${escape(userId)},
            ${escape(username)},
            ${escape(xss(lecturer))},
            ${escape(xss(content))},
            ${escape(role)},
            ${escape(date)})`
        }
    }
    if(type==='2'){
        sql = `
            insert into t_discussion_learner
            (id,
            course_id,
            learner_id,
            learner,
            content,
            date)
            values (${escape(chatId)},${escape(xss(courseId))},${escape(userId)},${escape(username)},${escape(content)},${escape(date)})`
    }
    exec(sql)
    if(type==='1'){
        if(role === '2'){
            return exec(
                `select role_type,learner,lecturer,content,date from t_discussion_lecturer where course_id=${escape(xss(courseId))} and learner_id=${escape(userId)} order by date desc`
            )
        }else{
            return exec(
                `select role_type,learner,lecturer,content,date from t_discussion_lecturer where course_id=${escape(xss(courseId))} and learner_id=${escape(xss(learner_id))} order by date desc`
            )
        }

    }else{
        return exec(`select learner,content,date from t_discussion_learner a inner join t_user b where a.course_id=${escape(xss(courseId))} and a.learner_id=${escape(userId)} and a.learner_id = b.id order by date desc`)
    }
}
module.exports = {
    getList,
    getChat,
    updateChat,
}