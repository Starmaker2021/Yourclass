const { AsyncAliRds } = require('ali-rds-async');
let aliRds = new AsyncAliRds({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'yourclass',
    database: 'yourclass'
});
module.exports = aliRds