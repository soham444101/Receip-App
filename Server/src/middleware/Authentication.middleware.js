import jwt from 'jsonwebtoken';


export const AuthMiddleware = async (req, res, next) => {

    try {
        console.log("In Middlware");
        
        const Token = req.headers['authorization'];
         console.log("Headerds",req.headers);
         console.log("Token",Token);
        const token = Token.split(' ')[1];
         console.log('====================================');
         console.log("Token",token);
         console.log('====================================');
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
         console.log("Verify",verify);
         
        if (verify) {
            req.user = verify; // // Extracts user ID from the token
            next();
            // return true;// no need here we already pass to next ();
        } else {

            console.log('====================================');
            console.log("Jwt Token IS NOt Verified");
            console.log('====================================');
            return res.status(401)
                .json(
                    {
                        success: false,
                        message: "Autentication Fails"
                    }
                );
        }
    } catch (error) {
        console.log("Authentication Catch");
        if (error.name === "TokenExpiredError") {
            console.log("TokenExpiredError");
            
            return res.status(401).json({ success: false, message: "Token has expired",tokenstatus:false });
          } else if (error.name === "JsonWebTokenError") {
            console.log("JsonWebTokenError");

            return res.status(401).json({ success: false, message: "Invalid token" ,tokenstatus:false  });
          } else {
            console.log("CatchError:",error.name);

            return res.status(401).json({ success: false, message: "Authentication failed", error: error.message });
          }
    
    }

}




  