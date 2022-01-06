const express = require('express');
const {
    login,
    register,
    getDetail,
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {deposit} = require("../controller/user");
const {verify} = require("../controller/user");
const {getList} = require("../controller/user");

const router = express.Router()
/**
 * login
 */
router.post('/login', (req, res, next) => {
    const {
        username,
        password,
        role
    } = req.body
    login(username, password,role).then(result => {
        const {flag,data,message } = result
        if (flag) {
            req.session.regenerate((err)=>{
                req.session.userId = data.id
                req.session.username = data.username
                req.session.fullName = data.fullName
                req.session.role = data.role
                res.json(new SuccessModel(
                    {
                        username:data.username,
                        fullName:data.fullName,
                        role:data.role,
                        balance: data.balance
                    },
                    'login success'
                ))
            })
            return
        }else{
            res.json(new ErrorModel(message))
        }
    })
})

/**
 * logout
 */
router.get('/logout',loginCheck, (req, res, next) => {
    req.session.user = null;
    res.json(new SuccessModel('logout success'))
});
/**
 * register
 */
router.post('/register', (req, res, next) => {
    const {
        username,
        password,
        firstName,
        middleName,
        lastName,
        role,
        subject,
        certificate
    } = req.body
    register({username,
        password,
        firstName,
        middleName,
        lastName,
        role,
        subject,
        certificate}).then((result) => {
            const {flag,message,data} =result
            if(flag){
                req.session.regenerate((err)=>{
                    //auto login
                    req.session.username = data.username
                    req.session.realname = data.realname
                    req.session.role = data.role
                    req.session.userId = data.id
                    res.json(new SuccessModel('register success'))
                })
            }else{
                res.json(new ErrorModel(message || 'register fail'))
            }
        // res.json(new ErrorModel('login fail'))
    })
})
/**
 * list
 */
router.get('/list',loginCheck, (req, res, next) => {
    const {role=''} = req.query
    //should be admin
    if(req.session.role ==='0'){
        getList(role).then(data => {
            res.json(new SuccessModel(data))
        })
    }else{
        res.json(new ErrorModel('Insufficient authority'))
    }
});
/**
 * detail
 */
router.get('/detail',loginCheck, (req, res, next) => {
    const {role = '', id = ''} = req.query
    //should be admin
    if (req.session.role === '0') {
        getDetail(role, id).then(data => {
            res.json(new SuccessModel(data))
        })
    } else {
        res.json(new ErrorModel('Insufficient authority'))
    }
})
/**
 * Audit user
 */
router.post('/verify',loginCheck, (req, res, next) => {
    if (req.session.role === '0') {
        verify(req.body).then(result=>{
            const {flag,message} = result
            if(flag){
                res.json(new SuccessModel(message))
            }else{
                res.json(new ErrorModel(message))
            }
        })
    }else{
        res.json(new ErrorModel('Insufficient authority'))
    }
})
/**
 * deposit
 */
router.post('/deposit',loginCheck, (req, res, next) => {
    if (req.session.role === '2') {
        req.body.userId = req.session.userId
        deposit(req.body).then(result=>{
            const {flag,data:_data,message} = result
            if(flag){
                res.json(new SuccessModel(_data,message))
            }else{
                res.json(new ErrorModel(message))
            }
        })
    }else{
        res.json(new ErrorModel('Insufficient authority'))
    }
})
module.exports = router