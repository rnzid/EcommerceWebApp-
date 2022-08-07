const express = require('express');
const router = require('./routes/user');
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require('dotenv').config()
const users_route=require('./routes/user')
const products_route=require('./routes/product')
const orders_route = require('./routes/order');

app.use(cors()) // handle cross origin resource sharing 
// app.use(cors({options for specific domain and ports})) // handle cross origin resource sharing

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(res => {
        console.log("mongodb connencted")
    })
    .catch(err => {
        console.log(err.message)
    })

app.use(express.json())
app.use("/api",users_route)
app.use("/api/products",products_route)
app.use("/api/orders", orders_route)


/* handle errors */
app.use("", (req, res) => {
    return res.status(404).send({
        message: "the requested resource doesnot exist."
    })
})

app.use((err, req, res, next) => {
    // console.log(err.errors);
    // console.log(err.message);
    // console.log("________");
    // console.log(err);
    if (err.name === "ValidationError") {
        let errors = {};
        // make error format same as express-validator
        Object.keys(err.errors).forEach((key) => {
            console.log({ key });
            errors[key] = err.errors[key].message;
        });

        return res.status(400).send({
            message: err.name,
            errors
        });
    }
    // console.log(err.)
    let status_code = res.status_code || 500;
    return res.status(status_code).send({
        message: err.message,
        errors: err,
        stack:err.stack,
    })
})

  
//app.get("/",(req,res)=>{res.send("aaa")})
//app.post("/api/signup",()=>{})
//start server
app.listen(process.env.PORT,(data,err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("starting...");
    }
   });