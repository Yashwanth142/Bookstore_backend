import Wishlist from '../models/wishlist.model';
import * as BookService from '../services/book.service';

export const addBookToWishlist = async (userID, bookId) => {
  const book = await BookService.getBook(bookId);
  if (!book && book.quantity <= 1) {
    throw new Error('Book Not Available');
  }
  const wishBook = await Wishlist.findOne({userId: userID});
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