const {
    exec,
    escape
} = require('../db/mysql')
const uuid = require('node-uuid')
const xss = require('xss')
/**
 * get dict
 */
const getDict = async ()=>{
    const sql = 'select * from t_subject'
    return exec(sql).then(res=>{
        const data = {}
        res.map(item=>{
            if(!data[item.subject_code]){
                data[item.subject_code] = {
                    name:item.subject,
                    value:item.subject_code,
                    subclass:[]
                }
                if(item.subclass_code){
                    data[item.subject_code].subclass.push({
                        name:item.subclass,
                        value:item.subclass_code,
                    })
                }
            }else{
                data[item.subject_code].subclass.push({
                    name:item.subclass,
                    value:item.subclass_code,
                })
            }
        })
        return Object.keys(data).map(key=>data[key])
    })
}

module.exports = {
    getDict
}