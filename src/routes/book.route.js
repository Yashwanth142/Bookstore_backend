import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newBookValidator } from '../validators/book.validator';


const router = express.Router();

//add new book
router.get('/search', bookController.searchBook);

//route to get all books
router.get('',userAuth, bookController.getAllBooks);

//route to get a single user by their books id
router.get('/:_id',userAuth, bookController.getBook);

export default router;