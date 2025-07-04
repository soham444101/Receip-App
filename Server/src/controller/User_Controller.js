import { User } from "../model/User_Model.js";


const RegisterUSer = async function (req,res) {


    const {email,password}= req.body;
    const emailFormatted = email.trim().toLowerCase();

    // check not null first 
    // find the database in db
    //all good set the user to the db 
    //responce
    if (!email ) {
      return res
      .status(500)
      .json({
        status:500,
        suceess:false,
        message:"Email is Empty",
      })
    }
    if( !password){
      return res
      .status(500)
      .json({
        status:500,
        suceess:false,
        message:"Password is Empty",
      })
    }
    console.log('====================================');
      console.log("Email And Password In Create User",emailFormatted);
      console.log("Password In Create User",password);
      console.log('====================================');
 
    const isUserExist = await User.findOne({email : emailFormatted});

      console.log('====================================');
      console.log("IsUser Exist senario",isUserExist);
      console.log('====================================');
    if (isUserExist){
      return res
      .status(500)
      .json({
        status:500,
        suceess:false,
        isExist:true,
        message:"User Already Exist"
      })

    }
    // const newPassword = await User.pre;
    const newUser = await User.create(
        {
           email: emailFormatted,
            password:password
        }
    )

    // check user form or not 
     const createdUser =await User.findById(newUser._id).select(
        "-password "
     )
     if(!createdUser)
     {
       return res
        .status(500)
        .json({
          status:500,
          suceess:false,
          message:"Moongo Db Connection Fails"
        })
     }
   return  res.status(200)
    .json(
        {
           status:200,
           success:true,
           message:"User Created Succfully",
           User:createdUser
        }
    )

}

const LogIn =async function (req,res) 
{
   try {
    const{email,password} = req.body;
    // validate
    // check exist or not 
    // jwt access token provide karu
    // res
    if (!email || !password) {
      return res
      .status(404)
      .json(
        {
          success:false,
          message:"Email Or password Missing"
        }
      )
    }
    
    const emailFormatted = email.trim().toLowerCase();
    console.log("Checking if user exists...");
    const isExist = await User.findOne({email:emailFormatted});
    console.log("Exist user");
    if(!isExist)
    {
      return res
      .status(400)
      .json(
        {
          success:false,
          message:"User not exist",
          isExist :false
        }
      )

    }

    console.log("password checck");
    const checkPassword = await isExist.isPasswordCorrect(password);
    console.log("Checkpassword",checkPassword);

    if (!checkPassword) {
      return res
      .status(407)
      .json(
        {
          success:false,
          message:"Password is no correct",
          isPasswordFail:true
        }
      )
    }

    console.log("Generating JWT...");
    const jwtToken = await isExist.generateAccessToken();
    
    console.log("Jwt Generate succefully",jwtToken);
    return(
      res.status(200)
      .json(
        {
          success:true,
          message:"user login successful",
          user_id:isExist._id,
          token:jwtToken
        }
      )
    )
    

   } catch (error) {
    
    return res.status(500)
    .json(
      {
        success:false,
        message:"Due To Database call",
      }
    )
   }
    
    
}


export {
 RegisterUSer
,LogIn
}