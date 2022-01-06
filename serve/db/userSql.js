let userSql = {
    queryAll: 'SELECT * FROM t_user', // 查找表中所有数据
    getUserById: 'SELECT * FROM User WHERE uid =?', // 查找符合条件的数据
    queryUserByName:(username)=>`select * from t_user where username="${username}"`,
    queryUserByNameAndRole:(username,role)=>`select * from t_user where username="${username}" and role=${role}`
}
module.exports = userSql
