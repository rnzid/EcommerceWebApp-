const express = require('express')
const router = express.Router()
const {signup,login}=require("../controller/userController")
const {myValidator,userValidation} = require('../Validator/Validator')


router.post("/signup",myValidator,userValidation,signup)
router.post("/login",login)

module.exports=router