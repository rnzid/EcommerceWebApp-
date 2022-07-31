const { body, validationResult } = require('express-validator');
const { name,email, password,role, ...rest } = req.body




module.exports=auth;