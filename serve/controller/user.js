const {
    exec,
    escape
} = require('../db/mysql')
const xss = require('xss')
const uuid = require('node-uuid')
const {
    genPassword
} = require('../utils/crypto.js')
/**
 * login
 * @param username
 * @param password
 * @returns {Promise<*|{}>}
 */
const login = async (username, password,role) => {
    password = genPassword(password)
    const sql = `
    select * from t_user where username=${escape(username)} and password=${escape(password)} and role=${escape(role)};`
    const rows = await exec(sql)
    const data =  rows[0] || {}
    const {verified,id,valid} = data
    if(role === '1'){
        if(verified === '0'){
            return {
                flag:false,
                message:'Account Need To Be Verified.'
            }
        }else if(valid === '1'){
            return {
                flag:false,
                message:'Account Has Been Baned.'
            }
        }else{
            return {
                flag:true,
                data:{
                    id:data.id,
                    username:data.username,
                    fullName:`${data.first_name} ${(data.middle_name+' ')||''}${data.last_name}`,
                    role: data.role,
                    balance: data.balance
                }
            }
        }

    }else{
        if(id){
            return {
                flag:true,
                data:{
                    id:data.id,
                    username:data.username,
                    fullName:`${data.first_name} ${(data.middle_name+' ')||''}${data.last_name}`,
                    role: data.role,
                    balance: data.balance
                }
            }
        }else{
            return {
                flag:false,
                message:'Account or Password Wrong.'
            }
        }
    }
}
/**
 * register
 * @param registerData
 * @returns {Promise<{id: *}>}
 */
const register = async (registerData = {}) => {
    const id= uuid.v1()
    const username = xss(registerData.username)
    if(!(username.trim())){
        return {
            flag:false,
            message:'username error.'
        }
    }
    const password = genPassword(xss(registerData.password))
    if(!password){
        return {
            flag:false,
            message:'password error.'
        }
    }
    const firstName = xss(registerData.firstName)
    if(!firstName){
        return {
            flag:false,
            message:'firstName error.'
        }
    }
    const middleName = xss(registerData.middleName||'')
    const lastName = xss(registerData.lastName)
    if(!lastName){
        return {
            flag:false,
            message:'lastName error.'
        }
    }
    const role = xss(registerData.role)
    const subject = xss(registerData.subject||'')
    const certificate = xss(registerData.certificate||'')
    const createTime = Date.now()
    const rows = await exec(`select * from t_user where username=${escape(username)}`)
    if(rows.length>0){
        return {
            flag:false,
            message:'username already exist.'
        }
    }
    const sql = `
    insert into t_user (id,username, password, first_name,middle_name,last_name,role, subject,certificate,register_time,verified)
    values (
        ${escape(id)},
        ${escape(username)},
        ${escape(password)},
        ${escape(firstName)},
        ${escape(middleName)},
        ${escape(lastName)},
        ${escape(role)},
        ${escape(subject)},
        ${escape(certificate)},
        ${createTime},
        ${role==='1'?'0':'1'});
  `
    return exec(sql).then(insertData => {
        return {
            flag:true,
            message:'register success.',
            data:{
                id:id,
                username:username,
                fullName:`${firstName} ${middleName||''} ${lastName}`,
                role: role,
            }
        }
   })
}
/**
 * getList
 * @returns {Promise | Promise<unknown>}
 * @param role
 */
const getList = (role) => {
    let sql = `select certificate,first_name,id,last_name,middle_name,register_time,subject,username,valid,verified from t_user where role=${escape(role)} order by register_time desc;`
    return exec(sql)
}
const getDetail = (role,id) =>{
    let sql = ''
    if(role === '1'){
        sql = `select * from t_purchase where lecturer_id=${id} order by register_time desc;`
    }
    if(role === '2'){
        sql = `select * from t_purchase where learner_id=${id} order by register_time desc;`
    }
    return exec(sql)
}
/**
 *
 * @param params
 * @returns {Promise<{flag: boolean, message: string}>}
 */
const verify = async (params)=>{
    const {id,type} = params
    if(!id||!type){
        return {
            flag:false,
            message:'Params Error'
        }
    }
    let sql = ''
    if(type === 'pass'){
        sql = `update t_user set t_user.verified = '1' where t_user.id=${escape(xss(id))}`
    }else{
        sql = `update t_user set t_user.verified = '1',t_user.valid='1' where t_user.id=${escape(xss(id))}`
    }
    try{
        const result = await exec(sql)
        return {
            flag:true,
            message:'Verify Success.'
        }
    }catch (e) {
        console.log(e)
        return {
            flag:false,
            message:'SQL Error'
        }
    }
}

/**
 *
 * @param params
 * @returns {Promise<{flag: boolean, message: string}>}
 */
const deposit = async (params)=>{
    const {userId,amount} = params
    if(!amount){
        return {
            flag:false,
            message:'Amount Error'
        }
    }
    let sql = `update t_user set t_user.balance = t_user.balance + ${escape(amount)} where t_user.id=${escape(userId)}`
    try{
        const result = await exec(sql)
        if(result.changedRows === 1){
            const res = await (exec(`select balance from t_user where t_user.id=${escape(userId)}`))
            return {
                flag:true,
                data: res[0],
                message:'deposit Success.'
            }
        }else{
            return {
                flag:false,
                message:'Deposit Fail.'
            }
        }
    }catch (e) {
        console.log(e)
        return {
            flag:false,
            message:'SQL Error'
        }
    }
}

module.exports = {
    login,
    register,
    getDetail,
    getList,
    verify,
    deposit
}