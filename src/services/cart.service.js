import Cart from '../models/cart.module';
import * as bookService from '../services/book.service';


//adding book to cart
export const addBookToCart = async (userID, bookId) => {
    const book = await bookService.getBook(bookId);
    if (!book && book.quantity <= 1) {
      throw new Error('Book Not Available  or  Book Out of Stock');
    }
    
    let cart = await Cart.findOne({ userId: userID});
  
    if (!cart) {
      cart = await Cart.create({
        userId: userID,
        books: [
          {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            price: book.price
          }
        ],
        cartTotal: book.price
      });
      return cart;
    }
    var isBookPresent = false;
    let i;
    for (i = 0; i < cart.books.length; i++) {
      if (cart.books[i].productID == book._id) {
        isBookPresent = true;
        break;
      }
    }
    console.log('isBookPresent-->', isBookPresent);
  
    let newCart;
    if (isBookPresent) {
      const Obj = {};
      Obj['books.' + i + '.quantity'] = 1;
      Obj['cartTotal']=book.price
      console.log("book obj --->",Obj)
  
      newCart = Cart.updateOne({ _id: cart._id }, { $inc:Obj });
      //console.log('newcart-->',newCart)
    } else {
      newCart = Cart.updateOne(
        { _id: cart._id },
        {
          $push: {
            books: {
              productID: book._id,
              description: book.description,
              bookName: book.bookName,
              author: book.author,
              quantity: 1,
              price: book.price
            }
          },
          $inc: {
            cartTotal: book.price
          }
        }
      );
    }
    return newCart;
};
  