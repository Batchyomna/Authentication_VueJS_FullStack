const mysql = require('mysql2');
const express = require('express')
const connection = require('../database/myDataBase')
const router = express.Router();
const jwt = require("jsonwebtoken");



//To hash a password:
const bcrypt = require('bcrypt');
const saltRounds = 10   // cost factor, The cost factor controls how much time is needed to calculate a single BCrypt hash. 

// parse application/x-www-form-urlencoded
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//------------CORS
var cors = require('cors')
router.use(cors())
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //is a node.js package for providing a Connect/Express middleware 
    next();                                          //that can be used to enable CORS with various options.
  });                                               // it is put here where we connect with the database and NOT in the API file



// -------------------------API create new DB in general-------
router.post('/createDB', (req, res) => {
    try {
      var myDB = req.body.name
      const myConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
      });
      myConnection.connect(function (err) {
        console.log(" Your are connected to MSQL");
        myConnection.query(`CREATE DATABASE  ${myDB}`, function (err, result) {
          res.send(`your Database: ${myDB} is created`)
        });
      });
  
    } catch (err) {
      console.log(err);
    }
  
  });
  //------------------------create the TABLE createTable {nameOfTable: String, columns: ArrayOfObjects} 
  router.post('/createTable/:tableName', (req, res)=>{ 
  
    var theProperties = [];
    let myData = req.body
    for(let i=0; i< myData.length ; i++){
      let x = Object.values(myData[i])
      theProperties.push(x)
    }
    var myQuery = `CREATE TABLE ${req.params.tableName} (id INT AUTO_INCREMENT PRIMARY KEY`
    for(let j=0; j<theProperties.length; j++ ){
     myQuery = myQuery +`, `+ theProperties[j][0] + ` ` + theProperties[j][1] ;
    }
    myQuery = myQuery + `)`;
    console.log(myQuery);
    connection.query(myQuery, function (err, result) {
      if (err) throw err;
      res.send("Table created: " );
    });
    // NOTE: we can send in the body of Postman an array like that: we put in key: columns & in the value {"columnName":"name", "columnDataType": "VARCHAR(255)"}
    // in the next key we put columns & in the value: {"columnName":"age", "columnDataType": "INT"}
    //maybe we have to put them inside " " then parse&stringify
  
});
 //----------------- GET /emails (Get all emails)
router.get('/emails', (req,res)=>{  
    //Select only "emails" from "users":
    connection.query("SELECT email FROM users", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
});
//---------------------- GET /all (Get all informations)

router.get('/all', (req,res)=>{   
   //Select all the data from "users":
   connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
})

//---------------------------Delete user email (DELETE /users/:email)---------
router.delete('/users/:email', (req, res) => {          
  connection.query(`DELETE FROM users WHERE email like '${req.params.email}'`, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    res.end("It is  deleted")
  })
});
// ------------------------------DELETE /db/:dbName/ axios don't take body with method delete
router.delete('/db/:dbName', (req, res) => {         
  //console.log(req.params.dbName);
  connection.query(`DROP DATABASE ${req.params.dbName}`, function (err, result) {//'${req.params.dbName}' = wrong we have to remove ' '
    if (err) throw err;
    res.end("Your Data base is  deleted")
  })
});
//-----------------------------------------Sign up--------------
router.post('/sign-up', (req, res) => {
  try {
    let keys = Object.keys(req.body)
    //console.log(req.body[keys[0]]);
    bcrypt.hash(req.body.password, saltRounds).then(function (hashPW) {
      var sql = `INSERT INTO users (name, email, password) VALUES ('${req.body[keys[0]]}', '${req.body[keys[1]]}','${hashPW}')`;
      connection.query(sql)
      res.send('It is OK')
    })
  } catch (err) {
    console.log(err);
  }
});
//-------------------------------Sign in--------------
router.post('/sign-in', (req, res) => {
  try {
    connection.query("SELECT * FROM users", function (err, myUsers, fields) {
      let user = myUsers.filter(elem => elem.email === req.body.email)
      if (user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password).then(function (result) {
          if (result == true) {
            res.status(200).send('Your are authenticated')
          } else {
            res.status(401).send("Sorry, It is not the same stored password")

          }
        })
      } else {
        res.status(404).send("Sorry, Non user found")
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error on the server.')
  }
});
// --------------------------PUT /updateTable {columns: ArrayOfObjects}
router.put('/updateTable', (req,res)=>{
  let columns = req.body.columns
  console.log(typeof JSON.parse(columns));
  res.send( columns )
})
//-------------------------sign in secuured
router.post('/ath/sign-in',(req, res) => {
  try {
    connection.query("SELECT * FROM users", function (err, myUsers, fields) {
      let user = myUsers.filter(elem => elem.email === req.body.email)
      if (user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password).then(function (result) {
          if (result == true) {
            const token = generateAccessToken({ email: req.body.email });
            res.status(200).json(token);  //You are authrised
          } else {
            res.status(401).send("Sorry, It is not the same stored password")

          }
        })
      } else {
        res.status(404).send("Sorry, Non user found")
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error on the server.')
  }
});
function generateAccessToken(useremail) {
 let x_TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex')

  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(useremail, x_TOKEN_SECRET, { expiresIn: '300s' });
}

module.exports = router;