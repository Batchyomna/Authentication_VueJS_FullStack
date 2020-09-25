const mysql = require('mysql2');
//-------------------- create the connection to database testv1
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testv1'
  });
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log("you are connected");
  
  })
  module.exports = connection