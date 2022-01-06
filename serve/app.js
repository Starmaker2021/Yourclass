const createError = require('http-errors');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const courseRouter = require('./routes/course');
const examRouter = require('./routes/exam');
const discussionRouter = require('./routes/discussion')
const ENV = process.env.NODE_ENV;
const FileStore = require('session-file-store')(session);
const identityKey = 'your';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'uploads')))
app.use(session({
    name: identityKey,
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 ,// 有效期，单位是毫秒
        path: '/',  // 默认
        httpOnly: true,  // 默认
    }
}));
app.disable('etag');
//cors
app.use(cors({
    credentials: true,
    origin:'http://localhost:3000'
}))

app.use(express.json());
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs', 'access.log'), {
    flags: 'a'
});
// setup the logger
if (ENV === 'dev' || ENV === 'test') {
    app.use(logger('dev'));
} else {
    app.use(logger('combined', {
        stream: accessLogStream
    }));
}
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// router
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/notice',noticeRouter)
app.use('/api/course',courseRouter)
app.use('/api/discussion',discussionRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;

