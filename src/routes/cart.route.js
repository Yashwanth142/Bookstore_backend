import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get cart details
router.get('', userAuth, cartController.getCart);

//route to add book to cart
router.post('/addbook/:bookId',userAuth, cartController.addBookToCart);

//route to remove book from cart
router.post('/removebook/:bookId',userAuth,cartController.removeBookFromCart) 

export default router;