import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token in params
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const resetAuth = (req, res, next) => {
  try {
    let bearerToken = req.params.token;
    if (!bearerToken)
      throw {
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid request'
      };
    const secretKey = process.env.SECRETKEY;

    const user = jwt.verify(bearerToken, secretKey);
    req.body.userId = user._id;

    next();
  } catch (error) {
    next(error);
  }
};
