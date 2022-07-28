const signup = async (req,res,next)=>{
    const { name,email, password,role, ...rest } = req.body
    /* console.log("password",password);
    console.log("Name",name); */
     // TODO: create a new user in db;
      const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync()); 
      //console.log("key",hashed);
      try {
 
         let user = await User.create({
            name,  
            email,
            password:hashed,
            role 
         })
         
         res.send({ data: user })
        
     }
     catch (err) {
         next(err)
     }
}

const login = (req,res,next)=>{

    res.send("Login controller")
}

module.exports={signup,login}