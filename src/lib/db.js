const mariadb = require('mariadb');
 
const connection = mariadb.createPool({
    host: "localhost", port:3307,
    user: "root", password: "sj6758",
    connectionLimit: 5
});

connection.connect((err => {
  connection.query('USE project');
}));


module.exports = connection;
