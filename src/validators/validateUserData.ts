import Joi from "@hapi/joi";

const validateUserRegister = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    name: Joi.string().required().min(10).max(100),
    bornAt: Joi.date().required(),
    password: Joi.string().required().min(8).max(100),
  });

  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(10).max(100),
    senha: Joi.string().required().min(8).max(100),
  });

  return schema.validate(data);
};

export { validateUserRegister, loginValidate };
