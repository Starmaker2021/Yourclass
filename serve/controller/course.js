const {
    exec,
    escape
} = require('../db/mysql')
const uuid = require('node-uuid')
const xss = require('xss')
/**
 * del lecture
 * @param lectureId
 * @returns {Promise | Promise<unknown>}
 */
const delLecture = async (course_id,lecture_id,lecturer_id)=>{
    const sql = `update t_course set valid = '1' where lecture_id = ${escape(xss(lecture_id))} and course_id = ${escape(xss(course_id))}`
    await exec(sql)
    return exec(`select * from t_course where lecturer_id=${escape(lecturer_id)} and valid='0' order by idx asc ;`)
}
/**
 * add course
 * @param courseData
 * @param lecturerId
 * @returns {Promise<{flag: boolean, message: string} | {flag: boolean, message: string}>}
 */
const addCourse = (courseData,lecturerId)=>{
    const courseId= uuid.v1()
    const date = new Date().getTime()
    let value = ''
        courseData.map((lecture,idx)=> {
            const lectureId= uuid.v1()
            value = value + `(${escape(courseId)},
            ${escape(lecturerId)},
            ${escape(lecture.courseName)},
            ${escape(lecture.subject)},
            ${escape(lecture.subclass)},
            ${escape(lecture.price)},
            ${escape(lecture.hours)},
            ${escape(lecture.cover)},
            ${escape(lecture.description)},
            ${escape(lecture.chapterIndex)},
            ${escape(lecture.chapterName)},
            ${idx},
            ${escape(lectureId)},
            ${escape(lecture.lectureName)},
            ${escape(lecture.video)},
            ${escape(lecture.type)},
            ${escape(lecture.document)},
            ${escape(lecture.assignment)},
            ${escape(lecture.lecturer)},
            ${escape(lecture.wechat)},
            ${escape(courseId+lecture.chapterIndex)},
            ${escape(date)}),`})
    const sql = `
    insert into t_course 
    (course_id,
    lecturer_id,
    course_name,
    subject_id,
    subclass_id,
    price,
    hours,
    cover,
    description,
    c_idx,
    chapter_name,
    idx,
    lecture_id,
    lecture_name,
    video,
    type,
    document,
    assignment,
    lecturer,
    wechat,
    chapter_id,date) 
    values ${value.slice(0,-1)}`
    return exec(sql).then(insertData => {
        return {
            flag:true,
            message:'add course success.',
        }
    }).catch(err=>{
        console.log(err)
        return {
            flag:false,
            message:'add course fail.',
        }
    })
}
/**
 * get status eq '0'
 * @returns {Promise<{flag: boolean, message: string}|{flag: boolean, data: *, message: string}>}
 */
const getPurchase = async ()=>{
    try{
        const purchased = await exec(`select * from t_purchase where status='0' and valid='0'`)
        return {
            flag:true,
            data:purchased,
            message:'get purchase success.',
        }
    }catch (e){
        return {
            flag:false,
            message:'get purchase fail.',
        }
    }

}
/**
 * check purchase status
 * @param params
 * @returns {Promise<{flag: boolean, message: string}>}
 */
const checkPurchase = async (params)=>{
    const {courseId,userId} = params
    if(!courseId){
        return {
            flag:false,
            message:'courseId required.',
        }
    }
    try{
        const purchased = await exec(`select * from t_purchase where course_id=${escape(xss(courseId))} and learner_id=${escape(userId)}`)
        return {
            flag:true,
            data:purchased[0],
            message:'get purchase status success.',
        }
    }catch (e){
        return {
            flag:false,
            message:'get purchase status fail.',
        }
    }
}
/**
 * purchase course
 * @returns {Promise<{flag: boolean, message: string} | {flag: boolean, message: string}>}
 * @param params
 */
const purchaseCourse = async (params)=>{
    const {courseId,userId,username,lecturer,lecturer_id,amount} = params
    if(!courseId){
        return {
            flag:false,
            message:'courseId required.',
        }
    }
    if(!lecturer){
        return {
            flag:false,
            message:'lecturer name required.',
        }
    }
    if(!lecturer_id){
        return {
            flag:false,
            message:'lecturer id required.',
        }
    }
    if(!amount){
        return {
            flag:false,
            message:'amount required.',
        }
    }

    const purchaseId= uuid.v1()
    const date = new Date().getTime()
    const purchased = await exec(`select * from t_purchase where course_id=${escape(xss(courseId))} and learner_id=${escape(userId)}`)
    if(purchased.length){
        return {
            flag:false,
            message:'already purchased.',
        }
    }

    const userInfo = await  exec(`select balance from t_user where id=${escape(userId)}`)
    const { balance = 0 }= userInfo[0]
    if(balance < amount){
        return {
            flag:false,
            message:'Insufficient balance.',
        }
    }
    const sql = `
    insert into t_purchase
    (id,
    course_id,
    learner_id,
    date,
    amount,
    learner_name,
    lecturer_name,
    lecturer_id)
    values (${escape(purchaseId)},${escape(xss(courseId))},${escape(xss(userId))},${escape(date)},${escape(xss(amount))},${escape(username)},${escape(xss(lecturer))},${escape(xss(lecturer_id))})`
    return exec(sql).then( async insertData => {
       const update =  await exec(`update t_user set balance=${escape(balance-amount)} where id=${escape(userId)}`)
        return {
            flag:true,
            data:balance-amount,
            message:'purchase success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'purchase fail.',
        }
    })
}
/**
 *
 * @param params
 */
