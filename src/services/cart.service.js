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

//get user cart

export const getCart = async (userID) => {
  const data = await Cart.findOne({ userId: userID});
  return data;
};


//remove book from cart

export const removeBookFromCart = async (userID,bookId) => {
    const book = await bookService.getBook(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    var cart = await Cart.findOne({ userId: userID });
  
    if (!cart) {
      throw new Error('Book is not available in cart');
    }
    
    let isBookPresent = false;
    let i;
    for (i = 0; i < cart.books.length; i++) {
      if (cart.books[i].productID == bookId) {
        isBookPresent = true;
        break;
      }
    }
    console.log('isBookPresent-->', isBookPresent);

    let newCart;
    if (isBookPresent) {
      if ( cart.books[i].quantity == 1) {
        newCart = Cart.updateOne(
          { _id: cart._id },
          {
            $pull: {
              books: {
                productID: book.id
              }
            },
            $inc: {
              cartTotal: -(book.price)
            }
          }
        );
      } else {
        const bookObj = {};
        bookObj['books.' + i + '.quantity'] = -1;
        bookObj['cartTotal'] = -book.price;
        newCart = Cart.updateOne({ _id: cart._id }, { $inc: bookObj });
      }
    }else{
      throw new Error('Book not found in cart');
    }
    return newCart;
  };
  