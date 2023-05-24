import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth } from '../middlewares/restAuth.middleware';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
//router.get('', userController.getAllUsers);

router.post('', newUserValidator, userController.Signup);

//route to get a single user by their user email id
router.post('/login', userController.Login);

router.post('/forgotPassword', userController.forgotPassword);

router.post('/resetPassword/:token', resetAuth, userController.ResetPassword);

export default router;