const getList =(params={})=>{
    const {role,userId,type,lecturer_id,learner_id,search} = params
    let sql = `select * from t_course where valid='0' order by idx asc ;`
    if(role ==='1'){
        sql = `select * from t_course where lecturer_id=${escape(userId)} and valid='0' order by idx asc ;`
    }
    if(role === '2'){
        if(search){
            if(type === 'purchase'){
                sql =`select * from t_purchase as a join t_course as b using(course_id) where a.learner_id=${escape(userId)} and a.valid='0' and b.valid='0' and b.course_name like '%${(search)}%'`;
            }else{
                sql = `select * from t_course where valid='0' and course_name like '%${(search)}%' order by idx asc ;`
            }
        }else {
            if(type === 'purchase'){
                sql =`select * from t_purchase as a join t_course as b using(course_id) where a.learner_id=${escape(userId)} and  a.valid='0' and b.valid='0'`;
            }else{
                sql = `select * from t_course where valid='0' order by idx asc ;`
            }
        }
    }
    if(role === '0'){
        if(type === 'purchase'){
            sql =`select * from t_purchase as a join t_course as b using(course_id) where a.learner_id=${escape(learner_id)} and valid='0'`;
        }else{
            sql = `select * from t_course where lecturer_id=${escape(lecturer_id)} and valid='0' order by idx asc ;`
        }
    }
    return exec(sql).then(res=>{
        const result = {}
        res.map(item=>{
            if(!result[item.course_id]){
                result[item.course_id] = {
                    course_id: item.course_id,
                    lecturer_id: item.lecturer_id,
                    course_name: item.course_name,
                    subject_id: item.subject_id,
                    subclass_id: item.subclass_id,
                    status:item.status,
                    price: item.price,
                    hours: item.hours,
                    cover: item.cover,
                    description: item.description,
                    wechat: item.wechat,
                    lecturer: item.lecturer,
                    date:item.date,
                    purchase_id:item.id,
                    chapter:{
                        [item.chapter_id]:{
                            chapter_id:item.chapter_id,
                            chapter_name: item.chapter_name,
                            c_idx: item.c_idx,
                            lecture:[
                                {
                                    idx: item.idx,
                                    lecture_id: item.lecture_id,
                                    lecture_name: item.lecture_name,
                                    video: item.video,
                                    type: item.type,
                                    document: item.document,
                                    assignment: item.assignment,
                                }
                            ]
                        }
                    },
                }
            }else {
                const chapter = result[item.course_id]['chapter'][item.chapter_id]
                if(chapter){
                    result[item.course_id]['chapter'][item.chapter_id]['lecture'].push({
                        idx: item.idx,
                        lecture_id: item.lecture_id,
                        lecture_name: item.lecture_name,
                        video: item.video,
                        type: item.type,
                        document: item.document,
                        assignment: item.assignment,
                    })
                }else {
                    result[item.course_id]['chapter'][item.chapter_id]={
                        chapter_id:item.chapter_id,
                        chapter_name: item.chapter_name,
                        c_idx: item.c_idx,
                        lecture:[
                            {
                                idx: item.idx,
                                lecture_id: item.lecture_id,
                                lecture_name: item.lecture_name,
                                video: item.video,
                                type: item.type,
                                document: item.document,
                                assignment: item.assignment,
                            }
                        ]
                    }
                }
            }
        })
        let data = []
        Object.keys(result).forEach(key=>{
            const course = result[key]
            const chapter =  Object.keys(course['chapter']).map(_key=>{
                return course['chapter'][_key]
            })
            course.chapter = chapter
            data.push(course)
        })
        if(role === '0'){
            if(type === 'purchase'){
                return data
            }else {
                return res
            }
        }
        return data
    })
}
/**
 * get progress
 * @param learnerId
 * @param courseId
 * @returns {Promise<{flag: boolean, message: string} | {flag: boolean, message: string}>}
 */
