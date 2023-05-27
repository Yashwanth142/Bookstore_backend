import Wishlist from '../models/wishlist.model';
import * as bookService from '../services/book.service';

export const addBookToWishlist = async (userID, bookId) => {

  const book = await bookService.getBook(bookId);
  if (!book && book.quantity <= 1) {
    throw new Error('Book Not Available');
  }
 
  const wishBook = await Wishlist.findOne({userId: userID});
  console.log('wishbook-->',wishBook)
  if (!wishBook) {
    const wishlistBook = await Wishlist.create({
      userId: userID,
      books: [
        {
          productID: book._id,
          description: book.description,
          bookName: book.bookName,
          author: book.author,
          price: book.price
        }
      ]
    });
    return wishlistBook;
  }
  let isBookPresent = false;
  for (let i = 0; i < wishBook.books.length; i++) {
    if (wishBook.books[i].productID == book._id) {
      isBookPresent = true;
      break;
    }
  }
  
  let newWishlist;
  if (!isBookPresent) {
    newWishlist = Wishlist.updateOne(
      {
        _id: wishBook._id
      },
      {
        $push: {
          books: {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            price: book.price
          }
        }});
    }
  return newWishlist;
};

//get all books present in wishlist
export const getwishlist = async (userID) => {
    const books = await Wishlist.find({ userId: userID });
    return books;
};
  
  
//remove book from wishlist 
export const removeBookFromWishlist = async (userId, bookid) => {
    const book = await bookService.getBook(bookid);
    if (!book) {
      throw new Error('Book is not found');
    }
    let list = await Wishlist.findOne({userId:userId});
    if (!list) {
      throw new Error('There is no book in wishlist');
    }

    let isBookPresent = false;
    for (let i = 0; i < list.books.length; i++) {
      if (list.books[i].productID == book._id) {
        isBookPresent = true;
        break;
      }
    }
    let newList;
    if (isBookPresent) {
      newList = Wishlist.updateOne({ _id: list._id },
        {
          $pull: {
            books: {
              productID: book.id
            }
          }
        }
      );
      return newList;
    }
    
};