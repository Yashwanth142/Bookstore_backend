import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const addBookToCart = async (req, res, next) => {
    try {
      const data = await CartService.addBookToCart(req.body.userId,req.params.bookId);
      //console.log('cart data return ----->', data);
      if (data) {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'Cart created successfully'
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Cart is not created'
        });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };
  
export const getCart = async (req, res, next) => {
    try {
      const cart = await CartService.getCart(req.body.userId);
      if (cart) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: cart,
          message: 'Cart fetched successfully'
        });
      } 
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `Cart is not available`
      });
    }
};
  

export const removeBookFromCart = async (req, res, next) => {
    try {
      const data = await CartService.removeBookFromCart(req.body.userId,req.params.bookId);
      if (data) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Book is removed from cart'
        });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
};