const getProgress = (learnerId,courseId)=>{
    const sql = `select 
            ifnull(sum(case when type = 'video' then 1 else 0 end),0) as videoDone,
            ifnull(sum(case when type = 'document' then 1 else 0 end),0) as documentDone
        from t_learning_record
        where   learner_id=${escape(learnerId)} and course_id=${escape(courseId)};`
    return exec(sql).then(result => {
        return {
            flag:true,
            data:result[0],
            message:'get progress success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'get progress fail.',
        }
    })
}
/**
 * add record
 * @param params
 * @returns {Promise<{flag: boolean, message: string} | {flag: boolean, message: string}>}
 */
const addProgress = async (params)=>{
    const recordId= uuid.v1()
    const date = new Date().getTime()
    const result = await exec(`select * from t_learning_record where lecture_id=${escape(xss(params.lectureId))}`)
    if(result.length>0){
        return {
            flag:false,
            message:'already added.',
        }
    }
    const sql = `
    insert into t_learning_record
    (
    id,
    learner_id,
    course_id,
    lecture_id,
    type,
    date)
    values (${escape(recordId)},${escape(xss(params.learnerId))},${escape(xss(params.courseId))},${escape(xss(params.lectureId))},${escape(xss(params.type))},${escape(date)})
    `
    return exec(sql).then(insertData => {
        return {
            flag:true,
            message:'add progress success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'add progress fail.',
        }
    })
}
/**
 *
 * @returns {Promise<{flag: boolean, data, message: string} | {flag: boolean, message: string}>}
 * @param params
 */
const getExamList=(params)=>{
    const {course_id,lecture_id,userId} = params
    let sql =''
    if(lecture_id){
        sql =`select * from t_grade a inner join t_user b where a.course_id=${escape(xss(course_id))} and a.lecture_id=${escape(xss(lecture_id))} and a.learner_id=b.id`;
    }else {
        sql =`select lecture_id,answer,date,grade,reference,question from t_grade a inner join t_user b where a.course_id=${escape(xss(course_id))} and a.learner_id=${escape(xss(userId))} and a.learner_id=b.id`;
        //查出成績的名次，參與考試的總人數，
        sql =   `SELECT
                    a.grade,
                    a.answer,
                    a.question,
                    a.lecture_id,
                    a.lecturer_id,
                    a.reference,
                    b.lecture_name
                FROM
                    t_grade a,
                    t_course b
                WHERE
                    a.course_id=${escape(xss(course_id))}
                AND a.lecture_id = b.lecture_id
                AND a.learner_id = ${escape(xss(userId))}`

        sql =`select 	
            grade,
            answer,
            question,
            aa.lecture_id,
            lecturer_id,
            reference,
            lecture_name,
            grade_rank,
            count
        FROM (SELECT
            a.grade,
            a.answer,
            a.question,
            a.lecture_id,
            a.lecturer_id,
            a.reference,
            b.lecture_name,
            (SELECT count(*) FROM t_grade AS c WHERE c.lecture_id = a.lecture_id and c.course_id=${escape(xss(course_id))} ) count
        FROM
            t_grade AS a,
            t_course AS b
        WHERE
            a.lecture_id = b.lecture_id and  a.learner_id=${escape(xss(userId))}) aa inner JOIN (select * from (	SELECT
            lecture_id,learner_id,RANK () OVER (
                PARTITION BY lecture_id
            ORDER BY
            grade asc
            ) grade_rank
            FROM
            t_grade where course_id=${escape(xss(course_id))}) bb WHERE  bb.learner_id=${escape(xss(userId))}) cc WHERE aa.lecture_id =cc.lecture_id`
    }
    return exec(sql).then(result => {
        return {
            flag:true,
            data:result,
            message:'get exam success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'get exam fail.',
        }
    })
}

/**
 * get exam detail
 * @param userId
 * @param lectureId
 * @returns {Promise<{flag: boolean, message: string} | {flag: boolean, message: string}>}
 */
const getExam=(userId,lectureId)=>{
    const sql =`select * from t_grade as a join t_course as b using(course_id) where a.learner_id=${escape(userId)} and a.lecture_id=${escape(xss(lectureId))}`;
    return exec(sql).then(insertData => {
        return {
            flag:true,
            data:insertData[0]||[],
            message:'get exam success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'get exam fail.',
        }
    })
}
/**
 * update exam detail
 * @param params
 * @param role
 * @returns {Promise<{flag: boolean, message: string} | {flag: boolean, message: string}>|{flag: boolean, message: string}}
 */
