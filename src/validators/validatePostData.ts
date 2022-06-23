import Joi from "@hapi/joi";

const validateHandleNewPost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    content: Joi.string().required().min(1).max(250),
  });

  return schema.validate(data);
};

const validateHandleEditPost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
    content: Joi.string().required().min(1).max(250),
  });

  return schema.validate(data);
};

const validateHandleDeletePost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
  });

  return schema.validate(data);
};

const validateHandleOnePost = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
  });

  return schema.validate(data);
};

const validateHandleAddPostLike = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
  });

  return schema.validate(data);
};

const validateHandleDeletePostLike = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
  });

  return schema.validate(data);
};

const validateHandleAddPostComment = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
    comment: Joi.string().required().min(1).max(250),
  });

  return schema.validate(data);
};

const validateHandleEditPostComment = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
    content: Joi.string().required().min(1).max(250),
  });

  return schema.validate(data);
};

const validateHandleDeletePostComment = (
  data: Object
): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    postId: Joi.string().required().min(1),
  });

  return schema.validate(data);
};

export {
  validateHandleNewPost,
  validateHandleEditPost,
  validateHandleDeletePost,
  validateHandleOnePost,
  validateHandleAddPostLike,
  validateHandleAddPostComment,
  validateHandleDeletePostLike,
  validateHandleEditPostComment,
  validateHandleDeletePostComment,
};
