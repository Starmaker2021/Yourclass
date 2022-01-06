const express = require('express');
const {
    getList,
    addCourse,
    delLecture,
    purchaseCourse,
    checkPurchase,
    getProgress,
    addProgress,
    getExam,
    updateExam,
    getExamList,
    updateMark,
    getMark,
    getPurchase
} = require('../controller/course')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {getProfit} = require("../controller/course");
const {auditPurchase} = require("../controller/course");
const {auditCharge} = require("../controller/course");
const {checkPermission} = require("../controller/check");
const router = express.Router();

/**
 * get course list
 */
router.get('/list', (req, res, next) => {
    const {userId,role} = req.session
    getList({userId,role,...req.query}).then(data => {
        res.json(new SuccessModel(data))
    })
});

/**
 * add new course
 */
router.post('/add', loginCheck, (req, res, next) => {
    addCourse(req.body,req.session.userId).then(data => {
        const {flag,message} = data
        if(flag){
            res.json(new SuccessModel(message))
        }else{
            res.json(new ErrorModel(message))
        }
    })
})

/**
 * purchase course
 */
router.post('/purchase', loginCheck, (req, res, next) => {
    req.body.userId = req.session.userId
    req.body.username = req.session.username
    purchaseCourse(req.body).then(data => {
        const {flag,data:_data,message} = data
        if(flag){
            res.json(new SuccessModel(_data,message))
        }else{
            res.json(new ErrorModel(message))
        }
    })
})
/**
 * get purchase list
 */
router.get('/getPurchase', loginCheck, (req, res, next) => {
    getPurchase(req.query).then(data => {
        const {flag,data:_data,message} = data
        if(flag){
            res.json(new SuccessModel(_data))
        }else{
            res.json(new ErrorModel(message))
        }
    })
})
/**
 * get profit list
 */
router.get('/getProfit', loginCheck, (req, res, next) => {
    getProfit(req.session.userId).then(data => {
        const {flag,data:_data,message} = data
        if(flag){
            res.json(new SuccessModel(_data))
        }else{
            res.json(new ErrorModel(message))
        }
    })
})

/**
 * check purchase status
 */
router.post('/checkPurchase', (req, res, next) => {
    req.body.userId = req.session.userId
    checkPurchase(req.body).then(data => {
        const {flag,data:_data,message} = data
        if(flag){
            res.json(new SuccessModel(_data))
        }else{
            res.json(new ErrorModel(message))
        }
    })
})
/**
 * delete lecture
 */
router.post('/delLecture', loginCheck, (req, res, next) => {
    const {course_id,lecture_id,lecturer_id} = req.body
    if(!course_id||!lecturer_id||!lecture_id){
        res.json(new ErrorModel('params error'))
    }
    const role = req.session.role
    //should be admin
    if(role === '0'){
        delLecture(course_id,lecture_id,lecturer_id).then(data => {
            if (data) {
                res.json(new SuccessModel(data))
            } else {
                res.json(new ErrorModel('delete fail'))
            }
        })
    }else{
        res.json(new ErrorModel('Insufficient authority'))
    }
})
/**
 * get learning progress
 */
router.get('/getProgress',loginCheck,(req,res)=>{
    if(!req.query.courseId){
        res.json(new ErrorModel('params error'))
    }
    getProgress(req.session.userId,req.query.courseId).then(result => {
        const {flag,message,data} = result
        if(flag){
            res.json(new SuccessModel(data,message))
        }else {
            res.json(new ErrorModel(message))
        }
    })
})
/**
 * add new learning record
 */
router.post('/addProgress',loginCheck,(req,res)=>{
    req.body.learnerId = req.session.userId
    addProgress(req.body).then(result => {
        const {flag,message,data} = result
        if(flag){
            res.json(new SuccessModel(data,message))
        }else {
            res.json({code:-3})
        }
    })
})
/**
 * get exam detail
 */
router.get('/getExamList',loginCheck,(req,res)=>{
    req.query.userId = req.session.userId
    getExamList(req.query).then(result => {
        const {flag,message,data} = result
        if(flag){
            res.json(new SuccessModel(data,message))
        }else {
            res.json(new ErrorModel(message))
        }
    })
})
/**
 * get exam detail
 */
router.get('/getExam',loginCheck,(req,res)=>{
    getExam(req.session.userId,req.query.lecture_id).then(result => {
        const {flag,message,data} = result
        if(flag){
            res.json(new SuccessModel(data,message))
        }else {
            res.json(new ErrorModel(message))
        }
    })
})
/**
 * update Exam data
 */
router.post('/updateExam',loginCheck,(req,res)=>{
    req.body.userId = req.session.userId
    checkPermission(req.body.course_id,req.session.userId,req.session.role).then(result=>{
        if(result){
            updateExam(req.body,req.session.role).then(result => {
                const {flag,message,data} = result
                if(flag){
                    res.json(new SuccessModel(data,message))
                }else {
                    res.json(new ErrorModel(message))
                }
            })
        }else{
            res.json(new ErrorModel('Insufficient authority'))
        }
    })
})
/**
 * update course mark
 */
router.post('/updateMark',loginCheck,(req,res)=>{
    req.body.learner_id = req.session.userId
    checkPermission(req.body.course_id,req.session.userId,req.session.role).then(result=>{
        if(result){
            updateMark(req.body).then(result => {
                const {flag,message,data} = result
                if(flag){
                    res.json(new SuccessModel(data,message))
                }else {
                    res.json(new ErrorModel(message))
                }
            }).catch(err=>console.log(err))
        }else{
            res.json(new ErrorModel('Insufficient authority'))
        }
    })
})
/**
 * get course mark
 */
router.get('/getMark',(req,res)=>{
    req.query.learner_id = req.session.userId
    getMark(req.query).then(result => {
        const {flag,message,data} = result
        if(flag){
            res.json(new SuccessModel(data,message))
        }else {
            res.json(new ErrorModel(message))
        }
    })
})
/**
 *
 */
router.post('/auditPurchase',loginCheck, (req, res, next) => {
    if (req.session.role === '0') {
        auditPurchase(req.body).then((result) => {
            const {flag, message, data} = result
            if (flag) {
                res.json(new SuccessModel(data,message))
            } else {
                res.json(ErrorModel(message))
            }
        }).catch(e=>{
            res.json(new ErrorModel('audit error'))
        })
    }else{
        res.json(new ErrorModel('Insufficient authority'))
    }
})
module.exports = router