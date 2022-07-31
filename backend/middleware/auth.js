var jwt = require('jsonwebtoken');


const authentication_middleware = (req,res,next) => {
    
    let token = (req.headers.authorization.split(" ")[1])
console.log(token);
    var decoded = jwt.verify(token,'ssss');

    if(decoded){
        return next();
    }
    
    res.status(401).send({"msg":"Unauthenticated"})
}

module.exports=authentication_middleware;