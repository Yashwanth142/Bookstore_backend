import books from '../models/books.model';


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
    const data = await books.find();
    console.log("data-->",data.query)
    return data.filter((res)=>{
        //console.log('data in res===> ',res.bookName.toLowerCase())
        return res.bookName.toLowerCase().includes(body.bookName.toLowerCase())       
      })  
      
    //return data;
};