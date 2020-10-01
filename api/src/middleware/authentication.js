const jwt = require("jsonwebtoken");

 function authentication(req, res, next){
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'x_TOKEN_SECRET');
        const userID = decodedToken.id
        if (userID == parseInt(req.body.id_user_affiliate) || userID == parseInt(req.params.id)){//we use parseInt() to tranfer string to int 
            next();
        }else{
            res.status(401).end('Bad request')
        } 
    }catch(err){
        
        res.status(401).send('there is an error')
    }
   
};
module.exports = authentication
   