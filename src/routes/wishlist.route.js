import express from 'express'
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller'

const router=express.Router();

//route to get wishlist
router.get('',userAuth,wishlistController.getwishlist)

//route to add book to wishlist
router.post('/addbook/:_id', userAuth, wishlistController.addBookToWishlist)

//route to add book to wishlist
router.post('/removebook/:_id', userAuth, wishlistController.removeBookFromWishlist)

export default router;