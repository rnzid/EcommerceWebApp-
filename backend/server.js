const express = require('express');
const router = require('./routes/user');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
const users_route=require('./routes/user')
const products_route=require('./routes/product')

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(res => {
        console.log("mongodb connencted")
    })
    .catch(err => {
        console.log(err.message)
    })

app.use(express.json())
app.use("/api",users_route)
app.use("/api",products_route)


  
//app.get("/",(req,res)=>{res.send("aaa")})
//app.post("/api/signup",()=>{})

app.listen(process.env.PORT,(data,err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("starting...");
    }
   });