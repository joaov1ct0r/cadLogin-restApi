import Joi from "@hapi/joi";

export default class ValidateAdmin {
  private schema: Joi.ObjectSchema<Object> | undefined;

  validateHandleAdminEditUser(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      userEmail: Joi.string().required().min(10).max(100),
      userNewEmail: Joi.string().required().min(10).max(100),
      userNewName: Joi.string().required().min(10).max(100),
      userNewBornAt: Joi.date().required(),
      userNewPassword: Joi.string().required().min(8).max(100),
    });

    return this.schema.validate(data);
  }

  validateHandleAdminDeleteUser(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      userEmail: Joi.string().required().min(10).max(100),
    });

    return this.schema.validate(data);
  }

  validateHandleAdminDeletePost(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      postId: Joi.string().required().min(1),
    });

    return this.schema.validate(data);
  }
}
