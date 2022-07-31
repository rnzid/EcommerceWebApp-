const express = require('express')
const product = require('../controller/productController')
const router = express.Router()
const auth= require("../middleware/auth")

router.post("/products",auth,product)

module.exports=router