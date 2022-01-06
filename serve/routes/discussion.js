const express = require('express');
const {
    getList,
    getChat,
    updateChat,
} = require('../controller/discussion')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {checkPermission} = require("../controller/check");
const {checkCourseOwner} = require("../controller/check");
const router = express.Router();


/**
 * update chat by Id
 */
router.post('/updateChatById',loginCheck, (req, res, next) => {
    //should be author
    checkPermission(req.body.courseId,req.session.userId,req.session.role).then(result=>{
        if(result){
            req.body.role = req.session.role
            req.body.username = req.session.username
            updateChat(req.body,req.session.userId).then(data => {
                if(data){
                    res.json(new SuccessModel(data))
                }else{
                    res.json(new ErrorModel('add fail'))
                }
            })
                .catch(e=>console.log(e))
        }else{
            res.json(new ErrorModel('sorry,you have no right to update'))
        }
    })
})

/**
 * get chat list
 */
router.get('/getList', (req, res, next) => {
    //should be author
    checkPermission(req.query.courseId,req.session.userId,req.session.role).then(result=>{
        if(result){
            getList(req.query).then(result => {
                const {data,flag,message} = result
                if (flag) {
                    res.json(new SuccessModel(data,'fetch success'))
                } else {
                    res.json(new ErrorModel('fetch fail.'))
                }
            })
        }else{
            res.json(new ErrorModel('sorry,you have no right to fetch data'))
        }
    })

});

/**
 * get chat
 */
router.get('/getChatById', loginCheck, (req, res, next) => {
    //should be author
    checkPermission(req.query.courseId,req.session.userId,req.session.role).then(result=>{
        if(result){
            req.query.userId = req.session.userId
            req.query.role = req.session.role
            getChat(req.query).then(result => {
                const {data,flag,message} = result
                if (flag) {
                    res.json(new SuccessModel(data,'fetch success'))
                } else {
                    res.json(new ErrorModel('fetch fail.'))
                }
            })
        }else{
            res.json(new ErrorModel('sorry,you have no right to fetch data'))
        }
    })

})

module.exports = router