import express from 'express';
import { AuthMiddleware } from '../middleware/Authentication.middleware.js';
import { AllreceipData, CreateReceip, DeleatReceip } from '../controller/Receip_Controller.js';




const router = express.Router();


 
router.post('/create',AuthMiddleware,CreateReceip);
router.get('/allreceip',AuthMiddleware,AllreceipData);
router.delete('/deleat',AuthMiddleware,DeleatReceip);
// router.post('/login',LogIn);


export default router;