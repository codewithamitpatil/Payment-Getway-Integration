
const mongoose    = require('mongoose');
const bcrypt      = require('bcrypt');
const httpErrors  = require('http-errors');

// user schema
const UserSchema = mongoose.Schema({

    username :  {
                type:String,
                required:true,
                unique:true
                },
    email    :  {
                type:String,
                required:true,
                unique:true
                },
    password :  {
                type:String,
                required:true
                }

});

// for password hashing

UserSchema.pre('save',async function(next){
  
  const salt      = await bcrypt.genSalt(10);
  const hashpass  = await bcrypt.hash(this.password,salt);
  this.password   = hashpass ;   
  return next();

});

// authentication check middleware (authcheck)

UserSchema.statics.Authentication = async function(data) {
    
     const { username , password } = data;
     
     const user = await this.findOne({
        $or:[ 
          {username:username}, {email:username} 
           ]     
     });
     
     if(!user)
     {
        throw new httpErrors.Unauthorized('Invalid Username or Password'); 
        return;
     }
   
     const passcheck = await bcrypt.compare(password,user.password);
     
     if(!passcheck)
     {
         throw new httpErrors.Unauthorized('Invalid Username or Password'); 
         return; 
    }
     
    return user.id;

   
}


// user model (collection)
const User = mongoose.model('User',UserSchema);

module.exports = User;