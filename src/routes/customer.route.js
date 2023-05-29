import express from 'express';
import {addressValidation} from '../validators/customer.validator'
import * as customerController from '../controllers/customer.controller';
import { userAuth } from "../middlewares/auth.middleware";

const router = express.Router();

//route to get all books
router.post('/addaddress',userAuth, addressValidation, customerController.addCustomerDetails);

export default router;