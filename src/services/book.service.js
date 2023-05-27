import books from '../models/books.model';
import User from '../models/user.model';

//get all books
export const getAllBooks = async () => {
    const data = await books.find();
    return data; 
}

//get single book
export const getBook = async (_id) => {
  const data = await books.findById(_id);
  return data;
};

//get search Book
export const searchBook = async (body) => {
    const data = await books.find({bookName:new RegExp('^' + body.bookName + '$', 'i')});
    //console.log("data-->",data)

    return data;
};

// export const addrating = async(body,bookid)=>{
//   const user = await User.findOne({ _id: body.userId });
  
//   if(user)
//   {   
//    const data= await books.updateOne(
//     { _id: bookid },
//     {
//       $addToSet: {
//         ratingarr:{
//           userId:body.userId
//         }
//       }
//     });
//   return data;
// }
// }