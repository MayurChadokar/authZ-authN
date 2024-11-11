const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const crypto=require("crypto");

require('dotenv').config();

/// handler 

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        /// check it user registered 
        const exitsUser = await User.findOne({ email });
        if (exitsUser) {
            return res.status(400).json({
                success: false,
                message: "user already registered"
            })
        }
        // password hashing 
        let hashPassword;

        try {
            hashPassword = await bcrypt.hash(password, 10);

        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in the password the hasing"

            });


      

        }

        //creat the entry in database signup krn hai 

        let user = await User.create({
            name, email, password: hashPassword, role
        })
    
        return res.status(200).json({
            
            success: true,
            message: "user create succesfully "
        });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "user is not craeted, try later sometime "
        });

    }
}

exports.login = async (req,res)=>{
    try{
        //data fetch
            const { email, password } =req.body;

            if( !email || !password){
                return  res.status(400).json({
                    success:false,
                    message:"please the data carefully"

                });
            }
  //check for registered user 
             let user= await User.findOne({email});
 if(!user){
    return res.status(401).json({
        success: false,
        message:"user is not registered",
    });

 }
   const match = await bcrypt.compare(password,user.password); // true // false
// for the jwt token 
    const payload = {
        email:user.email,
        id:user._id,
        role:user.role,
      
    }

 if(match){
   //password match 
   //when user is registered we try to make a token for it then directly access the without authZ adn authN
   let token =jwt.sign(payload,process.env.JWT_SECRET,{
    expiresIn:"2h",

   });


//    user=user.toObject();
   user.token = token;
   

   user.password=undefined;
  
 console.log(user);
  const options= {
    expires: new Date( Date.now() + 3*24*60*60*1000),
    httpOnly:true,

  }
   res.cookie("token",token, options).status(200).json({
    success:true,
    user,
    token,
    message:"user logged successfully",

   });
    }
    else{
        //pasword don't match
        return res.status(403).json({
            success:false,
            message:"password incorrect",

        });

    }
    }
    catch(err){
  console.error(err);

  return res.status(500).json({
    success:false,
message:"login failed",

})
    };

}

exports.forgetPassword = async  (req,res)=>{
    try{
       const {email}= req.body;
       let user= await User.findOne({email});
     
  /// user is not registered when is not found 
       if(!user){
        return res.status(401).json({
            success:false,
            message:"user is not registered",
        });
        
       }
     
      const reset_token = crypto.randomBytes(32).toString('hex');
      user=user.toObject();
      user.password=undefined;
        user.reset_token = reset_token;
        user.tokenExpiration = Date.now() + 3600 * 1000; // 1 hour from now
        
       
        console.log('Reset token saved successfully');
        console.log(user);
    }
    catch (error) {
        console.error('Error saving user:', error);
      }
}
