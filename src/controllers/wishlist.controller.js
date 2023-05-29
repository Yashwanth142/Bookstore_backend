import HttpStatus from 'http-status-codes';
import * as  WishlistService from '../services/wishlist.service'

export const addBookToWishlist = async (req, res, next) => {
    try {
      const data = await WishlistService.addBookToWishlist(req.body.userId, req.params._id );
      console.log('data in esishlist',data)
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

export const getwishlist = async (req, res, next) => {
    try {
      const data = await WishlistService.getwishlist(req.body.userId);
      if (data) {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'Book fetched successsfully from wishlist'
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Failed to fetch  wishlist'
        });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
};

export const removeBookFromWishlist = async (req, res, next) => {
    try {
      const data = await WishlistService.removeBookFromWishlist(req.body.userId,req.params._id);
      if (data) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Book is removed from wishlist'
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Book does not exist in wishlist'
        });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
};