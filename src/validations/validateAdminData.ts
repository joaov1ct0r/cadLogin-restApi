import Joi from "@hapi/joi";

export default class ValidateAdmin {
  validateHandleAdminEditUser(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<Object> = Joi.object({
      userEmail: Joi.string().required().min(10).max(100),
      userNewEmail: Joi.string().required().min(10).max(100),
      userNewName: Joi.string().required().min(10).max(100),
      userNewBornAt: Joi.date().required(),
      userNewPassword: Joi.string().required().min(8).max(100),
    });

    return schema.validate(data);
  }

  validateHandleAdminDeleteUser(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<Object> = Joi.object({
      userEmail: Joi.string().required().min(10).max(100),
    });

    return schema.validate(data);
  }

  validateHandleAdminDeletePost(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<Object> = Joi.object({
      postId: Joi.string().required().min(1),
    });

    return schema.validate(data);
  }
}
