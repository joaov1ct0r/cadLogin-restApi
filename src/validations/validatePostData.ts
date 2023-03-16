import Joi from "@hapi/joi";

export default class ValidatePost {
  private schema: Joi.ObjectSchema<Object> | undefined;
  
  validateHandleNewPost(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      content: Joi.string().required().min(1).max(250),
    });

    return this.schema.validate(data);
  }

  validateHandleEditPost(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
      content: Joi.string().required().min(1).max(250),
    });

    return this.schema.validate(data);
  }

  validateHandleDeletePost(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
    });

    return this.schema.validate(data);
  }

  validateHandleOnePost(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<Object> = Joi.object({
      postId: Joi.string().required().min(1),
    });

    return schema.validate(data);
  }

  validateHandleAddPostLike(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
    });

    return this.schema.validate(data);
  }

  validateHandleDeletePostLike(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
    });

    return this.schema.validate(data);
  }

  validateHandleAddPostComment(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
      comment: Joi.string().required().min(1).max(250),
    });

    return this.schema.validate(data);
  }

  validateHandleEditPostComment(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
      commentId: Joi.string().required().min(1),
      comment: Joi.string().required().min(1).max(250),
    });

    return this.schema.validate(data);
  }

  validateHandleDeletePostComment(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
      commentId: Joi.string().required().min(1),
    });

    return this.schema.validate(data);
  }
}
