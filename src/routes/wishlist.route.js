import express from 'express'
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller'

const router=express.Router();

//route to add book to wishlist
router.post('/addbook/:_id', userAuth, wishlistController.addBookToWishlist)

export default router;