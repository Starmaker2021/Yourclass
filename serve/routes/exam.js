const express = require('express');
const {
    getList,
    getDetail,
    delCourse
} = require('../controller/course')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const router = express.Router();

/**
 * get exam list
 */
router.get('/list',loginCheck, (req, res, next) => {
    getList(req.query.id).then(data => {
        res.json(new SuccessModel(data))
    })
})
/**
 * get exam detail
 */
router.get('/detail',loginCheck, (req, res, next) => {
    getDetail(req.query.id).then(data => {
        res.json(new SuccessModel(data))
    })
})
/**
 * update exam grade
 */
router.post('/update',loginCheck, (req, res, next) => {
    getDetail(req.body.id).then(data => {
        res.json(new SuccessModel(data))
    })
})

module.exports = router;