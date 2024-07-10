import express from 'express';
import {registerController} from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
// router object
const router = express.Router()

//routing
//REGISTER || method post
router.post('/register', registerController)

//LOGIN || post
router.post('/login', loginController)
export default router;