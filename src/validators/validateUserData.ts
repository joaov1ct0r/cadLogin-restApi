import Joi from "@hapi/joi";

const validateHandleUserRegister = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    name: Joi.string().required().min(10).max(100),
    bornAt: Joi.date().required(),
    password: Joi.string().required().min(8).max(100),
  });

  return schema.validate(data);
};

const validateHandleUserLogin = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    senha: Joi.string().required().min(8).max(100),
  });

  return schema.validate(data);
};

export { validateHandleUserRegister, validateHandleUserLogin };
