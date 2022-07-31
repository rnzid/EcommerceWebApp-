const User = require("../model/User");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

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

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password, ...rest } = req.body;
  //console.log(email);
  const user = await User.findOne({ email }).select("password");
  let status = await bcrypt.compare(password, user?.password || "");
  if (!user || !status) {
    return res.send({statusCode:422 });
  }
  //console.log({ user });
  //let userss = await User.findOne({ email })
  res.send({
    access_token : jwt.sign(user.toObject(), 'ssss')
  });
};

module.exports = { signup, login };
