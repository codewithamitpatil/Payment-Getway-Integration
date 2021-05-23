
const   httpErrors          = require('http-errors');
const { validationResult }  = require('express-validator');

// includes
const AuthValidations = require('../validations/auth.validation');
const UserModel       = require('../models/user.model'); 
const redis           = require('../config/init_redis');

module.exports = {

//  signup middleware    
    Signup:async(req,res,next)=>{

    const result = await AuthValidations.
                         Signup.validateAsync(req.body);

    // duplicate email check
    const doesEmailExist = await UserModel.
                                 findOne({email:result.email});
                      
    if(doesEmailExist)
    {
      return next(new httpErrors.Conflict(`Email : ${result.email} is already exist .plz try another email`));
    }
   // duplicate username check 
   const doesUsernameExist = await UserModel.
                                   findOne({username:result.username});
                            
    if(doesUsernameExist)
    {
      return next(new httpErrors.Conflict(`Username : ${result.username} is already exist .plz try another username`));
    }    

    const user       = new   UserModel(result);
    const savedUser  = await user.save();                     
    
    res.send(savedUser);
    return ;

    }
,

//  login middleware    
    login:async(req,res,next)=>
    {

    const result = await AuthValidations.
                         Login.validateAsync(req.body).
                         catch((err)=>
                         {
                          err.message ='All Feilds are required';
                          return next(err);
                         });
    const uid = await UserModel.Authentication(result);         
    console.log(uid);
 
                     
     res.send(uid);
    
     return ;
      
     

    }
,

logout:async(req,res,next)=>
{
   //
}
,

refresh_token:async(req,res,next)=>
{
    //
}









}




















