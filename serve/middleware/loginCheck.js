const {
    ErrorModel
} = require('../model/resModel')

module.exports = (req, res, next) => {
    if (!req.session.username) {
        return res.json({code:-2,message:'You should login.'})
    }
    next()
}