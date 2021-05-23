
const joi    = require('@hapi/joi');

const Signup = joi.object({

        username : joi.string().max(15).required(),
        email    : joi.string().email().required().lowercase(),
        password : joi.string().min(8).max(16).required()

});


const Login = joi.object({
    
        username : joi.string().required(),
        password : joi.string().required()

});


// export modules
   module.exports =
   {   
       Signup,
       Login
   }













