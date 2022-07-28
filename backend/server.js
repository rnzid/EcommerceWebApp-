const express = require('express')
const app = express();
require('dotenv').config()
//console.log(process.env.PORT) // remove this after you've confirmed it working

app.get("",(req,res,next)=>{
    res.send({})
})

app.listen(process.env.PORT,()=>{
    console.log("starting...");
   });