const updateExam =(params,role)=>{
    const recordId= uuid.v1()
    const date = new Date().getTime()
    let sql = ''
    if(role ==='1'){
        sql =  `
            update t_grade t set t.grade=${escape(xss(params.grade))},t.reference=${escape(xss(params.reference))} where t.learner_id=${escape(xss(params.learner_id))} and t.lecture_id=${escape(xss(params.lecture_id))};
            `
    }
    if(role ==='2'){
      sql =  `
            insert into t_grade
            (
            id,
            course_id,
            lecture_id,
            lecturer_id,
            learner_id,
            question,
            answer,
            date
            )
            values (
            ${escape(recordId)},
            ${escape(xss(params.course_id))},
            ${escape(xss(params.lecture_id))},
            ${escape(xss(params.lecturer_id))},
            ${escape(xss(params.userId))},
            ${escape(xss(params.question.trim()))},
            ${escape(xss(params.answer.trim()))},
            ${escape(date)})
            `
    }
    return exec(sql).then(insertData => {
        return {
            flag:true,
            message:'update success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            message:'update fail.',
        }
    })
}
/**
 * update course mark
 * @param params
 */
const updateMark = async params =>{
    if(!/^[1-5]$/.test(params.mark)){
        return {
            flag:false,
            message:'params error',
        }
    }
    let sql =  `
            insert into t_course_mark (course_id,learner_id,mark) values(${escape(xss(params.course_id))},${escape(xss(params.learner_id))},${escape(xss(params.mark))});
            `
    return exec(sql).then(insertData => {
        return getMark({course_id:params.course_id})
    }).catch(err=>{
        return {
            flag:false,
            message:'update fail.',
        }
    })
}
/**
 * get course id
 * @param params
 */
const getMark = async (params)=>{
    if(!params.course_id){
        return {
            flag:false,
            message:'params error',
        }
    }
    if(params.type === 'pro'){
        try{
          const res = await exec(`select * from t_course_mark where course_id=${escape(xss(params.course_id))} and learner_id=${escape(params.learner_id)} `)
            if(res.length === 0){
                return {
                    flag:true,
                    data: {
                        pro:true,
                        rate:undefined,
                    },
                    message:'get mark success'
                }
            }
        }catch (e){
            return {
                flag:false,
                data: {
                    rate:undefined
                },
                message:'get mark fail.',
            }
        }
    }
    let sql =  `
            select * from t_course_mark where course_id=${escape(xss(params.course_id))};
            `
    return exec(sql).then(result => {
        let mark = 0;
        result.forEach(item=>{
            mark += item.mark;
        })
        return {
            flag:true,
            data:mark === 0 ? {rate:0,count:0} : {rate:(mark / result.length).toFixed(1),count:result.length},
            message:'get mark success.',
        }
    }).catch(err=>{
        return {
            flag:false,
            data:0,
            message:'get mark fail.',
        }
    })
}
/**
 *
 */
const auditPurchase = async (params)=>{
    const {amount,id,learner_id,lecturer_id,type} = params
    if(type === 'pass'){
        try{
            await exec(`update t_user set t_user.balance = t_user.balance + ${amount} where t_user.id = ${escape(xss(lecturer_id))}`)
            await exec(`update t_purchase set t_purchase.status = '1'  where t_purchase.id = ${escape(xss(id))}`)
            return {
                flag:true,
                message:'audit success.'
            }
        }catch (e) {
            console.log(e)
            return {
                flag:false,
                message:'audit error.'
            }
        }
    }else{
        try{
            await exec(`update t_user set t_user.balance = t_user.balance + ${amount} where t_user.id = ${escape(xss(learner_id))}`)
            await exec(`update t_purchase set t_purchase.valid = '1'  where t_purchase.id = ${escape(xss(id))}`)
            return {
                flag:true,
                message:'reject success.'
            }
        }catch (e) {
            console.log(e)

            return {
                flag:false,
                message:'audit error.'
            }
        }
    }
}
/**
 *
 * @param id
 * @returns {Promise<{flag: boolean, message: string}|{flag: boolean, data: *, message: string}>}
 */
const getProfit = async (id)=>{
    try{
        const profit = await exec(`select course_id,date,learner_name,amount from t_purchase where lecturer_id=${escape(xss(id))} and status='1' and valid='0'`)
        return {
            flag:true,
            data:profit,
            message:'get purchase success.',
        }
    }catch (e){
        console.log(e)
        return {
            flag:false,
            message:'get purchase fail.',
        }
    }

}

module.exports = {
    delLecture,
    addCourse,
    getList,
    purchaseCourse,
    getProgress,
    addProgress,
    getExam,
    updateExam,
    getExamList,
    updateMark,
    getMark,
    checkPurchase,
    getPurchase,
    auditPurchase,
    getProfit
}