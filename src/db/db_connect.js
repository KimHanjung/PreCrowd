var mariadb = require('mariadb');
const config = require("../config/db.config.js");

module.exports = function(){
    // DB 연동
    var pool = mariadb.createPool({
    host     : config.HOST,
    port     : config.port,
    user     : config.USER, 
    password : config.PASSWORD,
    database : config.DB, 
    multipleStatements : true
    });
    return {
        getConnection: function (callback) {    // connection pool을 생성하여 리턴합니다
            pool.getConnection(callback);
        }
    }
}();