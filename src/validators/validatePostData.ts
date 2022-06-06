import Joi from "@hapi/joi";

const validateHandleNewPost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    author: Joi.string().required().min(10).max(100),
    content: Joi.string().required().max(250),
  });

  return schema.validate(data);
};

export { validateHandleNewPost };
