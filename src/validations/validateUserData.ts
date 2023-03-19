import Joi from "@hapi/joi";

export default class ValidateUser {
  private schema: Joi.ObjectSchema<Object> | undefined;

  public validateHandleUserRegister(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      email: Joi.string().required().min(10).max(100),
      name: Joi.string().required().min(10).max(100),
      bornAt: Joi.string().required().min(10).max(10),
      password: Joi.string().required().min(8).max(50),
    });

    return this.schema.validate(data);
  }

  validateHandleUserLogin(data: object): Joi.ValidationResult {
    this.schema = Joi.object({
      email: Joi.string().required().min(10).max(100),
      password: Joi.string().required().min(8).max(50),
    });

    return this.schema.validate(data);
  }

  validateHandleUserEdit(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<Object> = Joi.object({
      email: Joi.string().required().min(10).max(100),
      name: Joi.string().required().min(10).max(100),
      bornAt: Joi.string().required().min(10).max(10),
      password: Joi.string().required().min(8).max(50),
    });

    return schema.validate(data);
  }

  validateHandleOneUser(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<Object> = Joi.object({
      email: Joi.string().required().min(10).max(100),
    });

    return schema.validate(data);
  }
}
