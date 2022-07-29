const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true,
    minLength:8,
  },
  role:{
    type:String,
    enum:["buyer","seller"]
  }
});

module.exports=mongoose.model("User",UserSchema);