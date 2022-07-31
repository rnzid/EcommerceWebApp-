 const { validationResult, check } = require('express-validator');

exports.myValidator = [

	check("name").isString().trim().not().isEmpty().withMessage("cannot be empty").isLength({min:3, max:20}).withMessage("name must be 3 to 20 letter"),
	check("email").normalizeEmail().isEmail().withMessage("Invalid email"),
    check("role").isString().withMessage("select role"),
	check("password", "Please Provide Password Between 5 to 8 Char").trim().not().isEmpty().isLength({
		min: 5,
		max: 8,
	}),
	 /* check("cPassword").custom((value,{req})=>{
			if(value !== req.body.password){throw new Error("password didnot match");}
		}),  */
	];
exports.userValidation=(req,res,next)=>{
	const result= validationResult(req).array()
	//console.log(result);
	if(!result.length){return next()};

	const error = result[0].msg;
	res.json({success:false,message:error,statusCode:422})
};