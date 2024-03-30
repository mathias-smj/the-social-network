import { emailSchema, passwordSchema, signUpSchema, usernameSchema } from './schema.js';

/* const validateSignUpData = (email, password, username) => {
  const validateResult = {
    email: emailSchema.safeParse(email),
    password: passwordSchema.safeParse(password),
    username: usernameSchema.safeParse(username),
  };
  return validateResult.email.success && validateResult.password.success && validateResult.username.success;
}; */

const validateSignUpData = (data) => {
  const validateResult = signUpSchema.safeParse(data);
  console.log('validate result ', validateResult);
  console.log(data);
  return validateResult.success;
}

export { validateSignUpData };