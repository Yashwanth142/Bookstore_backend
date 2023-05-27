import HttpStatus from 'http-status-codes';
import * as  WishlistService from '../services/wishlist.service'

export const addBookToWishlist = async (req, res, next) => {
    try {
      const data = await WishlistService.addBookToWishlist(req.body.userId, req.params._id );
      if (data) {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'Book is added to wishlist'
        });
      } else{
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: data,
          message: 'Book already exists in wishlist'
        });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };