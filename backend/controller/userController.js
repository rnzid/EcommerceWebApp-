const { body, validationResult } = require("express-validator");
const User = require("../model/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { name, email, password, role, ...rest } = req.body;
  /* console.log("password",password);
    console.log("Name",name); */
  // TODO: create a new user in db;
  const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync());
  //console.log("key",hashed);
  try {
    let user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });
    if (user) {
      // user// => as mongoose object
      let user_obj = user.toObject();
      delete user_obj.password;
      res.send({ data: user });
    }
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password, ...rest } = req.body;
  //console.log(email,password);
  let user = await User.findOne({ email }).select([
    "name",
    "password",
    "role",
  ]);
  let status = await bcrypt.compare(password, (user?.password || ""));
  if (!user || !status) {
    return res.status(401).send({
      message: "invalid Credentials",
    });
  }

  let user_obj = user.toObject();
  delete user_obj.password;

  var access_token = jwt.sign(user_obj, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return res.send({
    access_token,
  });
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.decoded_token._id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};
//console.log({ user });
//let userss = await User.findOne({ email })
/*   res.send({
    access_token : jwt.sign(user.toObject(), 'ssss')
  });
};
 */
module.exports = { signup, login, getUser };
