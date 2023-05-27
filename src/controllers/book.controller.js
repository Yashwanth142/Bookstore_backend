import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

export const searchBook = async (req, res, next) => {
    try {
      const data = await bookService.searchBook(req.body);
      
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book found successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    })
    }
};

export const getAllBooks = async (req, res, next) => {
    try {
      const data = await bookService.getAllBooks();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All books fetched successfully'
      });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
    }
};
  
export const getBook = async (req, res, next) => {
    try {
      const data = await bookService.getBook(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book fetched successfully'
      });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
    }
};

export const addrating = async (req, res, next) => {
  try {
    const data = await bookService.addrating(req.body,req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'rating added successfully'
    });
  } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
      })
  }
};