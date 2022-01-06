const express = require('express');
const {
    getList,
    delNotice,
    addNotice,
} = require('../controller/notice')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {checkCourseOwner} = require("../controller/check");
const router = express.Router();
/**
 * add new notice
 */
router.post('/add',loginCheck, (req, res, next) => {
    //should be author
    checkCourseOwner(req.body.courseId,req.session.userId).then(result=>{
        if(result){
            addNotice(req.body).then(data => {
                if(data){
                    res.json(new SuccessModel(data))
                }else{
                    res.json(new ErrorModel('add fail'))
                }
            })
        }else{
            res.json(new ErrorModel('you have no right to add notice'))
        }
    })
})

/**
 * get notice list
 */
router.get('/list', (req, res, next) => {
    const {courseId} = req.query
    getList(courseId).then(data => {
        res.json(new SuccessModel(data))
    })

});

/**
 * delete notice
 */
router.post('/del', loginCheck, (req, res, next) => {
    const {courseId,id} = req.body
    //should be author
    checkCourseOwner(req.body.courseId,req.session.userId).then(result=>{
        if(result){
            delNotice(id).then(data => {
                if (data) {
                    res.json(new SuccessModel('delete success.'))
                } else {
                    res.json(new ErrorModel('delete fail.'))
                }
            })
        }else{
            res.json(new ErrorModel('you have no right to add notice'))
        }
    })

})

module.exports = router