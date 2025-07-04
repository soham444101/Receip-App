import express from 'express';
import { LogIn, RegisterUSer } from '../controller/User_Controller.js';
import { AuthMiddleware } from '../middleware/Authentication.middleware.js';




const router = express.Router();


 
router.post('/register',RegisterUSer);
router.post('/login',LogIn);
router.get('/verify-token',AuthMiddleware,(req,res)=>{

    return res.status(200)
    .json(
        {
            success:true,
            message:"Verify Successfull",

        }
    )
});



export default router;