/**
 * 尝试登录次数限制
 * login_number [日期, 次数].join('|')
 * updateLoginStatus (data) => {}
 * return {
 *  run bool true: 超过 false: 正常
 *  start 登录失败后修改状态
 * }
 */
exports.Login_n = (login_number, updateLoginStatus) => {
    let run = true
    let number = 0
    let max = 10
    let getD = () => {
        let date = new Date()
        let d = [date.getUTCFullYear(), date.getMonth() + 1, date.getDate()].join('a')
        return d
    }
    if(login_number){
        let date = login_number.split('|')[0]
        let n = login_number.split('|')[1]
        if(date == getD()){
            number = (+n)
        }
    }
    if(number >= max){
        run = false
    }
    let afterLoginFail = () => {
        let add_login_number
        let notToday = () => {
            updateLoginStatus([getD(), 0].join('|'))
        }
        let today = (n) => {
            updateLoginStatus([getD(), n].join('|'))
        }
        if(!login_number){
            notToday()
        }else{
            let date = login_number.split('|')[0]
            let n = login_number.split('|')[1]
            if(date == getD()){
                today((+n) + 1)
            }
        }
    }
    return {
        run,
        start: afterLoginFail
    }
}
