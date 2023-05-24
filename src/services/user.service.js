import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//create new user
export const Signup = async (body) => {
  const email = await User.findOne({ email: body.email });

  if (email) {
    throw new Error('Email id already exist');
  }

  const encrypt = bcrypt.hashSync(body.password, 10); // saltRounds= 10
  body.password = encrypt;

  const data = await User.create(body);
  return data;
};

//get Login user
export const Login = async (body) => {
  // it find and return the user based on mail id
  const data = await User.findOne({ email: body.email });

  if (!data) {
    throw new Error('Invalid email id');
  }

  if (!bcrypt.compareSync(body.password, data.password)) {
    // here data.password will be decrypted and compared with body.password
    throw new Error('Wrong password');
  }
  const SecretKey = process.env.SECRETKEY;
  var token = jwt.sign(
    { _id: data._id, fullname: data.fullname, email: data.email },
    SecretKey
  );
  return token;
};

// forget password
export const forgotPassword = async (body) => {
  const data = await User.findOne({ email: body.email });

  if (!data) {
    throw new Error('User does not exsist');
  }

  const secret_key = process.env.SECRETKEY;
  const token = jwt.sign({ email: data.email, _id: data._id }, secret_key);
  data.token = token;

  return data.token;
};

// reset password
export const ResetPassword = async (_id, body) => {
  const hash = bcrypt.hashSync(body.password, 10); // 10 = saltRounds
  body.password = hash;
  const data = await User.findByIdAndUpdate(
    {
      _id: _id
    },
    {
      password: body.password
    },
    {
      new: true
    }
  );

  if (!data) {
    throw new Error('Failed to reset password');
  }
  return data;
};

//get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };
