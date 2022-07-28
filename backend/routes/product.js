const express = require('express')
const router = express.Router()

router.post("/products",(req,res,next)=>{res.send('products')})

module.exports=router