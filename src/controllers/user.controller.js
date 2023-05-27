import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


// export const getAllUsers = async (req, res, next) => {
//   try {
//     const data = await UserService.getAllUsers();
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'All users fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
// export const getUser = async (req, res, next) => {
//   try {
//     const data = await UserService.getUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'User fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };


export const Signup = async (req, res, next) => {
  try {
    const data = await UserService.Signup(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
  })
  }
};

export const Login = async (req, res, next) => {
  try {
    const data = await UserService.Login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User Login successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
  })
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);  
    res.status(HttpStatus.OK).json({
      code: data,
      message: 'email successfully send to the mail id'
    });
  } catch (error) {
    //next(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const ResetPassword = async (req, res, next) => {
  try {
    await UserService.ResetPassword(req.body.userId, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Password reset completed'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
