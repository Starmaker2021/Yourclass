const crypto = require('crypto')

function md5(word) {
    return crypto.createHash('md5').update(String(word)).digest('hex');
}

module.exports = md5