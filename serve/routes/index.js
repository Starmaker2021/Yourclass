const express = require('express');
const {SuccessModel} = require("../model/resModel");
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const {ErrorModel} = require("../model/resModel");
const {getDict} = require("../controller");

const multer = require("multer");
const moment = require("moment");
let timePath = moment().format('YYYY-MM-DD');
let destination = '/uploads/' + timePath;
let timestamp = '';
let filename = '';

const storage = multer.diskStorage({
    //这里destination是一个字符串
    destination: '.' + destination,
    filename: function (req, file, cb) {
        //自定义设置文件的名字
        timestamp = new Date().getTime();
        let filenameArr = file.originalname.split('.');
        filename = 'upload-' + timestamp + '.' + filenameArr[filenameArr.length - 1];
        cb(null, filename)
    }
});
let upload = multer({storage:storage});
/**
 * get dict
 */
router.get('/dict', function(req, res, next) {
    getDict(req.query).then(data=>{
        if(data){
            res.json(new SuccessModel(data))
        }else{
            res.json(new ErrorModel('get dict fail'))
        }
    })
});
router.get('/captcha', async (req, res) => {
    let captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

router.post('/upload',upload.single('photo'),function(req,res){
    const path = req.file.path.replace(/\\/g,'/')
    res.send({
        name: req.file.filename,
        status: "done",
        url: path.replace(/uploads/,''),
    })
})

module.exports = router;
