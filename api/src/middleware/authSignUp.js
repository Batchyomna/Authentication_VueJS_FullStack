const connection = require('../database/myDataBase')

const authSignUp = function(req, res, next){
    connection.query("SELECT name FROM users", function (err, result, fields) {
      if (err) throw err;
      let theName = result.find(element => element.name === req.body.name)
      if (theName) {
        res.status(202).send('This NAME is already exists. You have to choose another NAME')//status(202)= to solve this problem in the part .then of axios
      } else {
        next()
      }
    })
  }
module.exports = authSignUp
