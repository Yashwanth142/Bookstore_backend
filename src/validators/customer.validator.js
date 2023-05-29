import Joi from '@hapi/joi';

export const addressValidation = (req, res, next) => {
  const schema = Joi.object({
    userId:Joi.string().required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    addressType: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};